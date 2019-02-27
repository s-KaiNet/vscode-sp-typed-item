import { Step } from './Step';

export class Pipeline {

    public static async process<T>(context: T, step: Step<T>): Promise<T> {
        let next = await step.execute(context);

        if (next) {
            return this.process(context, next);
        } else {
            return context;
        }
    }
}
