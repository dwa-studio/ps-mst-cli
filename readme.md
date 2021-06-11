# pmst

A cli to scaffold your entire mobx-state-tree stores based on your parse server schema.

## How to use it

### Configuration

Following parameters are required :

- **parseServerUrl**: url of the parse server api
- **parseAppId**: parse app id
- **parseMasterKey**: parse master key

Append this parameters to the command like this

```
pmst [command] --parseAppId [YOU-APP-ID] --parseServerUrl [YOUR-URL] --parseMasterKey [YOUR-MASTER-KEY]
```

Or you can create a file named **pmst.config.js** with the following content :

```
module.exports = {
  parseServerUrl: [YOUR-URL],
  parseAppId: [YOU-APP-ID],
  parseMasterKey: [YOUR-MASTER-KEY],
}
```

### Generate models only

```
pmst generate-models
-- or --
pmst gm
```

### Generate stores and models

```
pmst generate-store
-- or --
pmst gs
```

# License

MIT - see LICENSE

# Todo

[ ] Handle required and default value of field
