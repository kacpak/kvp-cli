# kvp-cli

Key - Value Pair CLI

## Usage

```
Usage: kvp-cli [options] [command]

CLI to edit key-value pair files

Options:
  -V, --version                    output the version number
  -h, --help                       display help for command

Commands:
  get <config-file> <key>          returns a value for a key
  set <config-file> <key> <value>  sets key-value pair
  unset <config-file> <key>        removes key from file
  help [command]                   display help for command
```

## Contributors

This repo uses [changesets](https://github.com/changesets/changesets) to generate changelog and synchronize releases.

Before pushing run `yarn changeset` to generate new changeset entry.

To publish run

- `yarn changeset version`
- `git add . && git commit`
- `yarn changeset publish`
- `git push --follow-tags`
