const NextFedrationPlugin = require("@module-federation/nextjs-mf");

const MFE1_APP_URL =
  process.env.NEXT_PUBLIC_MFE1_URL || "http://localhost:3001";
const MFE2_APP_URL =
  process.env.NEXT_PUBLIC_MFE2_URL || "http://localhost:3002";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    mfe1: `mfe1@${MFE1_APP_URL}/_next/static/${location}/remoteEntry.js`,
    mfe2: `mfe2@${MFE2_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFedrationPlugin({
        name: "host",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
