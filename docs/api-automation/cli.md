---
sidebar_position: 1
---

# Command line API



Updated for basepair version 2.0.0  

Command-line (CLI) bindings for Basepair’s API. The CLI bindings are just a thin wrapper around the Python bindings, which are more fully-featured. If you can’t do something with the CLI, check the Python API instead.

An outline of the contents on this page:

1. Creating a project  
2. Creating a sample  
3. Running an analysis  
4. Downloading results  

---

## 1. Creating a project

First, list your existing projects. A new Basepair account starts with two projects—one with example data and an empty **Project 1**:

```bash
basepair project list -c /path/to/basepair.config.json
```

```text
id   name          owner        fullname          last updated                visibility
---- ------------  -----------  ----------------  --------------------------  -----------
 784 Example Data  Amit Sinha   2022-03-11T14:01:19.850152  public
8611 Project 1     Username     2022-05-15T19:20:06.378477  private
```

Now, create a new project:

```bash
basepair project create --name new_project -c /path/to/basepair.config.json
```

```text
created: project with id 8658
```

---

## 2. Creating a sample

Create a sample within your new project, specifying the sample name, data type, genome, and file locations:

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

To see all available data types and other metadata:

```bash
basepair sample create -h
```

To list available genomes:

```bash
basepair genome list -c /path/to/basepair.config.json
```

You can check the samples in a project with:

```bash
basepair sample list --project 8658 -c /path/to/basepair.config.json
```

---

## 3. Running an analysis

Run an analysis—here, ATAC-seq alignment with Bowtie 2—by specifying the project, sample, and pipeline:

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

---

## 4. Downloading results

Download the entire analysis directory tree and all files for a given analysis ID:

```bash
basepair analysis download -u 91182 -c /path/to/basepair.config.json
```

To download only the alignment BAM and BAM index files (tagged **dedup**) and their directory tree:

```bash
basepair analysis download -u 91182 \
  --tags dedup \
  --tagkind subset \
  -c /path/to/basepair.config.json
```

To list all files of an analysis with their tags:

```bash
basepair analysis get -u 91182 -c /path/to/basepair.config.json
```

To download only the heatmaps and bigWig track from an analysis:

```bash
basepair analysis download -u 90747 \
  --tags png igv \
  --tagkind subset \
  -c /path/to/basepair.config.json
```


