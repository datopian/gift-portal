import { data } from "autoprefixer";
import { Dataset } from "frictionless.js";
import fs from "fs";
import { join } from "path";
import toArray from "stream-to-array";

export default class MetaStore {

  constructor() {
    this.catalog = {};
    this.searchCatalog = [];
  }

  async initMetaStoreFromLocalDisk(directories) {
    for (let i = 0; i < directories.length; i++) {
      const path = join(process.cwd(), "fixtures", directories[i]);
      await this.updateCatalog(path);
    }
  }

  async updateCatalog(path) {
    const dataset = await Dataset.load(path);
    const file = await dataset.resources[0];
    await file.addSchema();
    const schema = file.descriptor.schema;
    const sample_stream = await file.rows({ size: file.size }); //TODO: Might be a bottleneck later
    const sample = await toArray(sample_stream);
   
    this.catalog[dataset._descriptor.title] = dataset._descriptor;
    this.catalog[dataset._descriptor.title]["schema"] = schema;
    this.catalog[dataset._descriptor.title]["sample"] = sample;
    this.searchCatalog.push(dataset._descriptor);
  }

  getDataset(name) {
    return this.catalog[name];
  }

  getResources(datasetName) {
    return this.getDataset(datasetName)["resources"];
  }
  
  getAresource(datasetName, resourceId) {
    return this.getResources(datasetName)[resourceId];
  }

  getDirectories() {
    return new Promise((resolve, reject) => {
      const directoryPath = join(process.cwd(), "fixtures/");
      const data_folder_names = [];

      fs.readdir(directoryPath, function (err, data_folders) {
        if (err) {
          reject(err);
        }
        data_folders.forEach(function (data_folder) {
          data_folder_names.push(data_folder);
        });
        resolve(data_folders);
      });
    });
  }
}