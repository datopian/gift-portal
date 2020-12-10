import { Dataset } from "frictionless.js";
import fs from "fs";
import { join } from "path";
import toArray from "stream-to-array";

/**
 * Returns a list of data packages descriptors found in db directory
 * Descriptors are retrieved using frictionless.js.
 * @param {Array} directories an array of directories containing datapacka.json's
 * @returns {Array} List of data descriptors
 */
export const getCatalog = async (directories) => {
  let catalogs = [];
  for (let i = 0; i < directories.length; i++) {
    let path = join(process.cwd(), "fixtures", directories[i]);
    let dataset = await Dataset.load(path);
    let file = await dataset.resources[0];
    await file.addSchema();
    let schema = file.descriptor.schema;
    let sample_stream = await file.rows({ size: file.size }); //TODO: Might be a bottleneck later
    let sample = await toArray(sample_stream);
    let catalog = {};
    catalog[dataset._descriptor.title] = dataset._descriptor;
    catalog["schema"] = schema;
    catalog["sample"] = sample;
    catalogs.push(catalog);

    if (i == directories.length - 1) {
      return catalogs
    }
  }
};

/**
 * Returns a list of directory names found in fixtures folder
 */
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
