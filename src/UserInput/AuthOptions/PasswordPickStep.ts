import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IUserCredentials } from 'node-sp-auth';
import { RelyingPartyStep } from './RelyingPartyStep';
import { GenericInputStep } from './GenericInputStep';

export class PasswordPickStep extends GenericInputStep<AuthContext> {

    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'Password';
        this.input.password = true;
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IUserCredentials).password = this.input.value;

        if (!context.adfs) {
            return null;
        } else {
            return new RelyingPartyStep(context);
        }
    }
}
