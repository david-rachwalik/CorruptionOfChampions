import { merge } from "webpack-merge";
import * as common from "./webpack.common.js";

export default merge(common, {
    mode: "development", // https://webpack.js.org/configuration/mode
    devtool: "source-map", // https://webpack.js.org/configuration/devtool
    module: {
        // Other rules are prepended from webpack.common.js
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // Since React 17+, able to opt into not needing to import React into JSX using runtime: "automatic"
                        presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
                        plugins: ["react-refresh/babel"],
                    },
                },
            },
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }], "@babel/preset-typescript"],
                        plugins: ["react-refresh/babel"],
                    },
                },
            },
        ],
    },
});
