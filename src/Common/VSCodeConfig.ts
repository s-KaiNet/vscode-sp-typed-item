import { Config } from 'sp-typed-item';
import { WorkspaceConfiguration } from 'vscode';

export interface VSCodeConfig extends WorkspaceConfiguration {
    config: Config[];
    configPath: string;
}
