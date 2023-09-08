const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_APP_URL_BACK: process.env.NEXT_APP_URL_BACK,
    NEXT_APP_PRESET_KEY: process.env.NEXT_APP_PRESET_KEY,
    NEXT_APP_CLOUD_NAME: process.env.NEXT_APP_CLOUD_NAME,
    NEXT_APP_KEY_ADMIN: process.env.NEXT_APP_KEY_ADMIN,
  },
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "css")],
  },
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};
