---
sidebar_position: 3
---

# Python API

**Updated for basepair version:** 3.x  
Python bindings for Basepair's API. An outline of the contents on this page:

1. Connecting
2. Listing and filtering data
3. Creating or deleting a sample
4. Creating an analysis
5. Downloading results
6. Working with result files
7. Using individual module classes directly
8. Error responses

---

## 1. Connecting

After installing the package (`pip install basepair`), start a `python3` session and connect. `connect()` takes the parsed config file (see [Setup](./setup)), authenticates, and returns a `BpApi` object:

```python
import basepair
import json

bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
```

```text
INFO: Using Webapp API v3
```

Alternatively, set `BP_CONFIG_FILE` in your environment and call `connect()` with no arguments:

```python
# export BP_CONFIG_FILE=/path/to/basepair.config.json
bp = basepair.connect()
```

Starting with package 3.x, **v3 is the default** and `connect()` reads the `api_v3` section of your config. To talk to the legacy v2 API instead, pass `version='v2'` (this reads the `api` section):

```python
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')), version='v2')
```

```text
INFO: Using Webapp API v2
```

`bp.version` tells you which API you are connected to. If the config is missing the required section, `connect()` prints a `CONFIG_ERROR:` line and returns `None` — check that before calling methods on `bp`.

**The SDK is quiet by default.** Methods return values (ids, dicts, lists) and only print `INFO:` and `ERROR:` lines. The progress messages the CLI shows (`created: sample with id …`, `deleted sample …`, `Downloading …`) appear only if you connect with `verbose=True`:

```python
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')), verbose=True)
```

The outputs on this page show the default (quiet) behaviour.

> **Note:** `version=` requires basepair 3.0 or newer. On an older 2.x install it fails with `TypeError: BpApi.__init__() got an unexpected keyword argument 'version'`; run `pip install --upgrade basepair`.

---

## 2. Listing and filtering data

Every resource has a `print_data()` form that prints a human-readable table, and a `get_*()` form that returns Python objects. In an interactive session, calling `get_*()` without assigning the result prints it.

### 2.1 List genomes

```python
bp.print_data('genomes')
```

```text
  id  name                                                 created_on
----  ---------------------------------------------------  ---------------------------
   1  hg19                                                 2014-08-22T00:00:00Z
   2  mm10                                                 2014-08-22T00:00:00Z
   3  mm9                                                  2014-08-22T00:00:00Z
  …
```

Raw list of dicts:

```python
bp.get_genomes()
```

### 2.2 List pipelines

```python
bp.print_data('pipelines')
bp.get_pipelines()
```

Use the `id` from this list as the `workflow_id` when creating analyses (section 4).

### 2.3 List samples

```python
bp.print_data('samples', project=20083)
```

```text
   id  name                     datatype      genome  date_created                 num_reads
-----  -----------------------  ----------  --------  ---------------------------  -----------
78476  recent-2274572-8-fastq   wes               23  2026-08-19T09:23:49.082533Z
78290  recent-2-fastq           dna-seq           23  2026-08-18T11:12:50.058228Z
```

Raw list, filtered by project:

```python
bp.get_samples(filters={'projects__id': 20083})
```

### 2.4 Filter syntax

`filters` is a dict of query parameters passed straight to the v3 API. Foreign-key fields are filtered with the `__id` suffix; plain field names work for ordinary fields. Unknown parameters are **silently ignored**, so a typo returns everything (`filters={'projects': 20083}` does *not* filter).

| Example | Meaning |
|---------|---------|
| `{'projects__id': 20083}` | items in project 20083 |
| `{'owner__id': 4453}` | samples / analyses owned by user 4453 (projects and pipelines do not support this filter) |
| `{'status': 'completed'}` | exact match on a plain field |
| `{'status__in': ['completed', 'failed']}` | any of several values (lists are joined with commas) |
| `{'id__in': [128540, 128520]}` | specific ids |
| `{'order_by': '-last_updated'}` | sort (prefix `-` for descending) |

Filters can be combined in one dict.

### 2.5 Get a sample

```python
bp.get_sample(78476)
```

Returns a dict with the sample's fields (`id`, `name`, `genome`, `genome_name`, `datatype`, `status`, `owner`, `projects`, `uploads`, …). It also attaches `analyses_full`, the full list of analyses run on the sample (newest first). The human-readable form:

```python
bp.print_data('sample', uid=[78476])
```

### 2.6 List analyses

```python
bp.print_data('analyses', project=20083)
bp.get_analyses(filters={'projects__id': 20083})
```

Analysis detail, as a table:

```python
bp.print_data('analysis', uid=[128540])
```

