---
sidebar_position: 2
---

# Command line API

Updated for basepair version 3.x

Command-line (CLI) bindings for Basepair's API. The CLI is a thin wrapper around the Python bindings, which are more fully-featured. If you can't accomplish something with the CLI, check the [Python API](./python) instead.

All commands follow the pattern:

```bash
basepair <resource> <action> [options] -c /path/to/basepair.config.json
```

Resources: `analysis`, `coupon`, `file`, `genome`, `module`, `pipeline`, `pipeline_version`, `project`, `sample`, `user`. Run `basepair <resource> -h` to list the actions for a resource and `basepair <resource> <action> -h` for its options.

### Global options

The API-version flag goes **before** the resource; every other option goes **after** the action.

| Option | Position | Description |
|--------|----------|-------------|
| `-v, --version VERSION` | before resource | API version: `v3` (default) or `v2` |
| `-c, --config PATH` | after action | Path to config JSON file (or set `BP_CONFIG_FILE`) |
| `--quiet` | after action | Suppress progress output |
| `--verbose` | after action | Print request payloads and extra detail |
| `--scratch DIR` | after action | Working directory for temporary files (default: `.`) |
| `--json` | after action | On `get` / `list` actions: print raw JSON instead of a table |

```bash
# correct
basepair -v v2 analysis list --project 20083 -c /path/to/basepair.config.json

# wrong — argparse rejects these
basepair -c /path/to/basepair.config.json analysis list --project 20083
basepair analysis list --project 20083 -v v2 -c /path/to/basepair.config.json
```

Starting with package 3.x, **v3 is the default** — you only need `-v` to explicitly use v2. Your config file must contain the matching section (`api_v3` for v3, `api` for v2) — see [Setup](./setup).

Every command starts by printing which config and API version it is using:

```text
Using config file /path/to/basepair.config.json
INFO: Using Webapp API v3
```

An outline of the contents on this page:

1. Creating a project
2. Creating a sample
3. Running an analysis
4. Downloading results
5. Managing pipelines and modules
6. Other commands

---

## 1. Creating a project

List your existing projects:

```bash
basepair project list -c /path/to/basepair.config.json
```

```text
   id  name                      owner fullname    last updated                 visibility
-----  ------------------------  ----------------  ---------------------------  ------------
20083  amiay                     Amiay Narayan     2026-08-12T12:40:06.617429Z  private
37320  Amiay Narayan's Project   Amiay Narayan     2026-11-10T12:39:38.044849Z  private
```

Creating a project requires the ID of the **team** it belongs to. Add `--json` to `project list` to see each project's team:

```bash
basepair project list --json -c /path/to/basepair.config.json
```

```text
{'id': 37320, 'name': "Amiay Narayan's Project", 'team': {'id': 19366, 'name': "Amiay Narayan's Team"}, 'visibility': 'private', ...}
```

Create a new project:

```bash
basepair project create --name my_project --team 19366 -c /path/to/basepair.config.json
```

```text
created: project with id 37330
```

Share a project with a collaborator (`--team` is required here too):

```bash
basepair project update -u 37330 --team 19366 \
  --emails collaborator@example.com --perm view \
  -c /path/to/basepair.config.json
```

```text
project 37330 updated
```

Permission levels: `view`, `edit`, `admin`. `--emails` accepts several addresses; `--perm` applies to all of them. You can rename a project with `--name` in the same command.

---

## 2. Creating a sample

Create a sample within your project, specifying the sample name, data type, genome, and file locations:

```bash
basepair sample create --project 20083 \
  --name Untreat1 \
  --type atac-seq \
  --genome hg19 \
  --file1 /path/to/read_1.fastq.gz \
  --file2 /path/to/read_2.fastq.gz \
  -c /path/to/basepair.config.json
```

```text
created: sample with id 78476
Sample id: 78476
Creating upload read_1.fastq.gz
  created: upload with id 138264
Creating upload read_2.fastq.gz
  created: upload with id 138265
Sample created successfully.
```

Notes:

* `--name` is required; `--type` defaults to `rna-seq`.
* `--file1` / `--file2` accept several paths (one per lane). Files must exist locally and end in one of: `.ab1 .bai .bam .crai .csfasta .csv .fasta .fastq .fq .gvcf .qual .vcf .sam .sra .txt .bz .bz2 .gz .zip`.
* `--pipeline <id>` sets a default pipeline that runs as soon as the upload completes.
* `--platform <name>` records the sequencing platform.
* `--key K --val V` (repeatable) attaches extra metadata, e.g. `--key stranded --val yes --key adapter --val AGATCGGAAGAGC`.

