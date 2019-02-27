import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IOnlineAddinCredentials } from 'node-sp-auth';
import { ClientSecretPickStep } from './ClientSecretPickStep';
import { GenericInputStep } from './GenericInputStep';

export class ClientIdPickStep extends GenericInputStep<AuthContext> {

    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'Client Id';
        this.input.placeholder = 'i.e. 25702e7f-9208-46ee-9c1b-078892d6487e';
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IOnlineAddinCredentials).clientId = this.input.value;

        return new ClientSecretPickStep(context);
    }
}
