import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as pify from 'pify';

import { TypedItemCommand } from './TypedItemCommand';
import { getUserDataFolder, resolveFileName, pathExists } from '../Common/Utils';

export class ResetWorkspaceCredentials extends TypedItemCommand {
    constructor(context: vscode.ExtensionContext) {
        super(context);
    }

    public async execute(): Promise<void> {
        let userDataPath = await getUserDataFolder();
        let authConfigPath = path.join(userDataPath, resolveFileName(this.config.siteUrl));
        let configExists = await pathExists(authConfigPath);

        if (configExists) {
            await pify(fs.unlink)(authConfigPath);
        }

        await this.createAndSaveConfig();

        vscode.window.showInformationMessage('Workspace credentials were reseted successfully');
    }
}
