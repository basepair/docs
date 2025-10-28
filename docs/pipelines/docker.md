---
sidebar_position: 1
---

# Add docker pipeline

## Creating a custom workflow on Basepair

### Overview

Basepair allows you to import and run a custom bioinformatics workflow in a few simple steps.
We recommend packaging individual steps of the workflow into docker containers for portability, version control, and reproducibility. Then, using YAML text files, the individual steps (modules) can be defined and stitched together to create the workflow. YAML format is
supported by all major programming languages, easy to edit and read, and let's you keep your modules and workflows in version control. After creating the workflow, it then of course needs to be tested to ensure it is running properly and producing the expected results. *Alternatively, you can provide your custom pipeline to Basepair as-is, and we can Dockerize/build the pipeline as well.
Feel free to check out our pages on creating and storing Docker images for more information.

### Define the modules

A "module" refers to a single tool or a group of tools that run as a single unit. For example, a module may be:
- a single command using Picard MarkDuplicates to remove duplicate reads from a BAM file - or -
- a call to BWA to align the data as well as a SAMtools call to sort and index the alignments
In the 2nd example above, BWA and SAMtools calls are combined in a single module because many tools require both sorted and indexed BAM files for downstream analysis. This way, the module performs the complete logical task of alignment, even though it is calling two different software tools.
Importantly, modules are often used across multiple workflows, so it's important that command options and input files are not hard-coded, but instead exposed as parameters in the docker run call.
The module YAML file defines 3 primary pieces information:
Path to executables and command structure
Inputs
Outputs

### Define the workflow 
A Basepair workflow is a collection of modules that run together.
A workflow may have a single module, or 20+ modules performing QC, alignment, and generating figures, etc. The workflow is defined as a directed acyclic graph (DAG), where each module is a node in the graph. This structure allows a module to have multiple parent modules along with further flexibility in designing a workflow.
The workflow YAML file defines 3 primary pieces of information:
A collection of nodes, each representing a module with a unique node id. If a module is
required multiple times in a workflow, each instance is assigned a different node id. Furthermore, default parameters can be set for each module.
A collection of edges, each representing the parent-child relationship between all modules. Starting with a root module, all other modules are connected in a way that defines how the workflow will run.
Mappings: Common global meta-data is directly passed onto the modules, such as the genome assembly being used

### Testing

Basepair provides testing frameworks for two purposes:
Technical testing: testing the structure of modules and workflows to check if the parameters are passed on correctly, commands are formed as expected, flow of data is moving as expected, etc.
Scientific testing: Testing the output files of a workflow with validated results to ensure
that the data is being correctly analyzed. This testing is important to establish the scientific accuracy of the workflows.


## Dockerizing your pipeline

Docker containers provide an isolated environment in order to both distribute and run software tools with ease. We recommend placing each major step of the pipeline into its own docker container, to be run in a step-wise fashion. This page provides instructions for containerizing your pipeline with docker (information on saving docker images remotely can be found here).


- Step 1: create the Dockerfile
In a folder containing any necessary scripts or files, create and open a file called "Dockerfile":

```
nano Dockerfile
```

Specify a base image to build upon (e.g. an empty ubuntu image), by adding to the file:

```
From ubuntu
```

Install any required dependencies(e.g. install, make, gcc, and git):

```
RUN apt-get update -qq \
&& apt-get install -y make gcc \
&& apt-get install -y git
```

(use the -y flag to ensure installation continues through any prompts)

If installing a tool from github:

```
RUN git clone https://github.com/alexdobin/STAR.git	
```

For R scripts requiring external packages, install these packages with:

```
RUN R -e "install.packages('BiocManager')"
RUN R -e "BiocManager::install('DESeq2')"
```

Specify the program to run when container is started

```
ENTRYPOINT ["/STAR-2.7.10b/bin/Linux_x86_64/STAR"]
```

Exit and save the Dockerfile


- Step 2: build the docker image

Specify the Dockerfile and a tag (-t) by naming the image and assigning a version number (e.g. ":0.0.1")

```
docker build -f Dockerfile -t image_name:0.0.1 .
```

The docker image tag can be changed in order to push to your dockerhub repo with:

```
docker tag image_name:0.0.1 dockerhub_user_name/image_name:0.0.1
```

Step 3: push to dockerhub

```
docker push dockerhub_user_name/image_name:0.0.
```

## Storing your docker images

There are many options available for storing docker images.

### Storage in a public repository

For pipelines that are publicly available, dockerhub is the simplest option.
Dockerhub allows unlimited public repositories with a free account, where anyone can pull your images.

An existing image can be copied and renamed using your dockerhub user ID with:

```
docker tag image_name:0.0.1 userID/image_name:0.0.1
```

And then pushed to you dockerhub repository with:


```
docker push userID/image_name:0.0.1
```

### Storage in a private repository

To store your docker images privately, we recommend amazon's elastic container registry (ECR).
With ECR, you have two options:

- Option 1:
    Store the image under your own aws account and setup the proper IAM policy to allow Basepair to pull images from your repository

- Option 2:
    Store the image in Basepair's ECR:

We will setup the proper IAM policy allowing you to push images to a private repository in our ECR.
- To do this, first contact a Basepair team member in order to share the necessary aws credentials.
- Once Basepair has created the repository, we will share the information needed for you to push images.

*In the example code below, you will need to change values in brackets [] for your use:

- Step 1: build the image using a tag that contains the repositoryUri we shared with you, the image name you want to use, and version ("v0.0.1")

    ```
    cd /path/to/your/project # this is where the Dockerfile is present
    docker build -f Dockerfile -t [repositoryUri]:[image_name]-[v0.0.1] .
    ```

    check to make sure the image was created by listing existing images on your machine:

    ```
    docker image ls
    ```

- Step 2: get a temporary docker credential from ECR for use with docker login

    ```
    aws ecr get-login-password \
    --region [region]  \
    | docker login --username AWS \
    --password-stdin [aws_id].dkr.ecr.
    [region].amazonaws.com
    ```

- Step 3: push the image to Basepair's ECR using the repositoryUri we shared with you

    ```
    docker push [repositoryUri]:[image_name]-[v0.0.1]
    ```







