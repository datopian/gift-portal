import { useRouter } from "next/router";
import { loadDataFromGithub } from "../../db/db";
import CustomTable from "../../components/table";

const Dataset = ({ catalogs }) => {
  const router = useRouter();
  const { datasetid } = router.query;
  let dataset = catalogs[datasetid];
  let sample = dataset["sample"];
  let data = [];
  let columns = [];

  if (sample.length != 0) {
    columns = sample[0].map((item) => {
      return {
        Header: item,
        accessor: item,
      };
    });

    sample.slice(1, 10).map((item) => {
      let temp_obj = {};
      item.map((field, i) => {
        temp_obj[sample[0][i]] = field;
      });
      data.push(temp_obj);
    });
  }

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
          {data ? (
            <CustomTable data={data} columns={columns} />
          ) : (
            "NO PREVIEW FOR THIS DATASET"
          )}
        </div>
        <div className="mb-10 font-lato font-bold">Download</div>
        <div className="mb-10 ml-10">
          <div className="grid grid-cols-2 w-1/4 font-lato gap-y-2">
            <div className="font-bold">File Size</div>
            <div className="text-black-500 font-bold">File name</div>
            {dataset.resources.map((resource) => {
              return (
                <>
                  <div>{(resource.bytes * 0.000001).toFixed(2)} mb</div>
                  <div className="text-portal1">
                    <a href={resource.path}>
                      {resource.name}.{dataset.resources[0].format}
                    </a>
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
              <span>Created {dataset.createdAt}</span>
            </div>
            <div className="flex flex-row mb-20">
              <img src="/check.svg" alt="next" className="mr-4" />
              <span>Updated {dataset.updatedAt}</span>
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

export async function getStaticProps({ params }) {
  let [catalogs, _] = await loadDataFromGithub();
  return {
    props: { catalogs: catalogs },
    revalidate: 604800,
  };
}

export async function getStaticPaths() {
  let [catalogs, _] = await loadDataFromGithub();

  return {
    paths: Object.keys(catalogs).map((key) => {
      return {
        params: {
          datasetid: key.replace(/\s/g, "%20"),
        },
      };
    }),
    fallback: false,
  };
}

export default Dataset;
