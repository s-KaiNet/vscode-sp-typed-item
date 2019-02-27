import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IAdfsUserCredentials } from 'node-sp-auth';
import { AdfsUrlStep } from './AdfsUrlStep';
import { GenericInputStep } from './GenericInputStep';

export class RelyingPartyStep extends GenericInputStep<AuthContext> {

    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'Relying party. For more information visit extension\'s home page.';
        this.input.placeholder = 'urn:sharepoint:portal';
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IAdfsUserCredentials).relyingParty = this.input.value;

        return new AdfsUrlStep(context);
    }
}
