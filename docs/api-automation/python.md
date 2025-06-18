---
sidebar_position: 3
---

# Python API

**Updated for basepair version:** 2.0.0  
Python bindings for Basepair’s API. An outline of the contents on this page:  
1. Listing available data  
2. Creating or deleting a sample  
3. Create an analysis  
4. Download result  

---  

After starting a `python3` interactive session run:  

```python
import basepair
import json

bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
```  

## 1. Listing available data  
You can list various types of data available to you via the `bp.print_data()` command. By default it prints a human-readable table (critical fields only). Set `json=True` to view the full raw JSON.  

### 1.1 List genomes  
Print the genomes table:  

```python
bp.print_data('genomes')
```  

Typical output:  

```
 id  name                      date_created
---- -----------------------   --------------------------
  1  hg19                      2018-04-18T14:58:15.865993
  2  mm10                      2018-04-18T15:05:39.770488
  3  mm9                       2018-04-18T15:10:33.438603
  …
```  

Raw JSON:  

```python
bp.genomes
```  

```json
[
  {"date_created": "2018-04-18T14:58:15.865993", "id": 1, "name": "hg19",
   "resource_uri": "/api/v1/genomes/1"},
  {"date_created": "2018-04-18T15:05:39.770488", "id": 2, "name": "mm10",
   "resource_uri": "/api/v1/genomes/2"},
  …
]
```  

### 1.2 List workflows  
Pretty table:  

```python
bp.print_data('workflows')
```  

Raw JSON:  

```python
bp.get_workflows()
```  

### 1.3 List samples  
Pretty table:  

```python
bp.print_data('samples')
```  

Raw JSON:  

```python
bp.get_samples()
```  

### 1.4 Get a sample  

```python
sample = bp.get_sample(10000)
```  

### 1.5 List analyses  
Pretty table:  

```python
bp.print_data('analyses')
```  

Raw JSON:  

```python
bp.get_analyses()
```  

#### 1.5.1 Analysis detail  
Pretty table for analysis `10000`:  

```python
bp.print_data('analysis', uid=[10000])
```  

Raw JSON:  

```python
bp.get_analysis(10000)
```  

---  

## 2. Creating or deleting a sample  
A Basepair sample is handled through the `BpSample` class. You can either create a new sample or get information for an existing one.  

### 2.1 Create a new sample  
In this example we create **Sample1**—paired-end RNA-seq data on the Illumina platform using the **hg19** genome (project ID optional).  

```python
data = {
    'name': 'Sample1',
    'genome': 'hg19',
    'datatype': 'rna-seq',
    'platform': 'illumina',
    'filepaths1': [
        'Sample1.lane1.R1.fastq.gz',
        'Sample1.lane2.R1.fastq.gz'],
    'filepaths2': [
        'Sample1.lane1.R2.fastq.gz',
        'Sample1.lane2.R2.fastq.gz'],
    # 'projects': '123',  # optional
}

sample = bp.create_sample(data=data)
```  

Run `?BpSample` in Python for more fields.  

### 2.2 Delete a sample  

```python
bp.delete_sample(10000)   # returns <Response [204]> on success
```  

---  

## 3. Creating or deleting an analysis  
*This section is still under construction.*  

Create an analysis (e.g., STAR mapping) once you know the `workflow_id`:  

```python
bp.create_analysis(workflow_id='4', sample_id='3206')
```  

Custom parameters example:  

```python
bp.create_analysis(
    workflow_id='5',
    sample_id='1',
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

For pipelines needing >2 groups (e.g., DESeq, Cuffdiff):  

```python
bp.create_analysis(
    workflow_id='42',
    sample_ids=[5014, 5016, 5017, 5018],
    params={
        'node': {
            'deseq': {
                'group_ids': '5017,5018:5016:5014',
                'group_names': 'group 1 name:group 2 name:group 3 name'
            }
        }
    }
)

bp.create_analysis(
    workflow_id='29',
    sample_ids=[5014, 5016, 5017, 5018],
    params={
        'node': {
            'cuffdiff': {
                'group_ids': '5017,5018:5016:5014',
                'group_names': 'group 1 name:group 2 name:group 3 name'
            }
        }
    }
)
```  

---  

## 4. Download results  
You can download files from one or more analyses.  

### 4.1 Example 1  
*Downloads analysis 10000, excluding files tagged “bam”, into `./test/`:*  

```python
bp.download_analysis(
    10000,
    tags=[['bam']],
    tagkind='diff',
    outdir='./test/')
```  

### 4.2 Example 2  
*Downloads only files tagged “fastqc” from analysis 10000 into `./test/`:*  

```python
bp.download_analysis(
    10000,
    tags=[['fastqc']],
    tagkind='subset',
    outdir='./test/')
```  

### 4.3 Example 3  
*Downloads files tagged either (“rnaseq_metrics” & “json”) **or** (“fastqc” & “zip”) from analysis 10000 into `./test/`:*  

```python
bp.download_analysis(
    10000,
    tags=[['rnaseq_metrics', 'json'], ['fastqc', 'zip']],
    tagkind='exact',
    outdir='./test/')
```  



