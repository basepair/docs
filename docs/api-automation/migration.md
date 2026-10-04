---
sidebar_position: 5
---

# Migrating from API v2 to v3

This page covers every breaking change introduced in the v3 API and how to update your scripts.

---

## 1. Upgrade the package

```bash
pip install --upgrade "basepair>=3.1.0"
```

---

## 2. Update your config file

The config file now uses the key `api_v3` (instead of `api`) and the prefix `/api/v3/`.

**Before (v2):**

```json
{
  "api": {
    "host": "app.basepairtech.com",
    "prefix": "/api/v2/",
    "username": "user@example.com",
    "key": "YOUR_API_KEY"
  }
}
```

**After (v3):**

```json
{
  "api_v3": {
    "host": "app.basepairtech.com",
    "prefix": "/api/v3/",
    "ssl": true,
    "username": "user@example.com",
    "key": "YOUR_API_KEY"
  }
}
```

You can download a fresh config file from your profile page at [app.basepairtech.com](https://app.basepairtech.com).

---

## 3. Update CLI commands

The command syntax changed in v3. The old `--action` style was replaced with subcommands.

| Task | v2 command | v3 command |
|------|-----------|-----------|
| Create sample | `basepair --action create-sample --name S` | `basepair sample create --name S` |
| List samples | `basepair --action list-samples --project 1` | `basepair sample list --project 1` |
| Update sample | `basepair --action update-sample -s 123 --key genome --val mm10` | `basepair sample update -u 123 --genome mm10` |
| Delete sample | `basepair --action delete-sample -s 123` | `basepair sample delete -u 123` |
| Create analysis | `basepair --action create-analysis -w 10 -s 123` | `basepair analysis create --pipeline 10 --sample 123` |
| List analyses | `basepair --action list-analyses --project 1` | `basepair analysis list --project 1` |
| Download results | `basepair --action download -a 456` | `basepair analysis download -u 456` |
| List projects | `basepair --action list-projects` | `basepair project list` |

The general pattern is:

```
basepair <resource> <action> [options] -c config.json
```

---

## 4. Update Python code that reads file data

In v3, file objects return a `uri` field (a full `s3://…` URI). Code that reads `file['path']` will break.

**Before (v2):**

```python
for f in analysis['files']:
    s3_key = f['path']   # e.g. "data/results/sample.bam"
```

**After (v3):**

```python
for f in analysis['files']:
    uri = f['uri']       # e.g. "s3://my-bucket/data/results/sample.bam"
```

If you need the bare S3 key:

```python
from basepair.modules.storage.drivers.aws_s3 import Driver as S3Driver

s3_key = S3Driver.get_path_from_uri(f['uri'])
```

---

## 5. Update direct class usage

If you use individual module classes (`Analysis`, `Sample`, `Upload`, etc.) directly rather than through `basepair.connect()`, the config key you pass must match the API version.

**Before (v2 config):**

```python
config = json.load(open('basepair.config.json'))
Analysis(config.get('api')).list_all_full(filters={...})
```

**After (v3 config):**

```python
config = json.load(open('basepair.config.json'))
Analysis(config.get('api_v3')).list_all_full(filters={...})
```

Alternatively, connect via `basepair.connect()` and use `bp.conf.get('api')`, which always holds the resolved config regardless of version:

```python
bp = basepair.connect(json.load(open('basepair.config.json')))
Analysis(bp.conf.get('api')).list_all_full(filters={...})
```

---

## 6. Downloads no longer require local AWS credentials

In v3, sample and analysis downloads work via server-generated presigned URLs. You no longer need AWS credentials configured locally to download results. The SDK handles this automatically and falls back to `aws s3 cp` if needed.

---

## Summary checklist

- [ ] `pip install --upgrade "basepair>=3.1.0"`
- [ ] Replace `api` key with `api_v3` in config; change prefix to `/api/v3/`
- [ ] Update CLI scripts from `--action` style to `basepair <resource> <action>` style
- [ ] Replace `file['path']` with `file['uri']` in Python code that processes result files
- [ ] Update direct class calls from `config.get('api')` to `config.get('api_v3')` (or use `bp.conf.get('api')`)
- [ ] Update any code that parses v2 plain-text errors to handle the v3 `errors[].detail` structure
