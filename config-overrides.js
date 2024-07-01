const {
	override,
	addWebpackAlias,
	addWebpackPlugin,
} = require("customize-cra");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = override(
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	}),
	addWebpackPlugin(
		new TerserPlugin({
			terserOptions: {
				compress: {
					drop_console: true,
				},
			},
		})
	)
);
