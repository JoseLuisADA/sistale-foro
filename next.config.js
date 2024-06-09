/*next.config.js*/
module.exports = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  }
};
