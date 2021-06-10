# ps-mst-cli

A cli to scaffold your entire mobx-state-tree stores based on your parse server schema.

## How to use it

### Configuration

Following parameters are required :

- **parseServerUrl**: url of the parse server api
- **parseAppId**: parse app id
- **parseMasterKey**: parse master key

Append this parameters to the command like this

```
ps-mst-cli [command] --parseAppId [YOU-APP-ID] --parseServerUrl [YOUR-URL] --parseMasterKey [YOUR-MASTER-KEY]
```

Or you can create a file named **ps-mst-cli.config.js** with the following content :

```
module.exports = {
  parseServerUrl: [YOUR-URL],
  parseAppId: [YOU-APP-ID],
  parseMasterKey: [YOUR-MASTER-KEY],
}
```

### Generate models only

```
ps-mst-cli generate-models
```

or

```
ps-mst-cli gm
```

### Generate stores and models

```
ps-mst-cli generate-store
```

or

```
ps-mst-cli gs
```

# License

MIT - see LICENSE
