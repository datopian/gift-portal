import { assert } from 'chai';
import MetaStore from '../metastore';

describe("Metastore", function(){
  it('should generate metastore from local directory', async () => {
    const metaStore = new MetaStore();
    const paths = await metaStore.getDirectories();
    
    await metaStore.initMetaStoreFromLocalDisk(paths)
    const keys = Object.keys(metaStore.getDataset("Gilching"))
    const expectedKeys = [
                          'model',         'promise',
                          'title',         'name',
                          'resources',     '@context',
                          'owner',         'author',
                          'count_of_rows', 'readme',
                          'schema',        'sample'
                        ]
    assert.deepEqual(keys, expectedKeys);
  });
  it('should generate metastore from local directory', async () => {
    const metaStore = new MetaStore();
    const paths = await metaStore.getDirectories();
    
    await metaStore.initMetaStoreFromLocalDisk(paths)
    const resourceKeys = Object.keys(metaStore.getAresource("Gilching",0));
    const expKeys = [
                      'path',      'pathType',
                      'name',      'format',
                      'mediatype', 'bytes',
                      'dialect',   'encoding',
                      'schema'
                    ]
    assert.deepEqual(resourceKeys, expKeys);
  });

});