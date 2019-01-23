import Env from './api/env';

const config = {
  ui: {
    drawerWidth: Env.number('UI_DRAWER_WIDTH', 240)
  },
  apis: {
    nyt: { apiKey: Env('NYT_API_KEY') }
  }
}

export default config;
