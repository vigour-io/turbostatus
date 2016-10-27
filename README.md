# ⚡️ turbostatus
Tool to check the git repositories in your folder and show their status.

![turbostatus](https://github.com/vigour-io/turbostatus/raw/ed8cfadfc5e2cd48b9a768f6f534d37ae7a8f6ae/turbostatus.gif)

## Install

```command
npm install turbostatus -g
```

## Commands

* `list`: shows the status of the repos in the folder (Default command)
* `export`: exports the repo status to a json file
* `checkout`: uses an exported json file to clone of checkout the repos to a previous state. You can interactivelly choose which changes will be applied (Experimental)

## Help

Run `help <command>` to see the documentation. For example:

```console
turbostatus help list
```
## Examples

```console
turbostatus

# It's also aliased to just "ts"
ts

# If you use the option --remote (-r) it will update the remote status first (slower)
ts -r

# You can also filter the folders that will be checked
ts -f 'brisky*'

# Export the current status of all the repos that start with 'brisky'
ts export brisky_repos.json -f 'brisky*'

# Restore to a previous state
ts checkout brisky_repos.json
```

<sub>Zsh version still available in branch `v1`</sub>
