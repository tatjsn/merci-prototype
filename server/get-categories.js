import fetchJson from './fetch-json';

export default (spaceUrl, accessToken) => () =>
  fetchJson(`${spaceUrl}/entries?access_token=${accessToken}&content_type=category&include=0`)
    .then(data =>
      data.items.map(({ sys: { id }, fields: { name, code, parentCategory } }) =>
        ({ id, name, code, parent: parentCategory ? parentCategory.sys.id : '' })
      )
    );
