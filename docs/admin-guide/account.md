---
sidebar_position: 1
---

# Account management 

- ## Overview
    Basepair’s account system is designed to organize users, teams, and projects efficiently while ensuring clear billing and administrative control. Each user signs in with an individual **user account**, while all usage and invoices are tied to a team-level **billing account**.

    Within this structure, Basepair defines key entities:

    Here is how everything connects:
    | **Entity**           | **What it represents**                          | **Who controls it**        |
    |-----------------------|--------------------------------------------------|-----------------------------|
    | **Account**           | Your personal login identity                    | You                         |
    | **Team**              | A group that collaborates on projects           | Team Admin                  |
    | **Organization/Host** | The top-level container for settings and billing| Host Admin                  |
    | **Project**           | Workspace for related samples and analyses      | Depends on role permissions |

    In practice, users perform their work within **Projects**, which belong to a **Team**. The Team  **billing account** tracks and pays for all usage across its projects and members in the organisation.
    The **Host Admin**—a designated level-2 administrator—oversees organizational and billing operations, ensuring users and projects are properly configured and compliant with platform policies.

    <br />

- ## Account Creation and setup

    - ### **Creating Host Admin Account:**
        - Host Admin accounts only created for the specific customer domains only. 
        - To create the Host admin account, First user needs to signup on the platform with the organisational email ID and make a request to the basepair team to make him/her as host admin.
        (For user creation you can refer [User registration document](https://docs-basepair.vercel.app/User_Registration/User-registration)).
        - One organisation can have multiple host admins.
    - ### **Required information** (Org name, email domain, etc.):
        - Sign up using your organization email on your company domain:
        - User domain url: https://\[Customer_Domian_name]\.basepairtech.com/signup
        - User Name
        - Work email address
    - ### **Default setup after account creation**
        - All the organisation level settings will be visible once the host admin access granted
        ![host-admin-dropdown](/img/host-admin-dropdown.png)
    - ### **Host Admin (Organization-Level Administrator) Permissions:**
        - Full visibility into all teams, projects, samples, and analyses
        - Manage organization-wide settings, billing, and users
        - Invite users and assign them to teams
        - Create, update, and delete any sample, analysis, or project
        - Run, restart, and upload files to any analysis or sample
        - Share access to samples and analyses (View/Edit/Admin)
        - Download files associated with any sample or analysis
        - Move samples they own (within or across projects)

    <br />
- ## Accessing Host Account Settings
    Click on your **profile icon** in the top-right corner and open **Settings.**
        **Host Setting fields:**
            - Coupons (if you are a coupon based host) - For creating  and distributing the coupon code (For details refer the document: [Creating and managing coupon](https://docs-basepair.vercel.app/admin-guide/coupons))
            -  Dashboard - This feature will provide you the analytics for the usage of the users i n the organisation
                - Pipeline analytics- 
                - Team analytics- 
                - Project analytics- 
                - Cost analytics- 
            ![dashboard-page-host-admin](/img/dashboard-page-host-admin.png)
            - Users - This feature will help to manage users for the organisation account.
            - Organisation setting - page enables Host Admin to configure core settings for the company, product branding, infrastructure, metadata preferences, and integrations. (For details refer the document: [Organisation setting page](https://docs-basepair.vercel.app/admin-guide/organisation-settings))
            ![organisation-settings-page](/img/organisation-settings-page.png)

    <br />
- ## Billing Management: Viewing and editing the billings
    Host Admins can view and manage all billing accounts within the organization.
    - **How to Access Billing Accounts**
        - Open Settings from the top-right profile menu.
        - Select All Billing.
    - **Adding a New Billing Account**
        - Click the **Create** button.
        - Enter the required billing information.
        - Save the new account.
    - **Editing an Existing Billing Account**
        - In the billing list, locate the billing account associated with a user.
        - Click **Edit** to update billing details or billing type.
        - Save changes.
    - **Permissions**
        - Both the **Billing Account Owner** and **Host Admin** have the ability to:
            - Manage billing information
            - Update payment method
            - Modify billing type
    - (For more details please refer the document [Billing management](https://docs-basepair.vercel.app/admin-guide/billing-account))

    <br />
- ## Security Settings
    - Strong passwords required (12–16 characters minimum)
    - Two-Factor Authentication (2FA) supported
    (For more details please refer the document: [User Account Registration and creation](https://docs-basepair.vercel.app/User_Registration/User-registration))

    <br />
- ## Access Control
    Each user’s permissions are determined by their assigned role. Roles define what actions a user can perform, such as viewing data, managing members, or configuring settings. Broadly, permissions are organized at two levels:
        - **Host level** – Platform-wide administration and configuration (for Host Admins).
        - **Team/Organization level** – Day-to-day management of projects, users, and data (for Team Admins and Members).
    <br />
    ### Difference Between Host Admin and Team Admin
        | **Role**       | **Scope**     | **Key Responsibilities**                                                                                                                                      | **Access Level**                            |
        |----------------|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
        | **Host Admin** | Host level     | - Manage organizations, billing, and coupons. Configure host-wide settings. Promote/demote user roles (e.g., assign Team Admins). Oversee compliance and integrations. | Full access across organization.             |
        | **Team Admin** | Team level     | - Manage team members (add/remove users, assign roles). Control access to projects and data. Review usage and reporting at the team level. Ensure team projects align with organization setup. | Restricted to their teams and projects.      |

    In short, **Host Admins** oversee the overall platform, while **Team Admins** manage their internal structure and access.
    <br />
    ### Assigning Roles at the Account Level
        Roles are assigned when a user account is created or modified:
        - **Host Admins** can assign or change roles (e.g., promote a Member to Team Admin) through the **Host Admin settings**.
        - **Team Admins** can manage roles for members/ team admins within their team, typically through the **Team Settings** or **Members** page.
    <br />
- ## Audit & Activity Logs
    - Logs can be visible to only basepair staff through Admin panel url.
    - To view account-level activity (logins, settings changes) user  need to connect with the basepair team member

    <br />
- ## Support & Troubleshooting
    - For users to contact Basepair support from the platform send an email directly to support@basepairtech.com, which automatically creates a support ticket.⁠
    - Basepair provides onboarding support and works closely with customers to ensure successful use of the platform

