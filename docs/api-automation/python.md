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

Starting with package 3.x, **v3 is the default**. To explicitly select a version, pass the `version` argument:

```python
# Explicit v3 (same as default)
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')), version='v3')

# Explicit v2 (requires an "api" section in your config)
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')), version='v2')
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

---

## 7. Using individual module classes directly

The package exposes lower-level classes (`Analysis`, `Sample`, `Upload`, `Pipeline`, `Module`, etc.) for operations not available on the `BpApi` wrapper — such as bulk actions or custom filters.

These classes take the raw API config dict as their first argument. With a v3 config file, that dict lives under the `api_v3` key:

```python
import json
from basepair import Analysis, Sample

config = json.load(open('/path/to/basepair.config.json'))

# v3 config: use config.get('api_v3')
analyses = Analysis(config.get('api_v3')).list_all_full(
    filters={
        'id__in': [91182, 91183],
        'status__in': ['completed', 'failed'],
        'order_by': '-last_updated',
    }
)

# Bulk start analyses
Analysis(config.get('api_v3')).bulk_start({'analyses': [...]})

# Bulk import samples
Sample(config.get('api_v3')).bulk_import({'samples': [], 'project_id': 8658})
```

> **Important:** Always match the config key to the API version you are targeting — `api_v3` for v3, `api` for v2. Passing the wrong key results in a `None` config and a connection error.

If you are already using `basepair.connect()`, you can extract the resolved config from the `bp` object instead of reading the file again:

```python
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))

# bp.conf['api'] always holds the resolved config for whichever version was connected
Analysis(bp.conf.get('api')).list_all_full(filters={...})
```

---

## 8. Error responses

In v3, API errors return structured JSON with an `errors` array:

```json
{
  "errors": [
    {"detail": "No analysis found with id 99999."}
  ]
}
```

In v2, error messages were unstructured plain text. If you have code that parses error strings, update it to handle the v3 format or use the `BpApi` wrapper which normalises errors across versions.
