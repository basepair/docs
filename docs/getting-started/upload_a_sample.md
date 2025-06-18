---
sidebar_position: 9
---

# Upload a Sample

<iframe width="584" height="334" src="https://www.youtube.com/embed/E4nTWCw8OJI" frameborder="0" allowfullscreen></iframe>

1. Navigate to [Samples](https://app.basepairtech.com/#/samples/) → [New Sample](https://app.basepairtech.com/#/samples/new).

2. Fill in the sample information and click **Save**. Below is a brief overview of all the fields:

   - **Name:** Choose a name that makes the sample easy to find later (e.g., `KRAS_mut.replicate_2`, `K562.H3K4me3`).
   - **Platform:** We support all major NGS platforms. If you’re not sure, choose **Illumina**.
   - **Data type:** We support DNA-Seq, RNA-Seq, ChIP-Seq, and ATAC-Seq. If you have another data type, please contact us.
   - **Genome:** We support human (hg19), mouse (mm10, mm9), and zebrafish (danRer10). If your genome/assembly is not supported, let us know and we’ll be happy to add it.
   - **Workflow:** Choose the workflow you wish to run on your data. You can change it later before starting the analysis. See details on the [Workflows](https://app.basepairtech.com/#/workflows/) page.
   - **Raw data:** Upload raw FASTQ files (optionally compressed with `.gz` or `.bz2`). Some workflows also accept aligned BAM files. Single-end reads require **1 file**; paired-end reads require **2 files**.
   - **Insert size:** The size of DNA fragments selected for sequencing (usually required for ChIP-Seq analyses).

3. The upload will start and you’ll see the progress on the right side. Please leave the computer running while uploads continue. Uploads typically take about **20 minutes per sample**, depending on your internet bandwidth.
