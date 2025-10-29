---
sidebar_position: 1
---

# User management

- ## Overview
    User Management allows administrators to add, organize, and control access for all users within a Basepair account.

- ## Adding Users
    Methods to add users:

    - ### From user management page
        - Go to **Settings** from the top right corner
        ![user-option-dropdown](/img/user-option-dropdown.png)
        - Click on **Users** to open user management page
        ![new-button-user-page](/img/new-button-user-page.png)
        - Click on **New** Button
        ![new-user-form](/img/new-user-form.png)
        - Add the details: 
        Mandatory fields: First Name , Last Name , Email
        Optional fields: Phone number, Integrations, Email Subscriptions etc.
        - Click **Save** to save the user
        <br />
    - ### Self Registration
        Users can create their own Basepair account using the signup page for their region or organization domain.
            - US: [https://app.basepairtech.com/signup](https://app.basepairtech.com/signup)
            - Tokyo: [https://ap-1.basepairtech.com/signup](https://ap-1.basepairtech.com/signup)
            - Custom Domain: https://\[domain]\.basepairtech.com/signup

        Only organization email addresses are accepted. After signing up, users must verify their account through the activation link sent to their email. Once verified, they can access the Project Dashboard.

        For detailed steps, refer to the guide: [User Registration guide](https://docs-basepair.vercel.app/User_Registration/User-registration)


    - ### Inviting the Users from teams
        Teams (labs or groups) help you organize users and control access to projects efficiently. As a Team Admin or Team Owner, you can:
            - Create and manage teams
            - Invite and assign users to teams
            - Link users to projects or pipelines

        **Inviting a user to a team**
            - Go to **Settings**
            - Select **Teams**
            - Choose the team where you want to add a user
            - Click **Invite User**
            - Enter the user’s email and assign the appropriate role (Member or Admin)
            - Send the invitation
        The user will receive an email with steps to join the team.
        For detailed steps Refer documents:    
        Teams- [Create and assign User](https://docs-basepair.vercel.app/teams/users)
        Teams - [Linking of Projects](https://docs-basepair.vercel.app/teams/teams_projects)

    <br />
- ## Managing User Roles & Permissions
    - ### Roles and Permission
        Basepair supports a role-based access model to help organizations manage teams and control access to data and settings.
        - #### Host Admin (Organization-Level Administrator)
            The **Host Admin** is the highest-level administrator, responsible for managing global platform settings, billing, and all team configurations across the organization.<br />
                **Permissions:**
                - Full visibility into all teams, projects, samples, and analyses
                - Manage organization-wide settings, billing, and users
                - Invite users and assign them to teams
                - Create, update, and delete any sample, analysis, or project
                - Run, restart, and upload files to any analysis or sample
                - Share access to samples and analyses (View/Edit/Admin)
                - Download files associated with any sample or analysis
                - Move samples they own (within or across projects)

        - #### Team Admin (Team-Level Administrator)
            The **Team Admin** manages all operations within their assigned team.<br />
            **Permissions:**
            - Manage team-specific settings and users
            - Invite team members and assign billing accounts
            - Create and manage team projects, samples, and analyses	
            - Link billing accounts 
            - Restart analyses, upload files, and download outputs
            - Share team samples/analyses with view/edit/admin access
            - Delete users (within their team), samples, and projects
            - Move only their own samples within the same project
            **Note:**
            - Only Admins can add, edit, or remove team members.
            - Admins cannot delete other Admins unless their role is downgraded.
            - The Owner of the team cannot be deleted.

        - #### Team Member (User)
            Team Members have restricted access and can work within the scope of their assigned team.<br />
            **Permissions:**
            - View team structure and member list
            - Upload samples to team-associated projects
            - Create, read, update, and delete their own samples
            - View samples uploaded by others in the team
            - Trigger analyses on any sample in the team
            - View project details

    - ### Changing User Roles and Permissions
        To change a user to Host Admin, or to modify Host Admin permissions, please contact the Basepair Support team.

        **Change Member ↔ Team Admin (Team-level permissions)**

        Team Admins and Team Owners can update user roles within their team.
        - Step 1: Go to **Settings** and click **Teams**
        ![team-option-dropdown](/img/team-option-dropdown.png)
        - Step 2: Select the desired **Team**
        ![select-team-list-page](/img/new-button-user-page.png)
        - Step 3: Open the **Members** tab and select the user
        ![selected-team-member-page](/img/selected-team-member-page.png)
        - Step 4: Click the **Edit** button and choose **Admin** or **Member** from the dropdown and **Save**
        ![edit-btn-member-page](/img/edit-btn-member-page.png)
        - **Note:**
            Only **Team Admins or Team Owners** can edit permissions of users in their own team.
            **Host Admins** can edit permissions of users across the entire organization.

    <br />
- ## Deactivating / Removing Users
    You can remove users at the team level or across the entire organization depending on your role.
        - ### Team Admin: Remove a user from your team**
            - Step 1: Open **Teams** → select your team
            - Step 2: Go to **Members** tab and select the user
            - Step 3: Click the **Delete** action button
            ![remove-member-dialog](/img/remove-member-dialog.png)
            - Step 4: Confirm **Remove**
        This removes the user from the team but does not delete their account.
        - ### Host Admin: Deactivate or Delete Users (Organization-wide)
            - Step 1: If you are a Host admin, Go to **Settings → Users**
            - Step 2:Choose a user and click **Deactivate**
            ![deactivate-btn](/img/deactivate-btn.png)
            User cannot log in but their samples and data remain.
            Host Admin can reactivate later if needed.
            - Step 3: To permanently delete a user:
            Select the user → click **Delete**
            ![delete-user-btn](/img/delete-user-btn.png)
            - Step 4: A pop-up will ask if you want to **transfer data** before deletion
                - **Delete without transfer**
                User loses access permanently
                Resources remain but unassigned (billing, projects, files, coupons, etc.)

                ![delete-without-transfer](/img/delete-without-transfer.png)
                - **Delete with transfer**
                Ownership of resources is transferred to another assigned user
                User account is permanently removed

                ![delete-with-transfer](/img/delete-with-transfer.png)
        - ### Restoring user access:
            Restoration depends on the previous action:
            - Deactivated users can be reactivated by a Host Admin
            - Deleted users cannot be restored (a new account must be created)

    <br />
- ## User Activity & Audit:
    Host Admins can review user activity to ensure security and compliance.
    - ### What you can view**
        - Recent login details for all users
        - Basic activity information
        **Steps**
        - Go to **Settings**
        - Click **Users**
        - Review login and activity details for each user
        **Additional audit logs**
        For more detailed audit information, including specific actions performed by users, contact the Basepair Support Team.

    <br />
- ## Support & Troubleshooting
    - For users to contact Basepair support from the platform send an email directly to support@basepairtech.com, which automatically creates a support ticket.⁠
    - Basepair provides onboarding support and works closely with customers to ensure successful use of the platform


