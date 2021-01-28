module.exports = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
  env: {
    APP_GITHUB_KEY: "b2aeaed1d420bd58d0a77d009ae217df98d50c99",
  },
};
