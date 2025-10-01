---
sidebar_position: 4
---

# Custom modules

### Introduction

The **Module** feature allows users to create, manage, and reuse modules that can be integrated into pipelines. These modules define reusable commands, inputs, and outputs for various analysis tasks.

#### Navigate to Module List Page
- From the header, click on Modules.
- This opens the Module List Page.

    ![modules-button](/img/modules-button.png)

    ##### Features on the listing page
        - **Filters & Pagination**: Search and filter modules, and navigate using pagination at the bottom.
        - **+ New Button**: Located at the top-right, used to create a new custom module.
        - **Module Name Links**: Clicking on a module name opens its Detail Page

    ![modules-listing-page](/img/modules-listing-page.png)

#### Module Detail Page
When you click a module name from the list:
- The **Module Detail Page** opens.
- It shows **Description, Command, Inputs, and Outputs**.
- At the **top-right** corner, you will see:
    - **Edit** → Update an existing module.
    - **Download as YAML** → Export the module definition as a YAML file.

    ![modules-detail-page](/img/modules-detail-page.png)

#### Creating a New Module
To create a new module:
- Click on **+ New** from the Module List Page.
- Fill in the required details:
    - **Name** (mandatory)
    - **Description**
    - **Type, Visibility, Version**
    - **Command** (the actual script/command the module will execute)

- Define Inputs (label, name, type, optional, default values, etc.)
- Define Outputs (action, name, type, save options, etc.)
- Click Save.

    ![new-module-page](/img/new-module-page.png)

#### Editing a Module
- From the **Module Detail Page**, click **Edit**.
- Update any required fields (Name, Command, Inputs, Outputs, etc.).
- Click **Save** to apply changes.

    ![edit-module-page](/img/edit-module-page.png)

#### Downloading a Module (YAML)
- On the **Module Detail Page**, click **Download as YAML**.
- This will export the module configuration into a .yaml file for reuse or sharing.

#### Using Modules in Pipelines
- **Modules** can be used inside **Pipelines**.
- When designing a pipeline, you can drag and drop or select these modules as nodes in Custom Pipeline as well.