```text
Analysis info:
Variable      Value
------------  -----------------------------------------------
id            128540
name          Count number of lines on recent-2274572-8-fastq
date_created  2026-09-18T17:56:23.471872Z
completed_on  2026-09-18T18:03:29.980568Z
sample        78476

Analysis files:
    id  filesize (Gigabytes)    source       name                                        uri                                                                      tags
------  ----------------------  -----------  ------------------------------------------  -----------------------------------------------------------------------  -------------
496729  NA                      Count lines  recent_2274572_8_fastq.fastq.num_lines.txt  s3://<bucket>/analyses/4453/128540/count/recent_2274572_8_fastq...txt   ['num_lines']
```

As a dict (the download calls in section 5 take this object):

```python
analysis = bp.get_analysis(128540)
analysis['status'], analysis['samples'][0]['id'], len(analysis['files'])
```

```text
('completed', 78476, 1)
```

---

## 3. Creating or deleting a sample

### 3.1 Create a new sample

Create **Sample1** — paired-end RNA-seq data using the **hg19** genome. The call creates the sample, uploads each file, and returns the new sample id:

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
    # 'projects': 20083,           # optional: project id
    # 'default_workflow': 8,       # optional: default pipeline for the sample
    # 'info': {'stranded': 'yes'}  # optional: extra metadata
}

