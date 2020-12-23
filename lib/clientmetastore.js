import React from 'react';

export default class ClientMetaStore {

  constructor() {
    this._catalog = {};
  }

  setCatalog(catalog) {
    this._catalog = catalog;
  }

  getDataset(name) {
    return this._catalog[name];
  }

  getCatalogs(){
    return this._catalog;
  }

  getResources(datasetName) {
    return this.getDataset(datasetName)["resources"];
  }
  
  getAresource(datasetName, resourceId) {
    return this.getResources(datasetName)[resourceId];
  }
}

export const MetaStoreContext = React.createContext();