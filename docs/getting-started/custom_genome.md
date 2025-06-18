---
sidebar_position: 15
---
# Uploading a custom genome

If your genome of interest is not currently available on Basepair, you can create it by uploading **both** a FASTA file and a GTF or refflat file. We’ll incorporate them automatically into downstream analyses.

### Step&nbsp;1: Under the **Samples** tab click **Add genome**

![Add genome button](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14108483154/original/RV0LE-3n_5thiQbYggu1468xQFsmS3-JfA.png?1661529987)

### Step&nbsp;2: Add the genome name and necessary files

Give the genome a **unique name**, preferably including both the assembly and species information.

Add files:

- **Genomic sequence FASTA file**  
  (typically ends in `.fna`, `.fa`, or `.fasta` and should be gzipped `.gz`)
- **Gene-annotation GTF or refflat file**  
  (typically ends in `.gtf` or contains “refflat” and **must be uncompressed**)

*Be sure the gene-annotation file matches the genome assembly you’re uploading!*

![Upload genome files](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14108483214/original/IGA1dzIY1xbTbAhqx9nei4586DOuBxzLBw.png?1661530091)

Optional details can be added below under **Genome parameters**.

Finally, click **Add genome** at the bottom to begin uploading the files (usually &lt; 10 min):

![Add genome dialog](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14114365851/original/tW2FgsRBEPv6VI_5cvI5M_YzZKOlzaq9Ow.png?1671044021)

After the upload finishes, an analysis will automatically start in your current project to **index the new genome** for each aligner (typically ~1 hr):

![Indexing in progress](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14114366120/original/iaaFZM9y2Qa-QPLgIjnPgHozevUSrzRT-A.png?1671044508)  
![Indexing complete](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14114366146/original/8b9uuQb5i5JvKLlUPBksCk1E0ccZtuIEXg.png?1671044546)

Once indexing is complete, your custom genome will be available during sample creation under **Custom** genomes:

![Custom genome option](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/14108643981/original/RmMjQXR9TEvBbw-WRTeLoPYkHfTdaNwylA.png?1661882745)
