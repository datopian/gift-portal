import { useRouter } from 'next/router'
import * as db from '../../data';

const Dataset = () => {
  const router = useRouter()
  const { datasetid } = router.query

  if (!(datasetid in db.catalog)) {
    return 404
  } else {
    const dataset = db.catalog[datasetid]
    return (
        <div className='pl-40 pr-40 pt-10 pb-10'>
          {/* <p>Dataset: {datasetid}</p>
          <p>{dataset.title}</p>  */}
          <div className='flex flex-row mb-10'>
            <img src='/argentina.svg' alt='next' className='mr-10'/>
            <div className='pt-10'>
              <div className='mb-5 font-lato font-bold'>{dataset.title}</div>
              <div className='grid grid-cols-4 gap-4 font-roboto text-portal1'>
                <div className='border-2 text-center rounded-lg'>BUDGET</div>
                <div className='border-2 text-center rounded-lg'>FEDERAL</div>
                <div className='border-2 text-center rounded-lg'>SPENDING</div>
                <div className='border-2 text-center rounded-lg'>TAG 4</div>
              </div>
            </div>
          </div>
          <div className='flex flex-row mb-5'>
            <h6 className='mr-10 font-lato'>About this Dataset</h6>
            <img src='/share.svg' alt='next' />
          </div>
          <div className='mb-10 font-karla'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit sequi, quos nam aliquam laudantium dolorem doloremque perspiciatis quia, iste officia molestiae nesciunt? Dolorum modi repellendus libero facilis incidunt ad sunt?
          </div>
          <div className='mb-10 font-lato font-bold'>Preview</div>
          <div className='ml-10 mb-10'>
            <div>Table Goes Here</div>
          </div>
          <div className='mb-10 font-lato font-bold'>
            Download
          </div>
          <div className='mb-10 ml-10'>
            <div className='grid grid-cols-2 w-1/4 font-lato gap-y-2'>
              <div className='font-bold'>File Size</div>
              <div className='text-black-500 font-bold'>File name</div>
              <div>12mb</div>
              <div className='border-2 text-portal1 border'>DATA_PACKAGE_JSON</div>
              <div>140.5mb</div>
              <div className='border-2 text-portal1 border'>FILE_NAME_1</div>
            </div>
          </div>
          <h6 className='mb-10 font-lato font-bold'>Metadata</h6>
          <div className='flex flex-row ml-4 font-karla'>
              <div className='mr-20 '>
                 <div className='flex flex-row mb-20'>
                    <img src='/calender.svg' alt='next' className='mr-4'/>
                    <span>10/10/2020-11/11/2020</span>
                 </div>
                 <div className='flex flex-row mb-20'>
                    <img src='/check.svg' alt='next' className='mr-4'/>
                    <span>Last updated 12/12/2020</span>
                 </div>
                <div className='flex flex-row'>
                  <img src='/csv.svg' alt='next' className='mr-5'/>
                  <div className='self-start'>CSV, JSON, XML</div>
                </div>

              </div>
              <div className='grid grid-cols-2 gap-x-20 gap-y-10 font-roboto'>
                <div className='flex flex-row'>
                  <img src='/profile.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 1</h2>
                    <div className='font-karla'>description of metadata 1</div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <img src='/profile.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 2</h2>
                    <div className='font-karla'>description of metadata 2</div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <img src='/metas.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 3</h2>
                    <div className='font-karla'>description of metadata 3</div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <img src='/metas.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 4</h2>
                    <div className='font-karla'>description of metadata 4</div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <img src='/plus.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 5</h2>
                    <div className='font-karla'>description of metadata 5</div>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <img src='/plus.svg' className='mr-4'/>
                  <div>
                    <h2 className='text-portal4 font-lato'>Metadata 6</h2>
                    <div className='font-karla'>description of metadata 6</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
  }
}

export default Dataset