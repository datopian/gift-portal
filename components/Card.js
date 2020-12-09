/**
 * Create card for each datasets.
 * e.g
 * let props = {
 *  logo: '/argentina.svg',
 *  name: 'Daily Treasury Statement (DTS)',
 *   tags: ['Budget', 'FEDERAL','SPENDING','TAG4'],
 *   description: 'CONTENT HERE',
 *   created: '10/03/2019-11/26/2020',
 *   updated: '11/30/2020',
 * }
 * <Card props={props} />
 * @param {*} props
 * @return JSX
 */
export default function Card({ props }) {
  let raw_dataset = JSON.parse(props);
  let dataset_title = Object.keys(raw_dataset)[0]
  let dataset = raw_dataset[dataset_title]

  return (
    <div
      className={`flex flex-col rounded-lg border-2 w-379.25px h-607.81px shadow-md justify-between p-5 mb-4`}
    >
      <div className="flex flex-row justify-between items-center">
        {dataset.logo && <img src={dataset.logo} alt="next" className="mr-2" />}
        <div className="font-lato text-xl">{dataset.title}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 font-roboto text-portal1">
        {dataset.tags &&
          dataset.tags.map((value, index) => {
            return (
              <div key={index} className="border-2 text-center rounded-lg">
                {value}
              </div>
            );
          })}
      </div>
      <div className="font-karla">
        {dataset.description == undefined ? "No Description" : dataset.description}
      </div>
      <div className="pl-3 flex flex-col font-karla">
        <div className="flex flex-row mb-4">
          <img src="/calender.svg" alt="next" className="mr-4" />
          <span>{dataset.created}</span>
        </div>
        <div className="flex flex-row mb-4">
          <img src="/check.svg" alt="next" className="mr-4" />
          <span>Last updated {dataset.updated}</span>
        </div>
        <div className="flex flex-row mb-4">
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

      <div className="flex flex-row justify-between font-karla text-portal1">
        <span>VIEW DATASET DETAILS</span>
        <img src="/share.svg" alt="next" />
      </div>
    </div>
  );
}
