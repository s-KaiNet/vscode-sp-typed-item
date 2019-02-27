import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IAdfsUserCredentials } from 'node-sp-auth';
import { GenericInputStep } from './GenericInputStep';
import { AdfsCookieStep } from './AdfsCookieStep';

export class AdfsUrlStep extends GenericInputStep<AuthContext> {

    constructor(context: AuthContext) {
        super(context);

        this.input.prompt = 'ADFS server url';
        this.input.placeholder = 'https://your-adfs-server-url';
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IAdfsUserCredentials).adfsUrl = this.input.value;

        return new AdfsCookieStep(context);
    }
}
