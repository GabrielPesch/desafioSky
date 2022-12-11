export interface IUserService<T> {
  getAll(): Promise<T[] | undefined>
  getById(id: string): Promise<T | null>,
  getByEmail(email: string): Promise<T | undefined>,
  update(id: string, payload: T): Promise<T | void>,
  delete(email: string): Promise<undefined | void>
}