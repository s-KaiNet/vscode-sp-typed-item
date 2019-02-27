import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { IAuthOptions } from 'node-sp-auth';
import { AuthConfig } from 'node-sp-auth-config';
import { Config, JsonSchemaValidator } from 'sp-typed-item';

import { VSCodeConfig } from '../Common/VSCodeConfig';
import { ConfigNotFoundError } from '../Common/ConfigNotFoundError';
import { EXTENSION_KEY } from '../Common/Consts';
import { Command } from './Command';
import { getUserDataFolder, resolveFileName, pathExists } from '../Common/Utils';
import { Pipeline } from '../UserInput/Pipeline';
import { EnvironmentSelectionStep } from '../UserInput/AuthOptions/EnvironmentSelectionStep';
import { AuthContext } from '../UserInput/AuthOptions/AuthContext';

export abstract class TypedItemCommand extends Command {
    protected config: Config;
    protected workspaceRoot: string;

    constructor(context: vscode.ExtensionContext) {
        super(context);

        let configuration = vscode.workspace.getConfiguration(EXTENSION_KEY) as VSCodeConfig;

        if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
            throw new Error('You must open a folder with VSCode');
        }

        this.workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

        if (!configuration.configPath && (!configuration.config || configuration.config.length === 0)) {
            let warning = 'Provide configuration for SharePoint Typed Item extension before using it. Use extension home page for [guidance](http://example.com).';
            vscode.window.showWarningMessage(warning);
            throw new ConfigNotFoundError(warning);
        }

        if (configuration.config && configuration.config.length > 0) {
            // vscode caches configs
            this.config = JSON.parse(JSON.stringify(configuration.config[0]));
        } else {
            let workspace = vscode.workspace.workspaceFolders[0];
            let configPath = path.resolve(workspace.uri.fsPath, configuration.configPath);
            this.config = JSON.parse(fs.readFileSync(configPath).toString())[0];
        }

        JsonSchemaValidator.validate([this.config]);
    }

    protected async createAndSaveConfig(): Promise<void> {
        let userDataPath = await getUserDataFolder();
        let authConfigPath = path.join(userDataPath, resolveFileName(this.config.siteUrl));
        let configExists = await pathExists(authConfigPath);

        if (!configExists) {
            let authData = await this.askForCredentials();

            const authConfig = new AuthConfig({
                configPath: authConfigPath,
                encryptPassword: true,
                saveConfigOnDisk: true,
                headlessMode: true,
                authOptions: authData
            });

            // saves auth on the disk
            await authConfig.getContext();
        }
        this.config.authConfigPath = authConfigPath;
    }

    protected async askForCredentials(): Promise<IAuthOptions> {
        let result = await Pipeline.process({
            config: this.config,
            auth: {} as any
        } as AuthContext, new EnvironmentSelectionStep());

        return result.auth;
    }
}
