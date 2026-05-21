---
sidebar_position: 3
---

# Python API

**Updated for basepair version:** 3.x  
Python bindings for Basepair's API. An outline of the contents on this page:

1. Connecting
2. Listing available data
3. Creating or deleting a sample
4. Creating an analysis
5. Downloading results
6. Working with result files

---

After installing the package (`pip install basepair`), start a `python3` session and connect:

```python
import basepair
import json

bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
```

---

## 1. Connecting

The `connect()` call reads your config file and authenticates against the API. The config file must contain an `api_v3` section — see [Setup](./setup) for how to obtain it.

```python
import basepair
import json

bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
```

You can also connect using environment variables without a file:

```python
import os
import basepair

os.environ['BP_USERNAME'] = 'user@example.com'
os.environ['BP_API_KEY'] = 'YOUR_API_KEY'
bp = basepair.connect()
```

---

## 2. Listing available data

### 2.1 List genomes

```python
bp.print_data('genomes')
```

Typical output:

```
 id  name                      date_created
---- -----------------------   --------------------------
  1  hg19                      2018-04-18T14:58:15.865993
  2  mm10                      2018-04-18T15:05:39.770488
  3  mm9                       2018-04-18T15:10:33.388603
  …
```

Raw list:

```python
bp.get_genomes()
```

### 2.2 List pipelines

```python
bp.get_pipelines()
```

### 2.3 List samples

```python
bp.print_data('samples')
```

Raw list (optionally filtered):

```python
bp.get_samples(filters={'projects': 8658})
```

### 2.4 Get a sample

```python
sample = bp.get_sample(75042)
```

### 2.5 List analyses

```python
bp.print_data('analyses')
```

Raw list:

```python
bp.get_analyses(filters={'projects': 8658})
```

Analysis detail:

```python
analysis = bp.get_analysis(91182)
```

---

## 3. Creating or deleting a sample

### 3.1 Create a new sample

Create **Sample1** — paired-end RNA-seq data using the **hg19** genome:

```python
data = {
    'name': 'Sample1',
    'genome': 'hg19',
    'datatype': 'rna-seq',
    'platform': 'illumina',
    'filepaths1': [
        'Sample1.lane1.R1.fastq.gz',
        'Sample1.lane2.R1.fastq.gz',
    ],
    'filepaths2': [
        'Sample1.lane1.R2.fastq.gz',
        'Sample1.lane2.R2.fastq.gz',
    ],
    # 'projects': 8658,  # optional
}

sample_id = bp.create_sample(data=data)
```

### 3.2 Delete a sample

```python
bp.delete_sample(75042)
```

---

## 4. Creating an analysis

Create an analysis once you know the `workflow_id` (pipeline ID):

```python
analysis_id = bp.create_analysis(workflow_id=4, sample_id=75042)
```

With custom parameters:

```python
bp.create_analysis(
    workflow_id=5,
    sample_id=75042,
    params={
        'node': {
            'annotate': {
                'upstream': '5000',
                'downstream': '5000',
            }
        }
    }
)
```

For pipelines requiring multiple sample groups (e.g. DESeq2, Cuffdiff):

```python
bp.create_analysis(
    workflow_id=42,
    sample_ids=[5014, 5016, 5017, 5018],
    params={
        'node': {
            'deseq': {
                'group_ids': '5017,5018:5016:5014',
                'group_names': 'group 1 name:group 2 name:group 3 name',
            }
        }
    }
)
```

With a ChIP-seq input control:

```python
bp.create_analysis(
    workflow_id=10,
    sample_id=75042,
    control_id=75050,
)
```

---

## 5. Downloading results

Download all files for an analysis into `./results/`:

```python
analysis = bp.get_analysis(91182)
bp.download_analysis(
    uid=91182,
    analysis=analysis,
    outdir='./results/',
)
```

Download only files tagged **fastqc**, excluding all others:

```python
bp.download_analysis(
    uid=91182,
    analysis=analysis,
    tags=[['fastqc']],
    tagkind='subset',
    outdir='./test/',
)
```

Download files tagged **bam** (exact match), excluding everything else:

```python
bp.download_analysis(
    uid=91182,
    analysis=analysis,
    tags=[['bam']],
    tagkind='diff',
    outdir='./test/',
)
```

Download files matching either (`rnaseq_metrics` + `json`) **or** (`fastqc` + `zip`):

```python
bp.download_analysis(
    uid=91182,
    analysis=analysis,
    tags=[['rnaseq_metrics', 'json'], ['fastqc', 'zip']],
    tagkind='exact',
    outdir='./test/',
)
```

**Tag filter modes:**

| Mode | Behaviour |
|------|-----------|
| `exact` | Only files whose tag set exactly matches the provided tags |
| `subset` | Any file that has at least one of the provided tags |
| `diff` | Exclude files that have the provided tag |

---

## 6. Working with result files

In API v3, file objects return a `uri` field containing the full S3 URI. Use this instead of the older `path` field:

```python
analysis = bp.get_analysis(91182)
for f in analysis['files']:
    print(f['name'], f['uri'])
    # e.g. sample.bam  s3://basepair-results/data/91182/sample.bam
```

If you need the bare S3 key (without the `s3://bucket/` prefix):

```python
from basepair.modules.storage.drivers.aws_s3 import Driver as S3Driver

for f in analysis['files']:
    s3_key = S3Driver.get_path_from_uri(f['uri'])
    print(s3_key)   # e.g. data/91182/sample.bam
```

> **Note:** If you are upgrading from v2, replace any `file['path']` references with `file['uri']`. See the [migration guide](./migration) for the full list of changes.
