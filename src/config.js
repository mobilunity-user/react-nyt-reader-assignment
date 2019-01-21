const { UI_DRAWER_WIDTH, NYT_API_KEY } = process.env;

const config = {
  ui: {
    drawerWidth: UI_DRAWER_WIDTH || 240
  },
  apis: {
    nyt: { apiKey: NYT_API_KEY }
  }
}

export default config;
