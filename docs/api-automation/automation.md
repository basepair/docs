---
sidebar_position: 4
---

# Automating NGS Projects

With Basepair, you can fully automate an NGS project—create a project, add multiple samples, run analyses, and share everything with another user. **Here are the steps:**

0. **Sign in** to your Basepair account → `https://{domain}/`

1. **Download your API keys** from `https://{domain}/api/v3/users/api_key/` and save the path of the downloaded file in an environment variable  
   *(You must be logged in to download the JSON file.)*

   ```bash
   export BP_CONFIG_FILE=/path/to/basepair.config.json
   ```

2. **Install the Basepair package**

   ```bash
   pip install basepair
   ```

3. **Create a new project** for this data (note the returned project ID)

   ```bash
   basepair create project --name desired_project_name
   ```

4. **Add your samples** (note each sample ID)

   ```bash
   basepair create sample --name Treat_1   --genome hg19 --datatype rna-seq \
     --file1 /path/to/file1_R1.fq.gz --file2 /path/to/file1_R2.fq.gz

   basepair create sample --name Control_1 --genome hg19 --datatype rna-seq \
     --file1 /path/to/file2_R1.fq.gz --file2 /path/to/file2_R2.fq.gz

   # <add all your other samples>
   ```

5. **Run differential-expression analysis** (workflow # 8) using the sample and control IDs from step 4

   ```bash
   basepair create analysis -w 8 --sample 30754 30755 30756 --control 30757 307587 30759
   ```

6. **Share the project** with another user (example: give *edit* permission; you can also use *view* or *admin*)

   ```bash
   basepair updateProject -p 1926 --emails amit@basepairtech.com --perm edit
   ```

