import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IAdfsUserCredentials } from 'node-sp-auth';
import { GenericInputStep } from './GenericInputStep';

export class AdfsCookieStep extends GenericInputStep<AuthContext> {

    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'ADFS cookie setup. Do not change default value if you are not sure.';
        this.input.value = 'FedAuth';
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IAdfsUserCredentials).adfsCookie = this.input.value;

        return null;
    }
}
