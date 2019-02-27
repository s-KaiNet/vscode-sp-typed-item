# SharePoint Typed Item for Visual Studio Code

See it in action:   

![in action](/assets/sp-typed-item.gif)  

## Features
- Generates interfaces based on list and content type fields
- Settings to customize output fields and interface names
- Supports multiple SharePoint environments (SharePoint Online, SharePoint on-premises starting from 2013 version)
- easily integrates in your SharePoint development process 

## Available commands 
The following commands are available:
 - `SharePoint Typed Item: Generate interfaces`: generates TypeScript interfaces based on configuration settings
 - `SharePoint Typed Item: Reset workspace credentials`: resets credentials used by current workspace and asks for credentials from scratch
 - `SharePoint Typed Item: Clear all credentials`: clears all stored credentials across all workspaces

## Supported VS Code settings

This extension contributes the following settings:

* `sp-typed-item.config`: configuration object for the extension, holds essential information about site, lists, content type and generator settings
* `sp-typed-item.configPath`: path to the external json configuration file for the extension

## How to configure
1. Install the extension.
2. Provide configuration file for the extension. You have two options here. You can either use vscode `settings.json` file or create a separate `sp-type-item.config.json` file. In both cases you will receive intellisense from vscode for all configuration keys.    
 
   - `settings.json`: open `.vscode/settings.json`. If you don't have such file or folder, go to File menu -> Preferences -> Settings. Select "Workspace Settings" in top menu and switch to json edit mode using curly braces button in the top right corner. The file `.vscode/settings.json` will be created for you. Add a new entry with key `sp-typed-item.config` and add all required configuration. Read section "Configuration file" further below to learn configuration file format.     

   - `sp-type-item.config.json`: in your workspace create a file with `sp-type-item.config.json` name and add configuration for the extension inside. Open `.vscode/settings.json` (refer above to know how to create it if it's missing) and add new configuration option: `"sp-typed-item.configPath": "sp-type-item.config.json"`
3. Press `F1`, type `SharePoint` and select `SharePoint Typed Item: Generate interfaces`. If you run for the first time, the extension will ask you for authentication information. Fill in all information and in the very end your interfaces will be generated under specified location.     

   > **NOTE:** You can provide custom authentication file generated with help of [node-sp-auth-config](https://github.com/koltyakov/node-sp-auth-config) tool. In that case specify a path to your auth file with `authConfigPath` config option (workspace-relative). In that case vscode will not ask you for credentials.

## Configuration file  

`sp-typed-item` configuration file holds essential information about environment and interface generation settings. 

### Example file with all possible settings: 

```json
[
  {
    "siteUrl":"https://contoso.sharepoint.com/sites/dev",
    "authConfigPath":"./config/auth.json",
    "outputPath":"./Generated",
    "lists":[
      {
        "url":"Lists/Clients",
        "fileName":"IClientItems",
        "fields":{
          "exclude":[
            "Title",
            "FieldInternalName"
          ],
          "excludeHidden":true
        }
      }
    ],
    "contentTypes":[
      {
        "id":"0x01005207A2B9B939CE43AB38D848E245926B",
        "fileName":"IArchiveItems",
        "fields":{
          "exclude":[
            "Title",
            "FieldInternalName"
          ],
          "excludeHidden":true
        }
      }
    ]
  }
]
```  

#### Root element
Array of configuration items. Currently CLI and VSCode extension support only one configuration element. Multiple elements support might come in future.
#### Configuration item  
`siteUrl` - required, full url to your target SharePoint site  

`authConfigPath` - path to your json authentication details file. It's not required for VSCode extension, because VSCode extension handles it for you. This setting contains a path to your `node-sp-auth-config` json file.  

`outputPath` - required, path to a folder, where all interfaces will be generated.  

`lists` - this node describes all lists, which should be included in generation process. Either `lists` or `contentTypes` node should be provided. Array of configuration items:

* `url` - required, list url relative to a web, i.e. `Lists/MyList`, **not** `sites/mysite/Lists/MyList` 
* `filename` - you can provide custom file name (and interface name) for your list. Each list entry corresponds to one output interface file
* `fields` - optional, you can filter out some unnecessary fields:
  * `excludeHidden` - optional, specify to filter out all hidden fields
  * `exclude` - optional array, the list of fields to be excluded by internal name  
  
`contentTypes` - describes all content types to be included in generation process. Either `lists` or `contentTypes` node should be provided. Array of configuration items:
 * `id` - required, content type id
 * the rest of parameters are the same as for list, i.e. `fileName`, `fields`. 

Minimal working configuration file: 
```json
[
  {
    "siteUrl":"https://contoso.sharepoint.com/sites/dev",
    "outputPath":"./Generated",
    "lists":[
      {
        "url":"Lists/Clients"
      }
    ]
  }
]
```  
