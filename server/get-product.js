import fetchJson from './fetch-json';

export default (spaceUrl, accessToken) => code =>
  fetchJson(`${spaceUrl}/entries?access_token=${accessToken}&content_type=product&fields.code=${code}`);
