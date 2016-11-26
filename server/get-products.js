import fetchJson from './fetch-json';

export default (spaceUrl, accessToken) => () =>
  fetchJson(`${spaceUrl}/entries?access_token=${accessToken}&content_type=product&include=0`)
    .then(data => data.items.map(({ sys: { id }, fields }) => Object.assign({}, { id }, fields)));
