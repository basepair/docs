---
sidebar_position: 3
---

# Import from BaseSpace

## Sample Import from BaseSpace

- ### Prerequisites
    Before you begin:
    - You must have an active BaseSpace Sequence Hub account:
    [BaseSpace Sequence Hub account](https://basespace.illumina.com)

    - You must have an active Basepair account


    - Ensure you have read access to both the run and the associated project on BaseSpace.
    (Runs and projects have separate permissions — sharing a run doesn’t automatically share its project.)


    - If you belong to multiple workspaces (personal or group), set the correct active workspace in BaseSpace:
     [https://basespace.illumina.com/dashboard](https://basespace.illumina.com/dashboard)


- ### Import Workflow Overview

    #### Step 1: Go to “Import From BaseSpace” Page
    In Basepair, navigate to **Data** → **Import** → **BaseSpace**.
    ![import-from-basespace-option](/img/import-from-basespace-option.png)

    #### Step 2: Select a Region
    Choose the BaseSpace data region (e.g., US, EU) from which you want to import biosamples.
    ![select-region](/img/select-region.png)

    #### Step 3: Choose Source
    You can import biosamples:
        - From Projects, or
        - From Runs
        ![select-project](/img/select-project.png)
        ![select-run](/img/select-run.png)

    #### Step 4: Select Samples
    You’ll see a list of biosamples (.fastq files).
        - Multiple selection is allowed.
        - You can choose from:
            - Multiple runs within a project
            - Multiple projects
            - A combination of both
        ![select-samples](/img/select-samples.png)

    #### Step5: Start Import
    Click **“Upload Samples”** to begin the import process.
    ![upload-samples](/img/upload-samples.png)

    The **progress**, **logs**, and **status** will be visible on the same page.
    ![report-page](/img/report-page.png)

- ### Import possibilities

    #### Import Raw Files
    - Import .bcl (raw data) files
        - **At a time** .bcl files from **only one** run can be imported.

    #### Sample Grouping
    - **Automatic**: Groups biosamples based on BaseSpace metadata.
    - **Group into Single Sample**: Merges multiple biosamples into one sample during import.

    #### File Formats Supported
    - **FASTQ** (biosample-level) — multiple biosamples allowed per import
    - **BCL (raw)** — only one run at a time

    Note:  Importing **both .bcl files and biosamples simultaneously is not supported**.

- ###  Data Sharing Notes
    - **Runs** and **Projects** in BaseSpace are independent.
    - Sharing a run does **not** share its associated project or biosamples.
    - You can share data with collaborators by:
        - Adding collaborators to a **workgroup** (grants full access)
        - Sharing a **project** (grants access to all associated data)
        - Sharing a **run** (grants read-only access to that run only)

    If you only wish to share FASTQ datasets, download and share them manually.
    Learn more:
    - [BaseSpace Sharing Guide](https://help.basespace.illumina.com/collaborate/sharing-data)
    - [Transfer Ownership](https://help.basespace.illumina.com/manage-data/transfer-ownership)

- ### Further Reading 
    For advanced users or API integrations:
    - [BaseSpace Developer Overview](https://developer.basespace.illumina.com/docs/content/documentation/getting-started/overview)
    - [BaseSpace REST API Model](https://developer.basespace.illumina.com/docs/content/documentation/rest-api/data-model-overview)
    - [BaseSpace Developer Guide (Notion)](https://www.notion.so/basepair/BaseSpace-Dev-Guide-4350ef0a86784350bd8a5b0638aedc8a)