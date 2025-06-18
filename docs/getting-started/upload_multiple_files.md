---
sidebar_position: 14
---

# How to upload a sample with multiple files to Basepair

<iframe width="640" height="360" src="https://www.youtube.com/embed/mhLJ9UeDIPM" frameborder="0" allowfullscreen></iframe>

**How do I upload a sample with multiple files?**

Sometimes, when you get data back from sequencing, you may find that a single sample is associated with multiple **FASTQ** files. This is totally fine—it just depends on how your sequencing service provider prefers to send over the data.

Let’s take a look at an example of uploading a sample with multiple files to Basepair.

Here, I have **6 files** for a sample we’ll call **Sample 1**: 3 forward-read (**R1**) files and 3 reverse-read (**R2**) files. *R1* indicates forward reads and *R2* indicates reverse reads.

Select the files you want to upload from your computer. Basepair usually sorts these files correctly if they follow a standard naming convention, but always double-check. If the files are mis-sorted, simply drag and drop them into the correct section.

Next, select the appropriate metadata for your samples and click **Upload** to start the process.

---

### Common mistakes

1. **Splitting one sample into multiple samples**  
   Don’t separate different FASTQ files from the same sample into different samples—drag and drop them into a single sample section instead.

2. **Treating technical replicates as a single sample**  
   Only group files that truly belong to one biological sample. If you combine separate technical replicates into one sample, Basepair will merge them, leading to incorrect analysis results.
