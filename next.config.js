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
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
    APP_GITHUB_KEY: process.env.APP_GITHUB_KEY
  }
};