bp.create_sample(data=data)
```

```text
78477
```

With `verbose=True` you also see the progress: `created: sample with id 78477`, `Creating upload Sample1.lane1.R1.fastq.gz`, `created: upload with id 105490`, and so on.

### 3.2 Update a sample

```python
bp.update_sample(78477, {'genome': 'hg38', 'name': 'Sample1-renamed'})
```

### 3.3 Delete a sample

```python
bp.delete_sample(78477)
```

```text
{'error': False}
```

Returns `{'error': False}` on success and `False` on failure (after printing an `ERROR:` line). Unlike the CLI, there is no confirmation prompt — the sample is deleted immediately. The `deleted sample 78477` message is only printed with `verbose=True`.

---

## 4. Creating an analysis

Create an analysis once you know the `workflow_id` (pipeline id, from `bp.get_pipelines()`) and the sample id. The call returns the new analysis id. If the server rejects the request the SDK prints `ERROR: Analysis creation failed!` and calls `sys.exit()`, so wrap it in `try/except SystemExit` in long-running scripts:

```python
bp.create_analysis(workflow_id=18, sample_id=64002)
```

```text
107644
```

(With `verbose=True` the SDK also prints `created: analysis 107644 with sample id(s) 64002`.)

Optional arguments: `project_id`, `control_id` / `control_ids`, `sample_ids`, `params`, `ignore_validation_warnings`, `pipeline_yaml` and `module_yaml` (custom definitions).

With custom per-node parameters:

```python
bp.create_analysis(
    workflow_id=5,
    sample_id=78476,
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
    workflow_id=8,
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

With a ChIP-seq input control — e.g. pipeline 39, *ChIP-Seq Peaks, Motif (MACS v2, Homer)*:

```python
bp.create_analysis(
    workflow_id=39,
    sample_id=75042,
    control_id=75050,
)
```

Restart or stop an analysis:

```python
bp.restart_analysis(128540, instance_type=None)   # force=True to restart a running one
bp.terminate_analysis(128540)
```

---

## 5. Downloading results

Pass the analysis id together with the dict from `get_analysis()`. Without `outdir`, files land under `./basepair/analyses/<analysis id>/<node>/`.

Download all files for an analysis into `./results/`:

```python
analysis = bp.get_analysis(128540)
bp.download_analysis(
    uid=128540,
    analysis=analysis,
    outdir='./results/',
)
```

```text
['./results/recent_2274572_8_fastq.fastq.num_lines.txt']
```

The return value is the list of downloaded paths (`None` if nothing matched, `False` on error). With `verbose=True` each file is announced with `Downloading ./<file>` and `Copying from s3 bucket to ./<file>` lines, as in the CLI.

> **Transient 403 errors are normal.** Downloads run `aws s3 cp` with short-lived credentials issued for your account when you connected. They can take a few seconds to activate, so the first attempt may print `Error: b'fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden\n'` and `retrying in 3 seconds.`; the SDK retries and then prints `Succeeded after retry.`. Only a download that fails on every retry is a real permission problem.

`tags` is a **list of lists**: each inner list is one tag combination, and a file is kept if it matches *any* inner list under the chosen `tagkind`.

Download only files tagged **fastqc**:

```python
bp.download_analysis(
    uid=128540,
    analysis=analysis,
    tags=[['fastqc']],
    tagkind='subset',
    outdir='./test/',
)
```

Download everything *except* BAM files:

```python
bp.download_analysis(
    uid=128540,
    analysis=analysis,
    tags=[['bam']],
    tagkind='diff',
    outdir='./test/',
)
```

Download files tagged exactly (`rnaseq_metrics` + `json`) **or** exactly (`fastqc` + `zip`):

```python
bp.download_analysis(
    uid=128540,
    analysis=analysis,
    tags=[['rnaseq_metrics', 'json'], ['fastqc', 'zip']],
    tagkind='exact',
    outdir='./test/',
)
```

**Tag filter modes:**

| Mode | Behaviour |
|------|-----------|
| `exact` (default) | Only files whose tag set exactly matches the provided tags |
| `subset` | Any file that has at least one of the provided tags |
| `diff` | Exclude files that have the provided tag |

Other download helpers:

```python
bp.get_log(128540, outdir='./logs')             # analysis worker log -> ./logs/worker.log
bp.download_raw_files(bp.get_sample(78476), file_type='samples', uid=78476, outdir='./raw')  # a sample's uploaded reads
bp.download_file('analyses/4453/128540/count/file.txt', uid=128540, file_type='analyses', dirname='./one')  # one file by its path
bp.get_bam_file(bp.get_sample(78476))           # find (and download) the BAM from the sample's alignment analysis
```

---

## 6. Working with result files

Each entry of `analysis['files']` is a dict. The useful fields:

| Field | Example | Notes |
|-------|---------|-------|
| `id` | `496729` | use with `basepair file download -u` |
| `path` | `analyses/4453/128540/count/sample.num_lines.txt` | object key inside the bucket |
| `uri` | `s3://<bucket>/analyses/4453/128540/count/sample.num_lines.txt` | full S3 URI (new in v3) |
| `tags` | `['num_lines']` | what `tags=` / `--tags` filter on |
| `node` | `count` | pipeline node that produced it |
| `source` | `Count lines` | node display name |
| `filesize` | `1234` or `None` | bytes |

```python
analysis = bp.get_analysis(128540)
for f in analysis['files']:
    print(f['id'], f['tags'], f['uri'])
```

```text
496729 ['num_lines'] s3://776562512588-webapp-stage-useast1/analyses/4453/128540/count/recent_2274572_8_fastq.fastq.num_lines.txt
```

If you only have a `uri` and need the bare key:

```python
from basepair.modules.storage.drivers.aws_s3 import Driver as S3Driver

S3Driver.get_path_from_uri(f['uri'])
# 'analyses/4453/128540/count/recent_2274572_8_fastq.fastq.num_lines.txt'
```

A single file can also be fetched by id: `bp.get_file(496729)` returns the same dict, plus `analysis` (the parent analysis id).

---

## 7. Using individual module classes directly

The package exposes lower-level classes (`Analysis`, `Sample`, `Upload`, `Pipeline`, `Module`, `Project`, `Genome`, `File`, `User`, …) for operations not available on the `BpApi` wrapper — such as bulk actions or full paginated responses.

These classes take the API config **section** as their first argument. With a v3 config file, that is `config['api_v3']`:

```python
import json
from basepair import Analysis, Sample

config = json.load(open('/path/to/basepair.config.json'))

# list_all_full returns {'meta': {...}, 'objects': [...]} across all pages
result = Analysis(config['api_v3']).list_all_full(
    filters={
        'id__in': [128540, 128520],
        'status__in': ['completed', 'failed'],
        'order_by': '-last_updated',
    }
)
result['meta']['total_count'], [a['id'] for a in result['objects']]
```

```text
(2, [128540, 128520])
```

```python
# list_all returns just the list of objects
Analysis(config['api_v3']).list_all(filters={'projects__id': 20083})

# Bulk start analyses
Analysis(config['api_v3']).bulk_start({'analyses': [...]})

# Bulk import samples
Sample(config['api_v3']).bulk_import({'samples': [], 'project_id': 20083})
```

> **Important:** Always match the config key to the API version you are targeting — `api_v3` for v3, `api` for v2. Passing the wrong key results in a `None` config and a connection error.

If you already have a connected `bp` object you can reuse its resolved config instead of reading the file again — `bp.conf['api']` always holds the section for whichever version you connected to:

```python
bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
Analysis(bp.conf['api']).list_all_full(filters={'projects__id': 20083})
```

---

## 8. Error responses

`BpApi` methods never raise on API errors. A failed lookup prints an `ERROR:` line and returns a dict with `error: True`:

```python
bp.get_analysis(999999999)
```

```text
ERROR: Resource with id 999999999 not found. Not found.
{'error': True, 'msg': 'Resource with id 999999999 not found.'}
```

Check `result.get('error')` before using a result in scripts.

Under the hood, the v3 API returns structured JSON errors; you will see this shape if you call the REST API directly (for example with `requests`):

```json
{
  "type": "client_error",
  "errors": [
    {"code": "not_found", "detail": "Resource with id 999999999 not found.", "attr": null}
  ]
}
```

```json
{
  "type": "client_error",
  "errors": [
    {"code": "authentication_failed", "detail": "Invalid or expired token.", "attr": null}
  ]
}
```

In v2, error messages were unstructured plain text. If you have code that parses error strings, update it to read `errors[].detail`, or use the `BpApi` wrapper which normalises errors across versions.
