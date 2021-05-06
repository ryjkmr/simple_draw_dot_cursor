window.onload = function () {
  const CANVAS_WIDTH = 1500;
  const CANVAS_HEIGHT = 1000;
  const cursor = document.getElementById("cursor");//ドットカーソルのdiv

  let LineWidthSave = 5; //消しゴムを使った後で元のペンサイズに戻すための記録用

  const canvas = new fabric.Canvas("canvas", {
    freeDrawingCursor: 'none',//自作のドットカーソルを表示するために必要
    isDrawingMode: true
  });
  canvas.setHeight(CANVAS_HEIGHT);
  canvas.setWidth(CANVAS_WIDTH);
  canvas.setBackgroundColor(
    "rgba(255, 255, 255, 1)",
    canvas.renderAll.bind(canvas)
  );

  document.getElementById("canvas-container").style.width = CANVAS_WIDTH + "px";

  canvas.freeDrawingBrush.color = "rgb(0,0,0)"; // 描画する線の色、初期値
  canvas.freeDrawingBrush.width = 5; // 描画する線の太さ

  //色選択ボタンの設定
  const selectColorBtn = document.getElementsByClassName("color");

  for (i = 0; i < selectColorBtn.length; i++) {
    selectColorBtn[i].addEventListener("click", function (e) {
      //ボタンが自分の色を取得して描画色にする
      const btnColor = window
        .getComputedStyle(this, null)
        .getPropertyValue("background-color");
      console.log(btnColor);
      canvas.freeDrawingBrush.color = btnColor; // 描画する線の色
      canvas.freeDrawingBrush.width = LineWidthSave;

      cursor.style.setProperty("background", btnColor);//ドットカーソルの色を変更

      clearSelectedButton();
      this.classList.add("selected"); //選択されたボタンはボーダーを太くする
    });
  }

  //ブラシサイズボタンの設定
  const selectLineWidthBtn = document.getElementsByClassName("selectLineWidth");

  for (i = 0; i < selectLineWidthBtn.length; i++) {
    selectLineWidthBtn[i].addEventListener("click", function (e) {
      //ボタンが自分の値を取得してペンサイズにセット
      canvas.freeDrawingBrush.width = parseInt(this.value);
      LineWidthSave = parseInt(this.value);

      //ドットカーソルのサイズを変更
      cursor.style.setProperty("--cursor-size", this.value + "px");
      cursor.style.setProperty("--cursor-offset", -parseInt(this.value) / 2 + "px");

    });
  }

  //canvas内外でのドットカーソルのオン・オフ
  document.getElementById("canvas-container").addEventListener("mouseover", function (e) {
    console.log("over");
    document.getElementById("cursor").classList.add("showDotCursor");
    document.getElementById("cursor").classList.remove("hideDotCursor");
  });

  document.getElementById("canvas-container").addEventListener("mouseout", function (e) {
    console.log("out!");
    document.getElementById("cursor").classList.add("hideDotCursor");
    document.getElementById("cursor").classList.remove("showDotCursor");
  });


  function clearSelectedButton() {
    const btn = document.getElementsByClassName("color");
    for (i = 0; i < btn.length; i++) {
      btn[i].classList.remove("selected");
    }
  }

  //ダウンロードボタンの処理
  document.getElementById("download").addEventListener("click", function (e) {
    let canvasToDL = document.getElementById("canvas");
    let link = document.createElement("a");
    link.href = canvasToDL.toDataURL("image/png");
    link.download = "drawing.png";
    link.click();
  });

  document
    .getElementById("eraser") //消しゴムはサイズの大きい白いペンで代用
    .addEventListener("click", function (e) {
      canvas.freeDrawingBrush.width = 40;
      canvas.freeDrawingBrush.color = "white";
    });

  //全クリアボタン
  document.getElementById("clear").addEventListener("click", () => {
    canvas.clear();
    canvas.setBackgroundColor(
      "rgba(255, 255, 255, 1)",
      canvas.renderAll.bind(canvas)
    );
  });

  // document.getElementById("drawing").addEventListener("click", function (e) {
  //   console.log(this.checked);
  //   if (this.checked) {
  //     document.getElementById("wrap-draw-area").style.display = "block";
  //   } else {
  //     document.getElementById("wrap-draw-area").style.display = "none";
  //   }
  // });

  //カーソル用のdivの位置をマウスに追従させる
  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    // "translate(" + e.clientX + "px, " + e.clientY + "px)";
  });

}