To see all available data types:

```bash
basepair sample create -h
```

Supported types: `atac-seq`, `chip-seq`, `crispr`, `cutnrun`, `cutntag`, `dna-seq`, `other`, `panel`, `rna-seq`, `scaleBio_scRNA`, `scrna-seq`, `small-rna-seq`, `snap-chip`, `wes`, `wgs`.

To list available genomes:

```bash
basepair genome list -c /path/to/basepair.config.json
```

```text
  id  name                                                 created_on
----  ---------------------------------------------------  ---------------------------
   1  hg19                                                 2014-08-22T00:00:00Z
   2  mm10                                                 2014-08-22T00:00:00Z
   3  mm9                                                  2014-08-22T00:00:00Z
   5  tair10                                               2015-06-25T00:00:00Z
  …
```

List all samples in a project:

```bash
basepair sample list --project 20083 -c /path/to/basepair.config.json
```

```text
   id  name                     datatype      genome  date_created                 num_reads
-----  -----------------------  ----------  --------  ---------------------------  -----------
78476  recent-2274572-8-fastq   wes               23  2026-08-19T09:23:49.082533Z
78290  recent-2-fastq           dna-seq           23  2026-08-18T11:12:50.058228Z
78287  recent-fastq             dna-seq           23  2026-08-18T11:12:10.949276Z
```

Get details for a specific sample, including its analyses:

```bash
basepair sample get -u 78476 -c /path/to/basepair.config.json
```

```text
Sample id: 78476
Sample name: recent-2274572-8-fastq
Sample datatype: wes
Sample genome: GRCh38
Sample data created: 2026-08-19T09:23:49.082533Z
Sample num reads: None
Analyses:
    id  name                                             started_on                   completed_on                 status     tags
------  -----------------------------------------------  ---------------------------  ---------------------------  ---------  ------
128540  Count number of lines on recent-2274572-8-fastq  2026-09-18T17:58:56.183582Z  2026-09-18T18:03:29.980568Z  completed
125444  Count number of lines on recent-2274572-8-fastq  2026-08-24T14:04:40.424947Z  2026-08-24T14:09:11.540592Z  failed
```

Update a sample (e.g. change genome, data type or name):

```bash
basepair sample update -u 78476 --genome hg38 -c /path/to/basepair.config.json
```

`sample update` also accepts `--key K --val V` for the info fields `adapter`, `amplicon`, `barcode`, `regions` and `stranded`.

---

## 3. Running an analysis

Run an analysis by specifying the project, sample, and pipeline:

```bash
basepair analysis create --project 20083 \
  --sample 64002 \
  --pipeline 18 \
  -c /path/to/basepair.config.json
```

```text
You specified no parameters, submitting with default ones.
created: analysis 107644 with sample id(s) 64002
```

If the server reports a validation warning (for example a genome/pipeline mismatch), the CLI asks `Are you sure you want to proceed?`; pass `--ignore-warning` to skip the prompt.

To list all available pipelines:

```bash
basepair pipeline list -c /path/to/basepair.config.json
```

```text
    id  name                                                datatype    description                                                     tags
------  --------------------------------------------------  ----------  --------------------------------------------------------------  -----------------------------------
     8  Differential Expression (DESeq2, compare 2 groups)  rna-seq     Generate up/down lists, gct/cls files, volcano plot, heatmap    ['differential-expression']
    18  DNA-Seq QC, Alignment (BWA)                         dna-seq     Our **DNA-seq QC and Alignment** pipeline aligns WGS, WES, ...  ['dnaseq', 'alignment', 'default']
    19  ATAC-Seq Alignment (Bowtie2)                        atac-seq    Our **ATAC-seq Alignment (Bowtie2)** pipeline aligns your ...   ['atacseq', 'alignment', 'default']
  …
```

Run a differential-expression analysis with multiple samples and controls:

```bash
basepair analysis create \
  --sample 75042 75043 75044 \
  --control 75050 75051 \
  --pipeline 8 \
  -c /path/to/basepair.config.json
```

Override per-node parameters (format: `node_id:argument:value`; the value may itself contain colons):

