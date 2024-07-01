const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
	// Создаем окно браузера.
	const mainWindow = new BrowserWindow({
		fullscreen: true,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "./preload.js"),
		},
	});

	// Определяем URL для загрузки в зависимости от окружения
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "../build/index.html"),
			protocol: "file:",
			slashes: true,
		});

	mainWindow.loadURL(startUrl);
	// mainWindow.loadURL("http://localhost:3000");

	// Отображаем средства разработчика (раскомментируйте при необходимости).
	mainWindow.webContents.openDevTools();

	mainWindow.webContents.session.webRequest.onHeadersReceived(
		(details, callback) => {
			callback({
				responseHeaders: {
					...details.responseHeaders,
					"Content-Security-Policy": [
						"default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *;",
					],
				},
			});
		}
	);
}

// Этот метод вызывается когда приложение инициализируется
// и будет готово для создания окон.
// Некоторые API могут использоваться только после возникновения этого события.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// На MacOS обычно пересоздают окно в приложении,
		// после того, как на иконку в доке нажали и других открытых окон нету.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Выйти когда все окна закрыты
app.on("window-all-closed", function () {
	// Для приложений и строки меню в macOS является обычным делом оставаться
	// активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
	if (process.platform !== "darwin") app.quit();
});

// В этом файле вы можете включить остальную часть основного процесса вашего приложения
// Вы также можете поместить их в отдельные файлы и подключить через require.
