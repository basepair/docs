---
sidebar_position: 1
title: Local upload
---


## Upload local files

<iframe width="640" height="360" src="https://www.youtube.com/embed/gVDmHGulM0Q" frameborder="0" allowfullscreen></iframe>

Basepair’s local upload system is very easy to use. There 2 steps, one select files and two, enter the meta data common to all samples.


### Select files
To add your data to Basepair, click **Upload**. Next, select your files. You will in most cases want to upload data files in **FASTQ** format. Generally, if you have single-end reads, you will have **1 file** and if you have paired-end reads, you will have **2 files**.  

### Check grouping of files for multi sample upload
Basepair does a good job of grouping your files based on whether your data is single- or paired-end, but you’ll want to double-check that your files have been grouped correctly, since naming conventions can vary.  

### Set meta data
Next, you’ll want to add the appropriate metadata settings. Choose your **data type**, **genome**, and other optional fields such as spike-in or insert size.

- **Platform:** We support all major NGS platforms. If you are not sure, choose **Illumina**.  
- **Data type:** We support DNA-Seq, RNA-Seq, ChIP-Seq and ATAC-Seq. If you have any other data type, please contact us.  
- **Genome:** We support many genomes! If your genome/assembly is not supported, please let us know and we will be happy to add it.  
- **Insert size:** The size of DNA fragment selected for sequencing. Usually required for ChIP-Seq analyses.  

The upload will start and you will see the progress bar directly on the page.  

:::warning Keep Your Computer Running!
Uploads may take some time, especially for large files. Ensure your computer stays powered on and connected to a stable internet connection. Most office networks should allow approx 1Gb per minute.
:::

Once the data upload process has started, you’re ready to start analyzing it! You don't have to wait for upload to complete to trigger analysis. The platform will automatically wait for upload to complete before actually starting the analysis process.

:::note Need Help with Unsupported Data Types?
If you’re working with a data type not listed in the metadata options, feel free to contact us at **[support@basepairtech.com](mailto:support@basepairtech.com)**.
:::

## Add samples with paired-end data

<p><span class="fr-video fr-fvc fr-dvb fr-draggable fr-active"><iframe width="640" height="360" src="https://www.youtube.com/embed/wXtVVhVllm4?&feature=youtu.be&wmode=opaque" frameborder="0" allowfullscreen="" class="fr-draggable" sandbox="allow-scripts allow-forms allow-same-origin allow-presentation"></iframe></span></p>


## Upload a sample with multiple files to Basepair

Sometimes, when you get data back from sequencing, you may find that a single sample is associated with multiple **FASTQ** files. This is totally fine—it just depends on how your sequencing service provider prefers to send over the data.

<iframe width="640" height="360" src="https://www.youtube.com/embed/mhLJ9UeDIPM" frameborder="0" allowfullscreen></iframe>

Let’s take a look at an example of uploading a sample with multiple files to Basepair.

Here, I have **6 files** for a sample we’ll call **Sample 1**: 3 forward-read (**R1**) files and 3 reverse-read (**R2**) files. *R1* indicates forward reads and *R2* indicates reverse reads.

Select the files you want to upload from your computer. Basepair usually sorts these files correctly if they follow a standard naming convention, but always double-check. If the files are mis-sorted, simply drag and drop them into the correct section.

Next, select the appropriate metadata for your samples and click **Upload** to start the process.

---
### Common mistakes

Now that you know how to upload samples with multiple files to Basepair, let's look at two common mistakes people make.

One common mistake people make is they split multiple FASTQ files into separate samples. Here's what you should NOT do. Instead, you'll want to drag and drop these into one sample section.

Another common mistake people make is when they treat technical replicates as a single sample. Make sure that when you're uploading multiple files to Basepair, that they are actually part of a single sample, and not, for example, two or three separate technical replicates. If you have replicates but upload those files as part of a single sample, all those files will be treated as a single sample by the software and merged together. This will give you incorrect analysis results.
