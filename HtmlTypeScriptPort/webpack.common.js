import { fileURLToPath } from "url";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssPresetEnv from "postcss-preset-env";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://webpack.js.org/configuration/#options
export const context = __dirname;
export const entry = {
    main: "./src/index.tsx",
    // app: "./Scripts/corruption-of-champions/main.ts"
};
export const output = {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "images/[hash]/[ext][query]",
    clean: true,
};
export const resolve = {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
};
export const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/blob/main/examples/babel-loader/webpack.config.js
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
            mode: "write-references",
        },
        eslint: {
            files: "./src/**/*.{ts,tsx,js,jsx}",
        },
    }),
];
export const module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: "asset",
        },
        {
            test: /\.(s[ac]|c)ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "",
                    },
                },
                { loader: "css-loader", options: { importLoaders: 1 } },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [postcssPresetEnv()],
                        },
                    },
                },
                "sass-loader",
            ],
        },
    ],
};
