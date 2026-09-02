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

### Global options

| Option | Description |
|--------|-------------|
| `-c, --config PATH` | Path to config JSON file (or set `BP_CONFIG_FILE`) |
| `-v, --version VERSION` | API version to use: `v3` (default) or `v2` |
| `--quiet` | Suppress output |
| `--verbose` | Enable verbose output |
| `--scratch DIR` | Working directory for temporary files (default: `.`) |

The `-v` / `--version` flag forces a specific API version for that command. Starting with package 3.x, **v3 is the default** — you only need this flag to explicitly use v2:

```bash
# Use v2 for a specific command (rarely needed)
basepair -v v2 analysis list --project 8658 -c /path/to/basepair.config.json
```

Your config file must contain the corresponding section (`api_v3` for v3, `api` for v2) — see [Setup](./setup).

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
id     name          owner               last updated
------ ------------- ------------------- --------------------------
   784 Example Data  user@example.com    2022-03-11T14:01:19
  8611 Project 1     user@example.com    2022-05-15T19:20:06
```

Create a new project (requires a team ID, visible in your account settings):

```bash
basepair project create --name my_project --team 1234 -c /path/to/basepair.config.json
```

```text
created: project with id 8658
```

Share a project with a collaborator:

```bash
basepair project update -u 8658 --team 1234 \
  --emails collaborator@example.com --perm view \
  -c /path/to/basepair.config.json
```

Permission levels: `view`, `edit`, `admin`.

---

## 2. Creating a sample

Create a sample within your project, specifying the sample name, data type, genome, and file locations:

```bash
basepair sample create --project 8658 \
  --name Untreat1 \
  --type atac-seq \
  --genome hg19 \
  --file1 /path/to/read_1.fastq.gz \
  --file2 /path/to/read_2.fastq.gz \
  -c /path/to/basepair.config.json
```

```text
created: sample with id 75042
Sample id: 75042
Creating upload read_1.fastq.gz
  created: upload with id 138264
Creating upload read_2.fastq.gz
  created: upload with id 138265
Sample created successfully.
```

To see all available data types:

```bash
basepair sample create -h
```

Supported types: `atac-seq`, `chip-seq`, `crispr`, `cutnrun`, `cutntag`, `dna-seq`, `other`, `panel`, `rna-seq`, `scaleBio_scRNA`, `scrna-seq`, `small-rna-seq`, `snap-chip`, `wes`, `wgs`.

To list available genomes:

```bash
basepair genome list -c /path/to/basepair.config.json
```

List all samples in a project:

```bash
basepair sample list --project 8658 -c /path/to/basepair.config.json
```

Get details for a specific sample:

```bash
basepair sample get -u 75042 -c /path/to/basepair.config.json
```

Update a sample (e.g. change genome or data type):

```bash
basepair sample update -u 75042 --genome hg38 -c /path/to/basepair.config.json
```

---

## 3. Running an analysis

Run an analysis by specifying the project, sample, and pipeline:

```bash
basepair analysis create --project 8658 \
  --sample 75042 \
  --pipeline 19 \
  -c /path/to/basepair.config.json
```

```text
created: analysis 91182 with sample id(s) 75042
```

To list all available pipelines:

```bash
basepair pipeline list -c /path/to/basepair.config.json
```

Run a differential-expression analysis with multiple samples and controls:

```bash
basepair analysis create \
  --sample 75042 75043 75044 \
  --control 75050 75051 \
  --pipeline 8 \
  -c /path/to/basepair.config.json
```

Override per-node parameters (format: `node_id:argument:value`):

```bash
basepair analysis create \
  --sample 75042 \
  --pipeline 8 \
  --params deseq2:padj:0.01 deseq2:lfc:1.5 \
  -c /path/to/basepair.config.json
```

List analyses in a project:

```bash
basepair analysis list --project 8658 -c /path/to/basepair.config.json
```

Restart a completed or failed analysis:

```bash
basepair analysis reanalyze -u 91182 -c /path/to/basepair.config.json
```

Stop a running analysis:

```bash
basepair analysis terminate -u 91182 -c /path/to/basepair.config.json
```

---

## 4. Downloading results

Download all files for a given analysis:

```bash
basepair analysis download -u 91182 -c /path/to/basepair.config.json
```

Download only the deduplicated alignment BAM files (tagged **dedup**):

```bash
basepair analysis download -u 91182 \
  --tags dedup \
  --tagkind subset \
  -c /path/to/basepair.config.json
