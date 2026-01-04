---
sidebar_position: 2
---

# GitHub Integrations

This guide explains how to integrate your GitHub account with Basepair to enable repository access for pipeline execution.
You can install the Basepair GitHub App either at the Organization level or the User level, depending on your setup.

- ## Organization-Level Installation
    Install Basepair Github app at your organization github account and provide read-only access to repositories which will be used during pipeline execution.

    - ### Step1: Open Integration Settings
        - Go to the Organizational setting Page > Integration tab, at this section.
        - Click on Install **Basepair App** button to install it.

        ![integration-tab-org-settings](/img/integration-tab-org-settings.png)
    - ### Step 2: Authorize on GitHub
        - You will be redirected to the GitHub installation page. 
        - Click **Configure**.

        ![authorize-github](/img/authorize-github.png)
    - ### Step 3: Select Organization and Repositories
        - Select your **organization** account  
        - Click on right arrow to continue.

        ![select-organisation](/img/select-organisation.png)
        - Select the repositories option you want to grant access to Basepair. 
        - Click Install.

        ![install-repos](/img/install-repos.png)
    - ### Step 4: Verify Installation
        After installation, you’ll be redirected to **GitHub Settings → Applications**, where the Basepair app should appear under installed apps.

        ![repo-access-page](/img/repo-access-page.png)
        #### To modify access:
            **Add/Delete Repositories**: Select or deselect repositories, then click Save.

            ![select-repos](/img/select-repos.png)
            **Verify Installation**: Go back to your Basepair **Organisation settings page (Integration tab)**, enter the repository URL, and click **Verify**.
            - If the repository shows as verified, integration is successful.

            ![git-integration-completed-modal](/img/git-integration-completed-modal.png)
            - If not, recheck the app configuration.

            ![git-integration-unsuccessful-modal](/img/git-integration-unsuccessful-modal.png)
    - ### Step 5: Uninstall
        - To remove the integration, go to GitHub Settings → Applications.\
        - Find Basepair, then click Uninstall.

        ![uninstall-basepair-option](/img/uninstall-basepair-option.png)

- ## User-Level Installation
    If you prefer to connect your personal GitHub account, follow these steps:
    Install Basepair Github app **at your personal github account** and provide read-only access to repositories which will be used during pipeline execution.

    - ### Step 1: Open Profile Settings:
        - Select Profile from setting

        ![user-profile-option](/img/user-profile-option.png)
        - Click on Github account details.
        - Click **Install Basepair App**.

        ![install-basepair-app-button](/img/install-basepair-app-button.png)
    - ### Step 2: Authorize on GitHub
        - You will be redirected to the GitHub installation page.
        - Click **Configure**.

        ![authorize-github](/img/authorize-github.png)
    - ### Step 3: Select Account and Repositories
        - Choose your **personal GitHub** account.
        - Click the right arrow to proceed.

        ![select-organisation](/img/select-organisation.png)
        - Select the **repositories** you want Basepair to access to.
        - Click **Install**.

        ![install-repos](/img/install-repos.png)
    - ### Step 4: Verify Installation
        After installation, you’ll be redirected to **GitHub Settings → Applications**, where the Basepair app will appear under installed apps.

        ![repo-access-page](/img/repo-access-page.png)
        #### To modify access
            - **Add/Delete Repositories**: Select or deselect repositories, then click **Save**.

            ![select-repos](/img/select-repos.png)
            - **Verify Installation**: Return to your Basepair **Profile Page**, enter the repository URL, and click **Verify**.
            - If verified, integration is complete.

            ![git-integration-completed-modal](/img/git-integration-completed-modal.png)
            - If not, check the app configuration.

            ![git-integration-unsuccessful-modal](/img/git-integration-unsuccessful-modal.png)
    - ### Step 5: Uninstall (Optional)
        To remove Basepair from your personal GitHub account, go to **GitHub Settings → Applications**, locate Basepair, and click **Uninstall**.
        If you want to remove it from your account then click on uninstall.

        ![uninstall-basepair-option](/img/uninstall-basepair-option.png)

- ## Understanding the Difference: Organization-Level vs User-Level GitHub Integration
    | **Aspect** | **Organization-Level Integration** | **User-Level Integration** |
    |-------------|------------------------------------|-----------------------------|
    | **Scope of Access** | Grants access to repositories within a GitHub organization account. | Grants access only to repositories under a personal GitHub account. |
    | **Who Can Install** | Requires installation by an organization owner or admin. | Can be installed by any individual user. |
    | **Repository Access** | Shared among authorized members of the organization. | Accessible only by the user who performed the installation. |
    | **Recommended For** | Teams or projects managed within a company GitHub organization. | Individual users or personal projects. |
    | **Adding/Removing Repos** | Managed by the org admin; changes apply to all users. | Managed by the individual user only. |
    | **Permissions** | Requires organization-level approval for selected repositories. | Requires personal authorization for selected repositories. |





