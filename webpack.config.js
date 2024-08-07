const path = require("path");
const sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const options = {
  entry: {
    main: `./static_src/javascript/main.js`,
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.resolve(`./static_compiled/`),
    filename: "js/[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "fonts",
          context: path.resolve(`./static_src/`),
          to: path.resolve(`./static_compiled/fonts`),
        },
      ],
    }),
    //  Automatically remove all unused webpack assets on rebuild
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { compilerOptions: { noEmit: false } },
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: sass,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        include: /fonts/,
        type: "asset/resource",
      },
    ],
  },
};

const webpackConfig = (env, argv) => {
  const isProduction = argv.mode === "production";

  options.mode = isProduction ? "production" : "development";

  // Inline sourcemaps for dev, external for prod (Sentry)
  // See https://webpack.js.org/configuration/devtool/ for more options
  options.devtool = isProduction ? "source-map" : "inline-source-map";

  if (!isProduction) {
    // https://webpack.js.org/configuration/stats/
    const stats = {
      // Tells stats whether to add the build date and the build time information.
      builtAt: false,
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,
      // Add the hash of the compilation
      hash: false,
      // `webpack --colors` equivalent
      colors: true,
      // Add information about the reasons why modules are included
      reasons: false,
      // Add webpack version information
      version: false,
      // Add built modules information
      modules: false,
      // Show performance hint when file size exceeds `performance.maxAssetSize`
      performance: false,
      // Add children information
      children: false,
      // Add asset Information.
      assets: false,
    };

    options.stats = stats;
  }

  return options;
};

module.exports = webpackConfig;