```

Download only BAM files, saving to a specific directory:

```bash
basepair analysis download -u 91182 \
  --tags bam \
  --tagkind exact \
  -o ./bams \
  -c /path/to/basepair.config.json
```

Download everything except log files:

```bash
basepair analysis download -u 91182 \
  --tags log \
  --tagkind diff \
  -c /path/to/basepair.config.json
```

**Tag filter modes:**

| Mode | Behaviour |
|------|-----------|
| `exact` | Only files whose tag set exactly matches the provided tags |
| `subset` | Any file that has at least one of the provided tags |
| `diff` | Exclude files that have the provided tag |

To list all files of an analysis with their tags:

```bash
basepair analysis get -u 91182 -c /path/to/basepair.config.json
```

Download the execution log:

```bash
basepair analysis download-log -u 91182 -o ./logs -c /path/to/basepair.config.json
```

---

## 5. Managing pipelines and modules

Create a pipeline from a YAML definition file:

```bash
basepair pipeline create --file /path/to/pipeline.yaml -c /path/to/basepair.config.json
```

Every pipeline has one or more **versions** (`PipelineVersion`) — exactly one is marked the *default*, and that's the one analyses run against unless a specific version is requested. `pipeline create` creates the pipeline and its initial default version (`1.0`) together.

### Updating a pipeline in place

`pipeline update` mutates the pipeline and its **default version** directly — it does not create a new version:

```bash
basepair pipeline update -u 380 --file /path/to/pipeline.yaml -c /path/to/basepair.config.json
```

Since this changes the version every existing analysis already runs against, it's best for small, low-risk fixes. For a bigger change you want to test before it goes live, create a new version instead.

### Creating a new pipeline version

`pipeline_version create` adds a new, **non-default** version to an existing pipeline — it never touches the current default, so nothing changes for existing analyses until you explicitly promote it:

```bash
basepair pipeline_version create --file /path/to/pipeline_v2.yaml -c /path/to/basepair.config.json
```

```text
created: pipeline version 2199 (1.1) for pipeline 380. It is NOT the default version yet -- run 'pipeline update -u 380 --set-default 2199' to promote it when ready.
```

The pipeline this version belongs to is the `id` field inside the YAML itself — there's no separate pipeline flag. The new version's number is bumped automatically from the pipeline's current default (e.g. `1.0` → `1.1`); you never specify this yourself. If the pipeline has no version yet (legacy data), the new one is created as the default instead.

### Editing an existing version

To edit a specific version's content directly — without forking a new one, and without changing which version is default — use `pipeline_version update` with the version's own ID:

```bash
basepair pipeline_version update -u 2199 --file /path/to/pipeline_v2_fixed.yaml -c /path/to/basepair.config.json
```

The YAML is authoritative: any field you omit (`description`, `summary`, `visibility`) is cleared, not left as-is.

### Promoting a version to default

Once you've tested a new version, promote it so analyses start using it:

```bash
basepair pipeline update -u 380 --set-default 2199 -c /path/to/basepair.config.json
```

```text
updated: pipeline version 2199 (1.1) is now the default for pipeline 380.
```

`-u` must be the pipeline the version actually belongs to — the CLI verifies this and refuses if they don't match, so a typo can't silently promote the wrong pipeline's version.

Create a module:

```bash
basepair module create --file /path/to/module.yaml -c /path/to/basepair.config.json
```

List modules for a pipeline:

```bash
basepair module list --pipeline 19 -c /path/to/basepair.config.json
```

---

## 6. Other commands

**Get JSON output** — add `--json` to any `get` or `list` command:

```bash
basepair analysis list --project 8658 --json -c /path/to/basepair.config.json
basepair sample get -u 75042 --json -c /path/to/basepair.config.json
```

**Download a file by ID:**

```bash
basepair file download -u 456789 -o ./downloads -c /path/to/basepair.config.json
```

**Delete resources:**

```bash
basepair analysis delete -u 91182 -c /path/to/basepair.config.json
basepair sample delete -u 75042 -c /path/to/basepair.config.json
```
