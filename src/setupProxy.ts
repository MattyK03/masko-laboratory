const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
	app.use(
		"/",
		createProxyMiddleware({
			target: "http://localhost:3000",
			changeOrigin: true,
			onProxyRes: function (proxyRes: any, req: any, res: any) {
				proxyRes.headers["Content-Security-Policy"] =
					"default-src 'self'; img-src 'self' blob: data:;";
			},
		})
	);
};
