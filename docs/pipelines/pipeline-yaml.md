---
sidebar_position: 3
---

# Pipeline YAML 

You may configure the pipeline parameters in a YAML file.

- validation `Validations to be performed before even creating an analysis`
  - optional `Optional validation, user will get an option to ignore warnings`
  - required `Requred validation, user will not be able to start analysis`

Here are a list of possible validations and accepted values. These validations
maybe added to either the optional or required sections.

- datatype `accepts multiple values as list, e.g, rna-seq, chip-seq, etc`
- filetypes `accepts multiple values as list, e.g, bam, fastq, etc`
- genome `if true, all samples must have a genome set`
- num_samples `number of samples accepted by the pipeline, possible values are 0, 1 (exactly 1), 1+ (one or more), etc.`
- num_controls `number of controls accepted by the pipeline, possible values are same as num_samples.`


### Example configuration
In this example, if the data type is other than rna-seq, users gets a warning.
The only accepted file types in the sample are fastq and bam. Each sample must
have a genome assigned and the pipeline will run on a single sample.

```
validation:
  optional:
    datatype:
      - rna-seq
  required:
    filetypes:
      - fastq
      - bam
    genome: true
    num_samples: '1'
    num_controls: '0'
```
