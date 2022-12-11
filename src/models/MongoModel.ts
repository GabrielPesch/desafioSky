import { Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/errorCatalog';
import { IModel } from '../interfaces/IModel';
import { UUID_LENGTH } from '../utils/consts';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(payload: T): Promise<T> {
    const created = await this._model.create({ ...payload });

    return created as T & { _id: string };
  }
  
  public async find(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(_id: string): Promise<T | null> {
    if (typeof (_id) !== 'string' || _id.length !== UUID_LENGTH) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }

    return this._model.findById(_id);
  }

  public async findOne(property: string):Promise<T | null> {
    return this._model.findOne({ property });
  }
  
  public async update(_id: string, payload: T): Promise<T | null> {
    if (_id.length !== UUID_LENGTH) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }

    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ...payload } as UpdateQuery<T>,
      { new: true },
    );
    if (!updated) return null;

    return updated;
  }
  public async delete(property: string): Promise<true | void> {
    try {
      // @ts-expect-error Property overloading
      await this._model.deleteOne({ [property]: property });
      return true;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
}

export default MongoModel;