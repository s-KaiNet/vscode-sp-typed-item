import * as vscode from 'vscode';

export abstract class Command {
    constructor(protected context: vscode.ExtensionContext) {}

    public abstract async execute(): Promise<void>;
}
