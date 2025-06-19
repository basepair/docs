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

Now that you know how to upload samples with multiple files to Basepair, let's look at two common mistakes people make.

One common mistake people make is they split multiple FASTQ files into separate samples. Here's what you should NOT do. Instead, you'll want to drag and drop these into one sample section.

Another common mistake people make is when they treat technical replicates as a single sample. Make sure that when you're uploading multiple files to Basepair, that they are actually part of a single sample, and not, for example, two or three separate technical replicates. If you have replicates but upload those files as part of a single sample, all those files will be treated as a single sample by the software and merged together. This will give you incorrect analysis results.
