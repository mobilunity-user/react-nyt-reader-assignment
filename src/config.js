import { toNumber } from 'lodash';
const { REACT_APP_UI_DRAWER_WIDTH, REACT_APP_NYT_API_KEY } = process.env;

const config = {
  ui: {
    drawerWidth: toNumber(REACT_APP_UI_DRAWER_WIDTH || 240)
  },
  apis: {
    nyt: { apiKey: REACT_APP_NYT_API_KEY }
  }
}

export default config;