```bash
basepair analysis create \
  --sample 75042 \
  --pipeline 8 \
  --params deseq2:padj:0.01 deseq2:lfc:1.5 \
  -c /path/to/basepair.config.json
```

Other `analysis create` options: `--instance <type>` to pick the compute instance type, `--custom-pipeline <yaml>` to run a pipeline definition that is not yet saved, and `--custom-modules <yaml> [<yaml> ...]` (together with `--pipeline`) to override individual modules.

List analyses in a project:

```bash
basepair analysis list --project 20083 -c /path/to/basepair.config.json
```

```text
    id  name                                               started on                   completed on                 status     tags
------  -------------------------------------------------  ---------------------------  ---------------------------  ---------  ----------------------------------
128540  Count number of lines on recent-2274572-8-fastq    2026-09-18T17:58:56.183582Z  2026-09-18T18:03:29.980568Z  completed
125065  Expression count (STAR) on recent-2-fastq          2026-08-18T11:41:41.505736Z  2026-08-18T11:46:52.867226Z  failed     ['rnaseq', 'alignment', 'default']
107644  DNA-Seq QC, Alignment (BWA) on Control1-fastq      2026-03-27T11:43:17.861317Z  2026-03-27T11:49:11.821880Z  completed  ['dnaseq', 'alignment', 'default']
```

Restart a completed or failed analysis (`restart` is an alias of `reanalyze`):

```bash
basepair analysis reanalyze -u 128540 -c /path/to/basepair.config.json
```

```text
Analysis 128540 has been restarted
```

Add `--force` to restart an analysis that is still running, and `--instance <type>` to change the instance type for the rerun.

Stop a running analysis:

```bash
basepair analysis terminate -u 128540 -c /path/to/basepair.config.json
```

```text
INFO: Termination process initiated for analysis id - 128540.
```

Update analysis metadata (e.g. rename it):

```bash
basepair analysis update -u 128540 --key name --val "WES QC run 2" -c /path/to/basepair.config.json
```

---

## 4. Downloading results

Download all files for a given analysis:

```bash
basepair analysis download -u 128540 -c /path/to/basepair.config.json
```

```text
Downloading ./recent_2274572_8_fastq.fastq.num_lines.txt
Copying from s3 bucket to  ./recent_2274572_8_fastq.fastq.num_lines.txt
All analysis files have been downloaded successfully.
```

Without `-o`, files land under `./basepair/analyses/<analysis id>/<node>/`. With `-o DIR` they are written directly into `DIR`.

> **Transient 403 errors are normal.** Downloads run `aws s3 cp` with short-lived credentials that the server issues for your account at the start of the command. Those credentials can take a few seconds to become active, so you may see
> `Error: b'fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden\n'` followed by `retrying in 3 seconds.` once or twice. The CLI retries automatically and prints `Succeeded after retry.` when the copy goes through. Only treat it as a real permission problem if all retries fail.

Download only the deduplicated alignment BAM files (tagged **dedup**):

```bash
basepair analysis download -u 128540 \
  --tags dedup \
  --tagkind subset \
  -c /path/to/basepair.config.json
```

Download only BAM files, saving to a specific directory:

```bash
basepair analysis download -u 128540 \
  --tags bam \
  --tagkind exact \
  -o ./bams \
  -c /path/to/basepair.config.json
```

Download everything except log files:

```bash
basepair analysis download -u 128540 \
  --tags log \
  --tagkind diff \
  -c /path/to/basepair.config.json
```

**Tag filter modes:**

| Mode | Behaviour |
|------|-----------|
| `exact` (default) | Only files whose tag set exactly matches the provided tags |
| `subset` | Any file that has at least one of the provided tags |
| `diff` | Exclude files that have the provided tag |

If no file matches, the command exits with:

```text
No matching files after filtering by tags: ['dedup']
ERROR: Downloading analysis failed.
```

To list all files of an analysis with their tags (so you know what to filter on):

```bash
basepair analysis get -u 128540 -c /path/to/basepair.config.json
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
    id  filesize (Gigabytes)    source       name                                        uri                                                                       tags
------  ----------------------  -----------  ------------------------------------------  ------------------------------------------------------------------------  -------------
496729  NA                      Count lines  recent_2274572_8_fastq.fastq.num_lines.txt  s3://<bucket>/analyses/4453/128540/count/recent_2274572_8_fastq...txt  ['num_lines']
```

Download the execution log of an analysis (saved as `worker.log`):

