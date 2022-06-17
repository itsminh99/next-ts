// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    OG_IMAGE: process.env.OG_IMAGE,
  },
  /**
   * Not supported for Static HTML(next export).
   *  */
  // async rewrites() {
  //   return [
  //     {
  //       source: `/app/:path*`,
  //       destination: `${process.env.API_URL}/:path*`,
  //     },
  //   ];
  // },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
