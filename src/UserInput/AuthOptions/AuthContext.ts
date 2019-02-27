import { IAuthOptions } from 'node-sp-auth';

import { Config } from 'sp-typed-item';

export class AuthContext {
    config: Config;
    auth: IAuthOptions;
    adfs: boolean;
}
