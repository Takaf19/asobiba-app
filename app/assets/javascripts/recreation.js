function selectImage(e) {
  if ( e == null ) { return false}
  // 1枚だけ表示する
  let file = e.files[0];
  // ファイルリーダー作成
  var fileReader = new FileReader();
  // 画像表示する要素を格納
  let preview = (e.parentNode).querySelector('img');

  // 画像表示の処理
  fileReader.onload = function() {
    // Data URIを取得
    var dataUri = this.result;
    // img要素に表示
    preview.src = dataUri;
  };
  // ファイルをData URIとして読み込む
  fileReader.readAsDataURL(file);
};


