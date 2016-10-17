# ⚡️ turbostatus

Tool to check the git repositories in your folder and show:

- Current branch
- If you are up to date, need to pull, need to push or diverged
- If there are uncommited changes or untracked files
- Current or nearest reachable tag and commits since then
- With the `remotes` argument, updates your remotes first

## Use

```console
$ turbostatus

# or to update your remotes first (slow)
$ turbostatus -r

# there is also a short version:
$ ts -r
```

There is also an export command and options to filter the repos that are searched. Check `turbostatus help` for more info.

## Install

```console
npm i turbostatus -g
```

<sub>Zsh version still available in branch `v1`</sub>
