export interface IModel<T> {
  create(payload: T): Promise<T>,
  find(): Promise<T[]>,
  findById(_id: string): Promise<T | null>,
  update(_id: string, payload: T): Promise<T | null>,
  delete(_id: string): Promise<true | void>,
}
