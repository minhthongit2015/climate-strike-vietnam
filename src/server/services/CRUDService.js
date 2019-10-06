
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/converter-factory');
const { isNotSet } = require('../utils');

module.exports = class CRUDService {
  static set model(model) {
    this._model = model;
  }

  static get model() {
    return this._model;
  }

  static get populate() {
    return [];
  }

  static resolveListOptions(opts = ApiHelper.listParams) {
    return opts;
  }

  static async create(doc) {
    const newDoc = await this.model.create(doc);
    return newDoc;
  }

  static async getOrList(id, opts = ApiHelper.listParams) {
    if (isNotSet(id)) {
      return this.list(opts);
    }
    return this.get(id);
  }

  static async get(id) {
    let query = this.model.findById(id);
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const doc = await query.exec();
    return ConverterFactory.get(this.model.modelName).convert(doc);
  }

  static async first(opts = ApiHelper.listParams) {
    opts.limit = 1;
    const foundDocs = await this.list(opts);
    return ConverterFactory.get(this.model.modelName).convert(foundDocs[0]);
  }

  static async list(opts = ApiHelper.listParams) {
    const listOptions = await this.resolveListOptions(opts);
    if (!listOptions) { // null mean that is have some errors
      return [];
    }
    let query = ApiHelper.findWithModel(this.model, listOptions);
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const docs = await query.exec();
    return ConverterFactory.get(this.model.modelName).convertCollection(docs);
  }

  static async update(id, props) {
    const updatedDoc = await this.model.findByIdAndUpdate(id, props).exec();
    return ConverterFactory.get(this.model.modelName).convert(updatedDoc);
  }

  static async delete(id) {
    const deleteResult = await this.model.findOneAndDelete(id).exec();
    return deleteResult;
  }
};
