import * as vscode from 'vscode';
import * as rimraf from 'rimraf';
import * as pify from 'pify';

import { Command } from './Command';
import { getUserDataFolder } from '../Common/Utils';
import { LogManager } from 'sp-typed-item';

export class ClearAllCredentials extends Command {
    constructor(context: vscode.ExtensionContext) {
        super(context);
    }

    public async execute(): Promise<void> {
        let userDataPath = await getUserDataFolder();
        try {
            await pify(rimraf)(userDataPath);
        } catch (error) {
            if (error && error.message && error.message.indexOf('EPERM') !== -1) {
                let warn = `Unable to clear credentials. You can try to delete them manually by deleting the folder at '${userDataPath}'`;
                vscode.window.showWarningMessage(warn);
                LogManager.instance.warn(warn);
                return;
            }
        }

        vscode.window.showInformationMessage('All credentials were cleared successfully');
    }
}
