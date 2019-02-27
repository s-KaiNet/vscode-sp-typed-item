import * as vscode from 'vscode';

import { Step } from '../Step';
import { AuthContext } from './AuthContext';
import { UserNamePickStep } from './UserNamePickStep';
import { PICK_NTLM_CREDS, PICK_ADFS_CREDS } from '../../Common/Consts';

export class OnpremisesAuthOptionsStep extends Step<AuthContext> {
    public async execute(context: AuthContext): Promise<Step<AuthContext>> {
        await this.selectAuth(context);

        return new UserNamePickStep(context, 'User login name', 'domain\\username or user@contoso.com');
    }

    private async selectAuth(context: AuthContext): Promise<void> {
        return new Promise((resolve, reject) => {
            let options: vscode.QuickPickItem[] = [{
                label: PICK_NTLM_CREDS,
                description: 'Default one for SharePoint web app. Uses your windows username and password.'
            }, {
                label: PICK_ADFS_CREDS,
                description: 'Select this option if your organization uses ADFS for user authentication.'
            }];

            let pick = vscode.window.createQuickPick();
            pick.title = `Select authentication type`;
            pick.ignoreFocusOut = true;
            pick.items = options;

            pick.show();

            pick.onDidAccept(() => {
                let picked = pick.selectedItems[0];
                if (picked.label === PICK_ADFS_CREDS) {
                    context.adfs = true;
                }
                pick.dispose();
                resolve();
            });
        });
    }
}
