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

* **Python 3** (Python 2 is no longer supported)

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
2. Click your profile name (top-right).  
3. Click **Profile**.  
4. Click **Download API config file** (upper-right).

A downloaded file looks like:

```json
{
  "api": {
    "cli": true,
    "host": "app.basepairtech.com",
    "prefix": "/api/v2/",
    "ssl": true,
    "username": "user@basepairtech.com",
    "key": ""
  }
}
```

`key` is your personal access token.

To make this file available to your API calls, choose one of the following:

**Option 1 – environment variable**

```bash
export BP_CONFIG_FILE=/path/to/basepair.config.json
```

**Option 2 – command-line flag**

```bash
basepair -c /path/to/basepair.config.json
```

You can now use Basepair’s genomics tools from the CLI or the Python API.  
For usage details, see the **Command-Line API** or **Python API** tutorials.
