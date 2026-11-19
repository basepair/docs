---
sidebar_position: 5
---

# Migrating from API v2 to v3

Basepair's REST API moved from v2 (`/api/v2/`, Tastypie) to v3 (`/api/v3/`, Django REST Framework). Package **3.x** of `basepair` talks to v3 by default. This page lists what changes for CLI and Python users and how to update scripts. v2 keeps working for now, so you can migrate at your own pace.

---

## 1. Upgrade the package

```bash
pip install --upgrade basepair
python -c "import basepair; print(basepair.__version__)"   # 3.x
```

---

## 2. Update your config file

The v3 credentials live in a new `api_v3` section. A config file downloaded from your profile page today contains **both** sections:

```json
{
  "api":    { "cli": true, "host": "app.basepairtech.com", "prefix": "/api/v2/", "ssl": true, "username": "user@example.com", "key": "YOUR_V2_KEY" },
  "api_v3": { "cli": true, "host": "app.basepairtech.com", "prefix": "/api/v3/", "ssl": true, "username": "user@example.com", "key": "YOUR_V3_KEY" }
}
```

* Package 3.x reads `api_v3` by default and `api` only when you ask for v2 (`basepair -v v2 …` / `connect(..., version='v2')`).
* The v3 `key` is a different token from the v2 key — you cannot copy the old key into an `api_v3` block. Download a fresh file from [app.basepairtech.com](https://app.basepairtech.com) (profile icon → **Profile** → **Download API config file**).
* If your file only has an `api` section, 3.x fails with `CONFIG_ERROR: Config missing section 'api_v3' for version v3`.

---

## 3. CLI changes

The command structure is unchanged: `basepair <resource> <action> [options] -c config.json`. What did change:

| Change | v2.x | v3.x |
|--------|------|------|
| API version flag | — | `basepair -v v2 …` to use v2 (goes before the resource) |
| Create a project | `basepair project create --name S` | `basepair project create --name S --team <team_id>` (`--team` is **required**) |
| Share / rename a project | `basepair project update -u 1 --emails … --perm view` | `basepair project update -u 1 --team <team_id> --emails … --perm view` (`--team` is **required**) |
| Create a sample | `--name` optional | `--name` **required** |
| Create a module | — | optional `--visibility private\|public` |
| New resources (3.6+) | — | `pipeline_version create/update`, `coupon get/list`, `user get/list`; `analysis restart` as an alias of `reanalyze` |

Find your team id with `basepair project list --json` (every project carries `'team': {'id': …, 'name': …}`).

---

## 4. Python changes

### 4.1 Filters

v3 is a different filter backend. Foreign keys are filtered with `__id`, and `__exact` is no longer accepted. Unknown parameters are silently ignored, so an un-migrated filter returns **everything** instead of failing.

| v2 | v3 |
|----|----|
| `bp.get_samples(filters={'projects__exact': 8658})` | `bp.get_samples(filters={'projects__id': 8658})` |
| `bp.get_analyses(filters={'owner__exact': 123})` | `bp.get_analyses(filters={'owner__id': 123})` |
| `filters={'order_by': '-id'}` | unchanged |

`bp.print_data('samples', project=8658)` and the CLI `--project` flag handle this for you. Not every resource exposes every filter — `owner__id` works on samples and analyses but is ignored on projects and pipelines — so check the result count when you add a new filter.

### 4.2 Foreign keys are ids, not URIs

v2 returned related objects as resource URIs; v3 returns integer ids (or nested objects where the API expands them).

```python
sample = bp.get_sample(75042)
sample['owner']      # v2: '/api/v2/users/4453'      v3: 4453
sample['projects']   # v2: ['/api/v2/projects/8658']  v3: [8658]
sample['analyses']   # v2: ['/api/v2/analyses/91182'] v3: [91182]

analysis = bp.get_analysis(91182)
analysis['samples']  # v2: ['/api/v2/samples/75042']  v3: [{'id': 75042, 'name': ..., 'genome_name': ..., ...}]
analysis['workflow'] # v2: '/api/v2/pipelines/8'      v3: {'id': 8, 'name': ..., 'datatype': ..., ...}
```

Code that did `int(uri.rsplit('/', 1)[1])` should use the value directly. If you need to support both, `bp.response_parser.get_id(value)` returns the id for whichever API you are connected to.

### 4.3 File objects gain `uri`

`analysis['files'][i]['path']` still exists and is still the object key inside the bucket. v3 adds `uri`, the full `s3://bucket/key` location:

```python
for f in analysis['files']:
    f['path']   # 'analyses/4453/91182/count/sample.num_lines.txt'  (v2 and v3)
    f['uri']    # 's3://my-bucket/analyses/4453/91182/count/sample.num_lines.txt'  (v3 only)
```

Nothing to change unless you were reconstructing the S3 URI yourself — use `uri` instead. To go the other way:

```python
from basepair.modules.storage.drivers.aws_s3 import Driver as S3Driver
S3Driver.get_path_from_uri(f['uri'])   # -> f['path']
```

### 4.4 Choosing the version

`connect()` accepts `version='v2'` or `version='v3'` (default). It reads `api` or `api_v3` from your config accordingly. `bp.version` reports the active version.

### 4.5 Direct class usage

If you instantiate `Analysis`, `Sample`, `Upload`, etc. yourself, pass the section that matches the API you want:

```python
config = json.load(open('basepair.config.json'))
Analysis(config['api']).list_all_full(filters={...})      # v2
Analysis(config['api_v3']).list_all_full(filters={...})   # v3
```

Or reuse the resolved section from a connected `bp` object, which works for either version:

```python
bp = basepair.connect(config)
Analysis(bp.conf['api']).list_all_full(filters={...})
```

### 4.6 Error format

v2 returned plain-text error bodies. v3 returns structured JSON:

```json
{"type": "client_error", "errors": [{"code": "not_found", "detail": "Resource with id 99999 not found.", "attr": null}]}
```

`BpApi` methods hide this difference: they print `ERROR: <detail>` and return `{'error': True, 'msg': <detail>}` on both versions. Only code that calls the REST API directly needs to read `errors[].detail`.

---

## 5. Downloads

Analysis downloads work the same way as before: the SDK fetches short-lived S3 credentials for your account from the server and runs `aws s3 cp`. You do **not** need your own AWS credentials configured. Expect one or two transient `403 ... HeadObject ... Forbidden` messages while the new credentials activate; the SDK retries and continues.

Sample raw-data downloads (`basepair sample download`, `bp.download_raw_files()`) now use server-signed URLs, so they also work for data stored in another AWS account.

---

## Summary checklist

- [ ] `pip install --upgrade basepair` (3.x)
- [ ] Download a fresh config file; make sure it has an `api_v3` section
- [ ] Add `--team <team_id>` to `project create` / `project update` commands; add `--name` to `sample create`
- [ ] Replace `<field>__exact` filters with `<field>__id` (foreign keys) or the plain field name
- [ ] Stop parsing ids out of resource URIs — fields are plain ids now
- [ ] Switch to `file['uri']` if you were building S3 URIs from `file['path']`
- [ ] Direct class calls: pass `config['api_v3']` (or `bp.conf['api']`)
- [ ] Direct REST calls: read errors from `errors[].detail`
