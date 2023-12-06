module.exports = ({ env }) => ({
  url: env("STRAPI_URL"),
  proxy: true,
  app: {
    keys: env.array("APP_KEYS", ["DATABASE_URL"]),
  },
});
