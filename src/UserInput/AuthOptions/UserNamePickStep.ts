import { AuthContext } from './AuthContext';
import { Step } from '../Step';
import { IUserCredentials } from 'node-sp-auth';
import { PasswordPickStep } from './PasswordPickStep';
import { GenericInputStep } from './GenericInputStep';

export class UserNamePickStep extends GenericInputStep<AuthContext> {

    constructor (context: AuthContext, private prompt: string, private placeholder: string) {
        super(context);

        this.input.prompt = this.prompt;
        this.input.placeholder = this.placeholder;
    }

    protected resolveNextStep(context: AuthContext): Step<AuthContext> {
        (context.auth as IUserCredentials).username = this.input.value;

        return new PasswordPickStep(context);
    }
}
