---
sidebar_position: 1
---

# Setup

Installation of the **Basepair** Python package and CLI.  
Contents:

1. Installation  
2. Configuration  

---

## 1. Installation

### Requirements

* **Python 3.8+** (Python 2 is no longer supported)
* The package depends on the AWS CLI (`awscli`), which `pip` installs for you. Result downloads use it under the hood.

### Install the package

```bash
pip install basepair
```

Once installed, the **basepair** command should be available:

```bash
basepair -h
```

```text
usage: basepair [-h] [-v VERSION]
                {analysis,coupon,user,file,genome,module,pipeline,pipeline_version,project,sample}
                ...

Basepair CLI, API version 3.6.1
```

To upgrade an existing installation:

```bash
pip install --upgrade basepair
```

---

## 2. Configuration

You need a configuration file to connect to Basepair's API. To obtain it:

1. Go to your dashboard: [app.basepairtech.com](https://app.basepairtech.com)  
2. Click the profile icon (top-right).  
3. Click **Profile**.  
4. Click **Download API config file** (upper-right).

The downloaded `basepair.config.json` contains two sections:

```json
{
  "api": {
    "cli": true,
    "host": "app.basepairtech.com",
    "prefix": "/api/v2/",
    "ssl": true,
    "username": "user@example.com",
    "key": "YOUR_V2_API_KEY"
  },
  "api_v3": {
    "cli": true,
    "host": "app.basepairtech.com",
    "prefix": "/api/v3/",
    "ssl": true,
    "username": "user@example.com",
    "key": "YOUR_V3_API_KEY"
  }
}
```

| Section  | `prefix`   | Used by                                          |
|----------|------------|--------------------------------------------------|
| `api_v3` | `/api/v3/` | **Default.** Package 3.x uses this section unless you ask for v2. |
| `api`    | `/api/v2/` | Legacy v2 API. Only used when you pass `-v v2` (CLI) or `version='v2'` (Python). |

Each section has its own `key`. The `api_v3` key is a personal access token; keep it secret. If you only ever use v3 you can delete the `api` section, but leaving it in place is harmless.

If your file has **only** an `api` section (downloaded before v3 existed), download a fresh copy from your profile page — see the [migration guide](./migration) for the other changes.

### Pointing the CLI and SDK at the config file

Choose one of the following:

**Option 1 – environment variable (recommended)**

Set it once per shell session; every `basepair` command and `basepair.connect()` call picks it up:

```bash
export BP_CONFIG_FILE=/path/to/basepair.config.json
basepair genome list
```

**Option 2 – `-c` / `--config` flag**

Pass the path on every command. The flag belongs **after** the action, together with the other command options:

```bash
basepair genome list -c /path/to/basepair.config.json
```

Running a command without either gives:

```text
ERROR: Please either use the -c or --config param or set the environment variable BP_CONFIG_FILE!
```

In Python, pass the loaded JSON to `connect()` (or rely on `BP_CONFIG_FILE` and call `connect()` with no arguments):

```python
import basepair, json

bp = basepair.connect(json.load(open('/path/to/basepair.config.json')))
```

You can now use Basepair's genomics tools from the CLI or the Python API.  
For usage details, see the [Command-line API](./cli) or [Python API](./python) pages.
