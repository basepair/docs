---
sidebar_position: 1
---

# Organisation settings

## Introduction
The Organisation Settings page enables Host Admin to configure core settings for the company, product branding, infrastructure, metadata preferences, and integrations. This document outlines each tab, its fields, and tooltip descriptions, along with visual references.

## Navigating to the Organisation Settings Page
To access the organization settings, follow these steps:
- Click on the profile icon located at the top-right corner of the header.
- From the dropdown menu, select "Organisation Settings."
- You will be redirected to the Organisation Settings page.
- The image below highlights the location of the "Organisation Settings" option in the dropdown.


    ![organisation-settings-option](/img/organisation-settings-option.jpg)


## Tabs Overview

The Organisation Settings interface is divided into the following tabs:
- Company Info
- Custom Branding
- Infra
- Metadata
- Integration

    ### Company Info
    Configure company name, contact details, signup options, and more.

    | **Field Name**     | **Description**                                       | **Tooltip Info (if any)**                                |
    |---------------------|-------------------------------------------------------|----------------------------------------------------------|
    | Company Name        | Name of your organization. This will appear on headers or emails. | Registered name of the company.                          |
    | Product Name        | Name of the product used across the app for branding. | Product name used for sign-up and other pages.           |
    | Company Address     | Official physical address of your organization.       | —                                                        |
    | Contact Name        | Point of contact (team or individual).                | The primary contact name used for company support and services. |
    | Email Id            | Primary support/contact email ID.                     | The primary email address used for company support and services. |
    | City                | City of company address.                              | —                                                        |
    | State               | State of company address.                             | —                                                        |
    | Country             | Country of company address.                           | —                                                        |
    | Zip Code            | Postal code of company address.                       | —                                                        |
    | Website             | Your organization's website URL.                      | Company's official website for product and service information. |
    | Referral Link       | Toggle to enable referral-based user onboarding.      | Share this link to invite others to sign-up and join the service. |
    | Sign-up Activation  | Toggle to require admin activation for new sign-ups.  | Allows users to sign-up using an email verification link. |
    | Plain Sign-up       | Toggle to allow sign-ups without email verification.  | Allows users to sign-up using only their email, name, and password. |
    | Required TOS        | Toggle to enforce Terms of Service agreement during signup. | Requires users to agree to the Terms of Service to access the platform. |



    ![organisation-settings-detail](/img/organisation-settings-detail.jpg)



    ### Custom Branding
    Customize branding elements like logos, themes, and product labels.

    | **Field Name**     | **Description**                           | **Tooltip Info (if any)** |
    |---------------------|-------------------------------------------|----------------------------|
    | Logo Upload         | Upload your custom logo.                  | —                          |
    | Favicon Upload      | Upload your custom favicon.               | —                          |
    | Primary Color       | Primary brand color for UI elements.      | Used for the background color of headers. |
    | Secondary Color     | Secondary brand color for UI elements.    | Background color for action buttons such as Create New Project, Run Analysis, Verify, Set New Password, and similar actions. Color of loaders, button borders (on hover), navigation link color text, tab bottom borders, tab text, table link colors, etc. |
    | Tertiary Color      | Tertiary brand color for UI elements.     | Background color for action buttons such as Create New Project, Run Analysis, Verify, Set New Password, and similar actions. Color of loaders, button borders (on hover), navigation link color text, tab bottom borders, tab text, table link colors, etc. |
    | Text Color          | Text color for application.               | Standard text color used throughout the application for text.  Navigation link hover text color, tab bottom borders, tab text, table link colors, etc. |
    | Button Text Color   | Button text color.                        | Text color specifically for action buttons. |


    ### Infra Tab
    Manage infrastructure-related configurations.

    #### Compute Settings

    Fields and their tooltips:

    | **Field Name**              | **Description**                                      | **Tooltip Info (if any)** |
    |------------------------------|------------------------------------------------------|----------------------------|
    | Lifecycle                    | Choose between On-Demand (standard pricing) and Spot (cost-saving). | Default instance lifecycle, spot or on-demand |
    | Max wait for Spot Availability | Time to wait before falling.                        | Max wait time (seconds) for spot availability before switching to on-demand. |
    | Behavior on Error            | Time delay before termination on error.              | Auto-terminate after X seconds if pipeline has an error. If the field is empty, the instances don’t terminate. |

    #### Storage Settings

    | **Field Name**       | **Description**                        | **Tooltip Info (if any)** |
    |-----------------------|----------------------------------------|----------------------------|
    | Archive Input after   | Days after which input is archived     | Number of days after which input data is archived. |
    | Archive Class         | Type of archive (e.g., Glacier Deep Archive) | Storage class for archive |



    ![organisation-settings-infra-tab](/img/organisation-settings-infra-tab.png)



    ### MetaData Tab
    Define and manage custom metadata fields for your datasets or workflows.

    | **Field Name**         | **Description**                        | **Tooltip Info (if any)** |
    |-------------------------|----------------------------------------|----------------------------|
    | Enabled Platforms       | Platforms which supports like Illumina, PacBio, etc. | Platform choices for users. |
    | Default Platform        | Preselected platform.                   | Select the default Platforms. |
    | Enabled Data Types      | Data types supported (e.g., RNA-Seq, ATAC-Seq) | Data type choices for users. |
    | Default Data Types      | Preselected data types                  | Select the default Data type. |



    ![organisation-settings-metadata-tab](/img/organisation-settings-metadata-tab.png)



    ### Integration Tab
    Configure external system or platform integrations.

    #### GitHub Integration

    - Install Basepair App: Button to install GitHub App.
    - Git Repo URL: URL to validate GitHub access.
    - Verify: Button to validate access.


    #### SSO Integration

    - Provider: SSO identity provider like Azure or Okta.
    - App Id, Client Id, Client Secret: Credentials for app integration.
    - Login Button Text: Text displayed on login button.
    - Verify: Button to test SSO connection.


    ![organisation-settings-integration-tab](/img/organisation-settings-integration-tab.png)




    