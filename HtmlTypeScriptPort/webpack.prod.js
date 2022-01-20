import { merge } from "webpack-merge";
import * as common from "./webpack.common.js";

// https://webpack.js.org/guides/production
export default merge(common, {
    mode: "production", // https://webpack.js.org/configuration/mode
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
                    },
                },
            },
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // Seems runtime: "automatic" only targets .jsx; still need to import React for .tsx
                        presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }], "@babel/preset-typescript"],
                    },
                },
            },
        ],
    },
});
