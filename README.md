# ⚡️ turbostatus

Shell script to check the git repositories in your folder and show:

- Current branch
- If you are up to date, need to pull, need to push or diverged
- If there are uncommited changes or untracked files
- With the `remote` argument, updates your remotes

## Use

```console
$ turbostatus

# or to update your remotes first (slow)
$ turbostatus remote

# when running as a zsh plugin a `ts` alias is also created
$ ts
```

## Install

### Manual

Copy to somewhere in your path, give execute rights with
```console
$ chmod +x path_to_file/turbostatus`
```

### Zplug

Add to your plugin section:

```zsh
zplug "vigour-io/turbostatus"
```

### oh-my-zsh plugin

1. Change to `oh-my-zsh` plugins directory:

    ```console
    $ take ~/.oh-my-zsh/custom/plugins
    ```

2. Clone the repository into a new directory called `turbostatus`:

    ```console
    $ git clone https://github.com/vigour-io/turbostatus.git
    ```

3. Include `turbo-status` plugin to your .zshrc file along with other plugins:

    ```zsh
    ...
    plugins=(git z cp turbostatus)
    ...
    ```

4. Restart your terminal application.


## TODO

- [ ] Use emoji to make display more compact
- [ ] Make this a node module
