const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const env = dotenv.parse(fs.readFileSync(".env"));

module.exports = {
  reactStrictMode: true,
  env: env,
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
