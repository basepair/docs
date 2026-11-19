---
sidebar_position: 4
---

# Automating NGS Projects

With Basepair, you can fully automate an NGS project—create a project, add multiple samples, run analyses, and share everything with another user. **Here are the steps:**

0. **Sign in** to your Basepair account → `https://{domain}/`

1. **Download your API config file** — follow the steps in [Setup](./setup#2-configuration) to download it from your profile page. Then make it available to the CLI in one of two ways:

   ```bash
   # Option A — environment variable (persists for the shell session)
   export BP_CONFIG_FILE=/path/to/basepair.config.json
   basepair project list

   # Option B — per-command flag (goes after the action)
   basepair project list -c /path/to/basepair.config.json
   ```

   The remaining steps assume Option A.

2. **Install the Basepair package**

   ```bash
   pip install basepair
   ```

3. **Find your team ID**, then **create a new project** for this data (note the returned project ID)

   ```bash
   basepair project list --json      # each project shows its 'team': {'id': ..., 'name': ...}
   basepair project create --name desired_project_name --team <team_id>
   ```

   ```text
   created: project with id 1926
   ```

4. **Add your samples** to the project (note each sample ID)

   ```bash
   basepair sample create --project 1926 --name Treat_1   --genome hg19 --type rna-seq \
     --file1 /path/to/file1_R1.fq.gz --file2 /path/to/file1_R2.fq.gz

   basepair sample create --project 1926 --name Control_1 --genome hg19 --type rna-seq \
     --file1 /path/to/file2_R1.fq.gz --file2 /path/to/file2_R2.fq.gz

   # <add all your other samples>
   ```

   ```text
   created: sample with id 30754
   Sample id: 30754
   Creating upload file1_R1.fq.gz
   	created: upload with id 138264
   Creating upload file1_R2.fq.gz
   	created: upload with id 138265
   Sample created successfully.
   ```

5. **Run differential-expression analysis** (pipeline ID 8, *Differential Expression (DESeq2, compare 2 groups)*) using the sample and control IDs from step 4

   ```bash
   basepair analysis create --project 1926 --pipeline 8 \
     --sample 30754 30755 30756 \
     --control 30757 30758 30759
   ```

   ```text
   You specified no parameters, submitting with default ones.
   created: analysis 91182 with sample id(s) 30754,30755,30756
   ```

   Check progress with `basepair analysis list --project 1926`; the `status` column moves through `waiting-in-queue`, `running`, `completed` (or `failed`).

6. **Download the results** once the analysis is `completed`

   ```bash
   basepair analysis download -u 91182 -o ./results
   ```

7. **Share the project** with another user (example: give *edit* permission; you can also use *view* or *admin*). `--team` is required and must be the project's team

   ```bash
   basepair project update -u 1926 --team <team_id> \
     --emails collaborator@example.com --perm edit
   ```

   ```text
   project 1926 updated
   ```

Every step above has a Python equivalent — see the [Python API](./python) page if you want to script the whole flow in one program.
