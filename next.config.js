const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// const env = dotenv.parse(fs.readFileSync(".env"));

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_APP_URL_BACK: "http://localhost:3001/",
    NEXT_APP_PRESET_KEY: "efnafyxi",
    NEXT_APP_CLOUD_NAME: "dxjziyljv",
    NEXT_APP_KEY_ADMIN: "PaU85StcECPnaQisHTDsjNoe6RY2",
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
