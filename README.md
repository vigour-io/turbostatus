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

## Install

```console
npm i turbolink -g
```

<sub>Zsh version still available in branch `v1`</sub>
