import { useRouter } from "next/router";
import { getCatalog, getDirectories } from "../../db/db";
import CustomTable from "../table";

const Dataset = ({ catalogs }) => {
  const router = useRouter();
  const { datasetid } = router.query;
  const raw_catalogs = JSON.parse(catalogs);
  let dataset, sample, schema;

  raw_catalogs.forEach((r_catalog) => {
    if (Object.keys(r_catalog).includes(datasetid)) {
      dataset = r_catalog[datasetid];
      sample = r_catalog["sample"];
      schema = r_catalog["schema"];
    }
  });

  const column_names = sample[0];
  const columns = column_names.map((item) => {
    return {
      Header: item,
      accessor: item,
    };
  });

  let data = []
  sample.slice(1, 10).map((item) => {
    let temp_obj = {}
    item.map((field, i)=>{
      temp_obj[column_names[i]] = field
    })
    data.push(temp_obj)    
  });


  if (!datasetid) {
    return 404;
  } else {
    return (
      <div className="pl-40 pr-40 pt-10 pb-10">
        <div className="flex flex-row mb-10">
          <img src="/argentina.svg" alt="next" className="mr-10" />
          <div className="pt-10">
            <div className="mb-5 font-lato font-bold">{dataset.title}</div>
            <div className="grid grid-cols-4 gap-4 font-roboto text-portal1">
              <div className="border-2 text-center rounded-lg">BUDGET</div>
              <div className="border-2 text-center rounded-lg">FEDERAL</div>
              <div className="border-2 text-center rounded-lg">SPENDING</div>
              <div className="border-2 text-center rounded-lg">TAG 4</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row mb-5">
          <h6 className="mr-10 font-lato">About this Dataset</h6>
          <img src="/share.svg" alt="next" />
        </div>
        <div className="mb-10 font-karla">{dataset.description}</div>
        <div className="mb-10 font-lato font-bold">File Preview</div>
        <div className="ml-10 mb-10">
          <CustomTable data={data} columns={columns} />
        </div>
        <div className="mb-10 font-lato font-bold">Download</div>
        <div className="mb-10 ml-10">
          <div className="grid grid-cols-2 w-1/4 font-lato gap-y-2">
            <div className="font-bold">File Size</div>
            <div className="text-black-500 font-bold">File name</div>
            {dataset.resources.map((resource) => {
              return (
                <>
                  <div>{(resource.bytes * 0.000001).toFixed(2)}mb</div>
                  <div className="border-2 text-portal1 border">
                    <a href={resource.path}>{resource.name}.{dataset.resources[0].format}</a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <h6 className="mb-10 font-lato font-bold">Metadata</h6>
        <div className="flex flex-row ml-4 font-karla">
          <div className="mr-20 ">
            <div className="flex flex-row mb-20">
              <img src="/calender.svg" alt="next" className="mr-4" />
              <span>10/10/2020-11/11/2020</span>
            </div>
            <div className="flex flex-row mb-20">
              <img src="/check.svg" alt="next" className="mr-4" />
              <span>Last updated 12/12/2020</span>
            </div>
            <div className="flex flex-row">
              <img src="/csv.svg" alt="next" className="mr-5" />
              {dataset.resources[0].format == "csv" ? (
                <div className="self-start">CSV</div>
              ) : (
                ""
              )}
              {dataset.resources[0].format == "xml" ? (
                <div className="self-start">XML</div>
              ) : (
                ""
              )}
              {dataset.resources[0].format == "json" ? (
                <div className="self-start">JSON</div>
              ) : (
                ""
              )}
              {dataset.resources[0].format == "xlsx" ? (
                <div className="self-start">EXCEL</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-20 gap-y-10 font-roboto">
            <div className="flex flex-row">
              <img src="/profile.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Source</h2>
                {dataset.sources == undefined
                  ? ""
                  : dataset.sources.map((source) => {
                      return (
                        <div className="font-karla">
                          <a href={source.url}>{source.title}</a>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/profile.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Author</h2>
                <div className="font-karla">{dataset.author}</div>
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Country</h2>
                <div className="font-karla">
                  {dataset["geo"] == undefined ? "" : dataset.geo.country}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Region</h2>
                <div className="font-karla">
                  {dataset["geo"] == undefined ? "" : dataset.geo.region}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/plus.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Language</h2>
                <div className="font-karla">{}</div>
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/plus.svg" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Metadata 6</h2>
                <div className="font-karla">description of metadata 6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  let data_directories = await getDirectories();
  let [catalogs, _] = await getCatalog(data_directories);
  return {
    props: { catalogs: JSON.stringify(catalogs) },
  };
}

export default Dataset;
