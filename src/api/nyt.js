import axios from 'axios';
import cheerio from 'cheerio';
import config from '../config';
import { filter, uniq, map, mapValues, groupBy, isEmpty } from 'lodash';

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
    let data = { title, level: 0 };
    let children = subSections[title];

    if (!isEmpty(children)) {
      children = map(children, title => ({ title, level: 1 }));

      data = { ...data, children };
    }

    return data;
  });

  return { stories, sections };
}

export async function storyContents(url) {
  const { data } = await axios.get(
    `https://cors-anywhere.herokuapp.com/${url}`
  );

  const $sizzle = cheerio.load(data);

  return $sizzle('section[name="articleBody"] p')
    .map((index, paragraph) => $sizzle(paragraph).text())
    .get();
}
