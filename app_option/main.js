var electron = require("electron");
var { app, BrowserWindow } = electron;

var mainWindow = null;

app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});

app.on("ready", function() {
	mainWindow = new BrowserWindow({
		// ウィンドウ作成時のオプション
		"width": 250,
		"height": 70,
		"transparent": true, 	// ウィンドウの背景を透過
		"frame": false, 		// 枠の無いウィンドウ
		"resizable": false, 	// ウィンドウのリサイズを禁止
		"skip-taskbar": true, 	// タスクバーに表示しない
		"show": false			// アプリ起動時にウィンドウを表示しない
	});

	// index.html を開く
	mainWindow.loadURL("file://" + __dirname + "/index.html");

	mainWindow.on("closed", function() {
		mainWindow = null;
	});

	// タスクトレイに格納
  var { Menu, Tray, nativeImage } = electron;

	var trayIcon = new Tray(nativeImage.createFromPath(__dirname + "/icon.png"));

	// タスクトレイに右クリックメニューを追加
	var contextMenu = Menu.buildFromTemplate([
		{ label: "表示", click: function () { mainWindow.focus(); } },
		{ label: "終了", click: function () { mainWindow.close(); } }
	]);
	trayIcon.setContextMenu(contextMenu);

	// タスクトレイのツールチップをアプリ名に
	trayIcon.setToolTip(app.getName());

	// タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
	trayIcon.on("clicked", function () {
		mainWindow.focus();
	});
	// タスクトレイに格納 ここまで
});
