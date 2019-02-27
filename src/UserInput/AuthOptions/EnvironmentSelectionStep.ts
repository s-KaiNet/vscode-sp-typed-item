import * as vscode from 'vscode';

import { Step } from '../Step';
import { Environments } from '../../Common/Environments';
import { PICK_SP_ONLINE, PICK_SP_ONPREMISES } from '../../Common/Consts';
import { OnlineAuthOptionsStep } from './OnlineAuthOptionsStep';
import { OnpremisesAuthOptionsStep } from './OnpremisesAuthOptionsStep';
import { AuthContext } from './AuthContext';

export class EnvironmentSelectionStep extends Step<AuthContext> {
    public async execute(context: AuthContext): Promise<Step<AuthContext>> {
        let selectedEnvironment = await this.selectEnvironment(context);
        switch (selectedEnvironment) {
            case Environments.Online:
                return new OnlineAuthOptionsStep();
            case Environments.Onpremises:
                return new OnpremisesAuthOptionsStep();
        }
    }

    private async selectEnvironment(context: AuthContext): Promise<Environments> {
        return new Promise((resolve, reject) => {
            let options: vscode.QuickPickItem[] = [{
                label: PICK_SP_ONLINE,
                description: 'Select this option if your target site is SharePoint Online site.'
            }, {
                label: PICK_SP_ONPREMISES,
                description: 'Select this option if your target site is SharePoint on-premises (2013 on onwards) site.'
            }];

            let pick = vscode.window.createQuickPick();
            pick.title = `Target SharePoint site: ${context.config.siteUrl}`;
            pick.ignoreFocusOut = true;
            pick.items = options;

            pick.show();

            pick.onDidAccept(() => {
                let picked = pick.selectedItems[0];
                pick.dispose();
                resolve(picked.label === PICK_SP_ONLINE ? Environments.Online : Environments.Onpremises);
            });
        });
    }
}
