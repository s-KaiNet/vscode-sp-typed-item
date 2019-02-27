import * as vscode from 'vscode';

import { Logger } from 'sp-typed-item';
import { EXTENSION_KEY } from '../Common/Consts';

let outputChannel: vscode.OutputChannel;

function getOrCreateOutputChannel() {
    if (!outputChannel) {
        outputChannel = vscode.window.createOutputChannel(EXTENSION_KEY);
    }
    return outputChannel;
}

export class VSCodeLogger extends Logger {

    private readonly _outputChannel: vscode.OutputChannel;

    public constructor() {
        super();

        this._outputChannel = getOrCreateOutputChannel();
    }

    public error(err: any): void {
        vscode.window.showErrorMessage(this.data2String(err));

        this.log('Error', this.data2String(err));
    }

    public info(data: string): void {
        this.log('Info', data);
    }

    public warn(data: string): void {
        this.log('Warning', data);
    }

    public log(level: string, message: string, data?: any): void {
        this._outputChannel.appendLine(`[${level} - ${(new Date().toLocaleTimeString())}] ${message}`);

        if (data) {
            this._outputChannel.appendLine(this.data2String(data));
        }
    }
}
