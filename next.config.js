module.exports = {
  async redirects() {
    return [
      {
        source: '/callback',
        destination: '/api/account/callback',
        permanent: true,
      },
    ];
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    });
    return config;
  },
};
