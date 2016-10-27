import Fuse from 'fuse.js';

export default function search(list, query = '', opts = {}) {
  var fuse = new Fuse(list, Object.assign({
        keys: ['name', 'location'],
        threshold: 0.3
      }, opts));


  return fuse.search(query);
}
