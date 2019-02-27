import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IOnlineAddinCredentials } from 'node-sp-auth';
import { GenericInputStep } from './GenericInputStep';

export class ClientSecretPickStep extends GenericInputStep<AuthContext> {
    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'Client Secret';
        this.input.placeholder = 'i.e. mPzBdLkA+H6FxYkWO+4m/T/2U0M78DfZq1HJDKE=';
        this.input.password = true;
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IOnlineAddinCredentials).clientSecret = this.input.value;
        return null;
    }
}
