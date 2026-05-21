---
sidebar_position: 4
---

# Automating NGS Projects

With Basepair, you can fully automate an NGS project—create a project, add multiple samples, run analyses, and share everything with another user. **Here are the steps:**

0. **Sign in** to your Basepair account → `https://{domain}/`

1. **Download your API config** from `https://{domain}/api/v3/users/api_key/` and point to it via an environment variable  
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
   basepair project create --name desired_project_name --team <team_id>
   ```

4. **Add your samples** (note each sample ID)

   ```bash
   basepair sample create --name Treat_1   --genome hg19 --type rna-seq \
     --file1 /path/to/file1_R1.fq.gz --file2 /path/to/file1_R2.fq.gz

   basepair sample create --name Control_1 --genome hg19 --type rna-seq \
     --file1 /path/to/file2_R1.fq.gz --file2 /path/to/file2_R2.fq.gz

   # <add all your other samples>
   ```

5. **Run differential-expression analysis** (pipeline ID 8) using the sample and control IDs from step 4

   ```bash
   basepair analysis create --pipeline 8 \
     --sample 30754 30755 30756 \
     --control 30757 30758 30759
   ```

6. **Share the project** with another user (example: give *edit* permission; you can also use *view* or *admin*)

   ```bash
   basepair project update -u 1926 --team <team_id> \
     --emails collaborator@example.com --perm edit
   ```
