const NextFedrationPlugin = require("@module-federation/nextjs-mf");

// const remotes = (isSever) => {
//   const location = isSever ? "ssr": "chunks";
//   return {
//     mfe2: `mfe2@`
//   }
// }

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFedrationPlugin({
        name: "mfe2",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./mfe2": "./src/pages/index",
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
