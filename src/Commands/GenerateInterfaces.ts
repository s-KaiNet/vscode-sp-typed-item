import * as vscode from 'vscode';
import * as path from 'path';
import { SPTypedItem } from 'sp-typed-item';

import { TypedItemCommand } from './TypedItemCommand';

export class GenerateInterfaces extends TypedItemCommand {
    constructor(context: vscode.ExtensionContext) {
        super(context);
    }

    public async execute(): Promise<void> {

        // if auth not provided, read it from user app data folder
        if (!this.config.authConfigPath) {
            await this.createAndSaveConfig();
        }

        if (!path.isAbsolute(this.config.authConfigPath)) {
            this.config.authConfigPath = path.join(this.workspaceRoot, this.config.authConfigPath);
        }

        this.config.outputPath = path.join(this.workspaceRoot, this.config.outputPath);

        return vscode.window.withProgress({
            title: 'SharePoint Typed Item: generating interfaces...',
            cancellable: false,
            location: vscode.ProgressLocation.Window
        }, () => {
            return SPTypedItem.renderFiles(this.config);
        });
    }
}
