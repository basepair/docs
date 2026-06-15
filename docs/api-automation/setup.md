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

### Install the package

```bash
pip install basepair
```

Once installed, the **basepair** command should be available:

```bash
basepair -h
```

---

## 2. Configuration

You need a configuration file to connect to Basepair’s API. To obtain it:

1. Go to your dashboard: [app.basepairtech.com](https://app.basepairtech.com)  
2. Click the profile icon (top-right).  
3. Click **Profile**.  
4. Click **Download API config file** (upper-right).

A downloaded file looks like:

```json
{
  "api_v3": {
    "cli": true,
    "host": "app.basepairtech.com",
    "prefix": "/api/v3/",
    "ssl": true,
    "username": "user@basepairtech.com",
    "key": "YOUR_API_KEY"
  }
}
```

`key` is your personal access token. The `api_v3` section targets the current API (v3). If your downloaded file still shows an `api` section with `/api/v2/`, see the [migration guide](./migration) to update it.

### Config keys and API versions

The config section key determines which API version the SDK uses:

| Config key | `prefix` | API version |
|------------|----------|-------------|
| `api_v3`   | `/api/v3/` | v3 (default since package 3.x) |
| `api`      | `/api/v2/` | v2 (legacy) |

You can keep both sections in the same file if you need to switch versions:

```json
{
  "api_v3": {
    "host": "app.basepairtech.com",
    "prefix": "/api/v3/",
    "ssl": true,
    "username": "user@example.com",
    "key": "YOUR_V3_KEY"
  },
  "api": {
    "host": "app.basepairtech.com",
    "prefix": "/api/v2/",
    "ssl": true,
    "username": "user@example.com",
    "key": "YOUR_V2_KEY"
  }
}
```

To make this file available to your API calls, choose one of the following:

**Option 1 – environment variable (recommended)**

```bash
export BP_CONFIG_FILE=/path/to/basepair.config.json
```

**Option 2 – command-line flag**

```bash
basepair -c /path/to/basepair.config.json
```

**Option 3 – environment variables only (no file needed)**

```bash
export BP_USERNAME=user@basepairtech.com
export BP_API_KEY=YOUR_API_KEY
```

You can now use Basepair’s genomics tools from the CLI or the Python API.  
For usage details, see the **Command-Line API** or **Python API** tutorials.
