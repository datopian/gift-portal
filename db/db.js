import { Dataset } from "frictionless.js";
import fs from "fs";
import { join } from "path";

export const getCatalog = async (directories) => {
  let catalogs = [];
  let descriptorCatalog = [];
  for (let i = 0; i < directories.length; i++) {
    let path = join(process.cwd(), "fixtures", directories[i]);
    let dataset = await Dataset.load(path);
    let catalog = {}
    catalog[dataset._descriptor.title] = dataset._descriptor;
    descriptorCatalog.push(dataset._descriptor);
    catalogs.push(catalog);

    // if (i == directories.length - 1) {
    //   return catalogs;
    // }
  }
  return [catalogs, descriptorCatalog];
};

export const getDirectories = () => {
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
};
