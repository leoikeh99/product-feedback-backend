module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4dfac5699890664bac97a17398f6bf89'),
  },
});
