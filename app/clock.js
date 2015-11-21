// ウィンドウを開く
openWindow();

// 時計の描画処理をスタート
clock();

function openWindow () {
	// ウィンドウのオブジェクトを取得
	var win = require("remote").getCurrentWindow();

	// ウィンドウ位置を復元
	if (localStorage.getItem("windowPosition")) {
		var pos = JSON.parse(localStorage.getItem("windowPosition"));
		win.setPosition(pos[0], pos[1]);
	}

	// クローズ時にウィンドウ位置を保存
	win.on("close", function() {
		localStorage.setItem("windowPosition", JSON.stringify(win.getPosition()));
	});

	// ウィンドウを表示
	win.show();
}

function clock () {
	// 現在日時を取得
	var d = new Date();

	// デジタル時計を更新
	updateDigitalClock(d);

	// 次の「0ミリ秒」に実行されるよう、次の描画処理を予約
	var delay = 1000 - new Date().getMilliseconds();
	setTimeout(clock, delay);
}

function updateDigitalClock (d) {
	var AA_str = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var YY = d.getFullYear().toString().slice(-2);
	var MM = d.getMonth() + 1;
	var DD = d.getDate();
	var AA = d.getDay();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();

	// 桁あわせ
	if(MM < 10) { MM = "0" + MM; }
	if(DD < 10) { DD = "0" + DD; }
	if(hh < 10) { hh = "0" + hh; }
	if(mm < 10) { mm = "0" + mm; }
	if(ss < 10) { ss = "0" + ss; }

	var text = YY + '/' + MM + '/' + DD + ' (' + AA_str[AA] + ')<br>' + hh + ':' + mm + ':' + ss
	document.getElementById("digital_clock").innerHTML = text;
}