```bash
basepair analysis download-log -u 128540 -o ./logs -c /path/to/basepair.config.json
```

```text
Downloading ./worker.log
Copying from s3 bucket to  ./worker.log
All analysis logs have been downloaded successfully.
```

Download the raw uploaded reads of a sample (all uploads, or filtered by tag like analyses):

```bash
basepair sample download -u 78476 -o ./raw -c /path/to/basepair.config.json
```

---

## 5. Managing pipelines and modules

Create a pipeline from a YAML definition file:

```bash
basepair pipeline create --file /path/to/pipeline.yaml -c /path/to/basepair.config.json
```

Update an existing pipeline:

```bash
basepair pipeline update -u 380 --file /path/to/pipeline.yaml -c /path/to/basepair.config.json
```

Create a module:

```bash
basepair module create --file /path/to/module.yaml -c /path/to/basepair.config.json
```

`pipeline create` and `module create` accept several `--file` paths, `--force` to overwrite an existing definition with the same id, and (modules only) `--visibility private|public`.

Inspect a pipeline:

```bash
basepair pipeline get -u 8 -c /path/to/basepair.config.json
```

```text
  id  name                                                datatype    description                                                   tags
----  --------------------------------------------------  ----------  ------------------------------------------------------------  ---------------------------
   8  Differential Expression (DESeq2, compare 2 groups)  rna-seq     Generate up/down lists, gct/cls files, volcano plot, heatmap  ['differential-expression']
```

List modules for a pipeline:

```bash
basepair module list --pipeline 19 -c /path/to/basepair.config.json
```

```text
  id  name               owner          date_created
----  -----------------  -------------  ---------------------------
   5  Start              Basepair       2015-05-21T20:56:17.241925Z
  91  QC, Trim           Basepair       2018-10-22T19:57:10.291449Z
   2  Align (Bowtie2)    Basepair       2025-11-13T13:11:19.938848Z
  79  Remove duplicates  Basepair       2025-11-13T13:11:40.918152Z
  65  Filter reads       Basepair       2026-02-23T06:09:25.326450Z
   9  Save data          Basepair       2025-11-11T09:00:39.145677Z
  22  Stop               Basepair       2015-05-21T20:56:17.202762Z
```

Share a pipeline you own with other users:

```bash
basepair pipeline update -u 380 --emails collaborator@example.com --perm view -c /path/to/basepair.config.json
```

Delete pipelines or modules you own (each id is confirmed interactively):

```bash
basepair pipeline delete -u 380 -c /path/to/basepair.config.json
basepair module delete -u 1234 -c /path/to/basepair.config.json
```

---

## 6. Other commands

**Get JSON output** — add `--json` to any `get` or `list` command to print every field the API returns (one Python dict per item):

```bash
basepair analysis list --project 20083 --json -c /path/to/basepair.config.json
basepair sample get -u 78476 --json -c /path/to/basepair.config.json
```

```text
{'id': 78476, 'meta': {'filename': 'recent_2274572_8_fastq.fastq.gz', 'filesize': 41, 'filetype': 'fastq', ...}, 'genome_name': 'GRCh38', 'owner__username': 'user@example.com', 'datatype': 'wes', 'status': 'completed', 'projects': [20083], 'uploads': [{'id': 105484, 'uri': 's3://<bucket>/uploads/4453/78476/2274572-8_S4_L001_R1_002.fastq.gz', ...}], ...}
```

**Download a file by ID** (file ids are shown by `analysis get`):

```bash
basepair file download -u 496729 -o ./downloads -c /path/to/basepair.config.json
```

**Look up a genome by ID:**

```bash
basepair genome get -u 1 -c /path/to/basepair.config.json
```

```text
  id  name    created_on
----  ------  --------------------
   1  hg19    2014-08-22T00:00:00Z
```

**Errors.** When something goes wrong the CLI prints a line starting with `ERROR:` and exits non-zero, for example:

```text
ERROR: Resource with id 999999999 not found. Not found.
ERROR: Analyses data not found.
```

```text
ERROR: You don't have access to this resource. Invalid or expired token.
```

The second one means the `key` in your config's `api_v3` section is wrong or has been revoked — download a fresh config file from your profile page.

**Delete resources** (each id is confirmed interactively with `Are you sure you want to delete <id>?`):

```bash
basepair analysis delete -u 91182 -c /path/to/basepair.config.json
basepair sample delete -u 75042 -c /path/to/basepair.config.json
```
