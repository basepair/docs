---
sidebar_position: 5
title: Transition Summary
---

## Key Differences: Previous vs Current Workflow

| Resource Name        | Previous Workflow                                           | Current Workflow                                                                 |
|----------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Billing Account**  | Users can have only one billing account.                    | Users can have multiple billing accounts.                                         |
| **Teams**            | ❌ No teams functionality available.                        | Users can create multiple teams and can associate them with a billing account.    |
| **Members**          | Members were added to the billing account.                 | Members are now added to teams.                                                   |
| **Project**          | The project could be created by simply entering a name.    | The project must now be associated with a team upon creation.                     |
| **Credit/Coupon Deduction** | Credits were deducted from the user's single billing account. | Credits are deducted from the billing account linked to the team associated with the project. |

**NOTE**:
 - In the previous workflow, when a user uploads a sample, credits were deducted from the single billing account associated with them. However, in the updated workflow, where every project is linked to a team, and each team is associated with a billing account, we now need to identify the project ID during the sample upload process. This allows us to determine the corresponding team and its billing account, ensuring that credits are deducted from the correct billing account.
 - The functionality for moving and sharing Samples and Analyses remains unchanged in both the previous and current workflows.