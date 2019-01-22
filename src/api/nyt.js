import axios from 'axios';
import config from '../config';
import { filter, uniq, map, mapValues, groupBy } from 'lodash';

const { apiKey } = config.apis.nyt;
const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc/',
  params: { 'api-key': apiKey },
  responseType: 'json'
});

export async function topStories() {
  const { data } = await nytApi.get('topstories/v2/home.json');
  const stories = data.results;

  const subSections = mapValues(groupBy(stories, 'section'),
    stories => uniq(filter(map(stories, 'subsection')))
  );

  const sections = map(uniq(map(stories, 'section')), title => {
    let data = { title };
    const children = subSections[title];

    if (children && children.length) {
      data = { ...data, children };
    }

    return data;
  });

  return { stories, sections };
}
