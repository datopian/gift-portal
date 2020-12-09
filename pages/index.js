import Card from "../components/Card";
import Search from "../components/Search";
import { getCatalog, getDirectories } from "../db/db";

export default function Home({ catalogs }) {
  return (
    <div className="pl-40 pr-40 pt-10 pb-10">
      <h3 className="font-lato text-xl text-black">DataSet</h3>
      <div className="flex flex-row justify-between mt-10">
        <Search />
        <div className="flex justify-between items-center mr-35 pr-9">
          <h3 className="mr-4">Sort by: </h3>
          <select
            id="cars"
            className="border-2 focus:outline-none bg-white font-karla h-72px w-545px font-karla rounded-md"
          >
            <option value="AZ">Alphabetical Ascending (A to Z) </option>
            <option value="ZA">Alphabetical Descending (Z to A) </option>
          </select>
        </div>
      </div>
      <div className="mt-10">
        <div className="mb-10">showing 6 of 6 dataset</div>
        <div className="grid grid-cols-3 gap-x-40 gap-y-10">
          {JSON.parse(catalogs).map((value, i) => {
            return <Card props={JSON.stringify(value)} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let data_directories = await getDirectories();
  let catalogs = await getCatalog(data_directories);
  return {
    props: { catalogs: JSON.stringify(catalogs) },
  };
}
