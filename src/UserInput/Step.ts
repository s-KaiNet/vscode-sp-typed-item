export abstract class Step<T> {
    public async abstract execute(context: T): Promise<Step<T>>;
}
