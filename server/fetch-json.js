import fetch from 'node-fetch';

export default (url, options) =>
  fetch(url, options)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Unexpected status code ${res.status} from ${url}`);
      }
      return res.json();
    });
