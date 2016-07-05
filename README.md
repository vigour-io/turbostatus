# Turbostatus

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

# when running as a zsh plugin it's also aliased to just `ts`
$ ts
```

also aliased to just `$ ts` when run as a zsh plugin

## Install

### Manual

Copy to somewhere in your path, give execute rights with
```console
$ chmod +x path_to_file/turbostatus`
```

### oh-my-zsh plugin

1. Change to `oh-my-zsh` plugins directory:

    ```console
    $ take ~/.oh-my-zsh/custom/plugins
    ```

2. Clone the repository into a new directory called `turbo-status`:

    ```console
    $ git clone https://github.com/vigour-io/turbo-status.git
    ```

3. Include `turbo-status` plugin to your .zshrc file along with other plugins:

    ```zsh
    ...
    plugins=(git z cp turbo-status)
    ...
    ```

4. Restart your terminal application.


## TODO

- Make this a node module
