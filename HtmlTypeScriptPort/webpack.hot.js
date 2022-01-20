import { merge } from "webpack-merge";
import dev from "./webpack.dev.js";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default merge(dev, {
    devServer: {
        static: "./dist",
        open: true, // https://webpack.js.org/configuration/dev-server/#devserveropen
        hot: true, // https://webpack.js.org/configuration/dev-server/#devserverhot
        // watch mode enabled by default in 'webpack-dev-server' (https://webpack.js.org/configuration/watch)
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});
