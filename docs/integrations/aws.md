---
sidebar_position: 1
---

# AWS

- Connected Cloud is a solution that allows you to run NSG workflows on Basepair platform with your own AWS account.
- Customer will interact with Basepair platform to upload samples and start workflows.
- Basepair platform will then connect with customer's AWS account to fetch samples, run workflows and upload results.
- Customer will be able to view results on Basepair platform.

## How Connected Cloud works

```mermaid
sequenceDiagram
actor User
box rgb(165,188,250) Basepair AWS Cloud
participant App
end
box rgb(252,192,131) Customer AWS Cloud
participant Storage
participant Compute
end
User->>App: Upload Samples
App->>Storage: Store Samples
User->>App: Start a Workflow
App->>Compute: Start EC2 Instance
Compute->>Storage: Fetch Samples
Compute->>Compute: Execute Workflow
Compute->>Storage: Upload Results
App->>Storage: Fetch Results
App->>User: Display Results
```

## Deploying Connected Cloud

Steps to deploy Connected Cloud with your AWS account:

- Sign in to your AWS account.
- Deploy the Connected Cloud stack using the following CloudFormation templates:
  - If you want to use `Connected cloud with Health Omics`, go to the following link and follow the instructions. [Connected Cloud with Health Omics](https://console.aws.amazon.com/cloudformation/home?region=region#/stacks/new?stackName=BasepairConnectedCloud&templateURL=https://bp-publc.s3.amazonaws.com/cfn-mp-ql-basepair-ngs-ho-payg.yml)
  - If you want to use `Connected cloud with Basepair`, go to the following link and follow the instructions. [Connected Cloud with Basepair](https://console.aws.amazon.com/cloudformation/home?region=region#/stacks/new?stackName=BasepairConnectedCloud&templateURL=https://bp-publc.s3.amazonaws.com/cfn-mp-ql-basepair-ngs-payg.yml)
- You will be asked to choose the following parameters:
  - `AWS Region`: Choose the region where you want to deploy the stack.
- Once the stack is deployed, go to the Outputs tab and note down the `Key` and `Value` of all the parameters into a `config.json` file.
- Send the `config.json` file to Basepair support team.
- Basepair support team will then configure the Connected Cloud with your Basepair account.

