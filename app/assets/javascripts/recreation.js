let titlefile = null
let textareafile = null

// 画像表示する要素を格納
function setElement(target, file) {
  const targetImg = (target).querySelector('img');
  const targetVideo = (target).querySelector('video');
  if (file.type.match(/image/)) {
    targetImg.style.display="block";
    targetVideo.style.display="none";
    return targetImg

  } else if (file.type.match(/video/)) {
    targetImg.style.display="none";
    targetVideo.style.display="block";
    return targetVideo

  } else {
    return false
  }
}


function selectImage(preview, file) {
  // ファイルリーダー作成
  let fileReader = new FileReader();
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

// 削除ボタン作成
function deleteBtn(target) {
  if (target.querySelector('.textareaImgDel') != null) return false;
  let delBtn = document.createElement('div');
  delBtn.className = "textareaImgDel textareaImageBtn--item"
  delBtn.textContent = "削除"
  delBtn.addEventListener('click', textareaImgHidden, false);
  target.appendChild(delBtn);
}

// テキストエリアの画像表示非表示
function textareaImgHidden() {
  e = event.target
  imgTarget = (e.closest('.js-file_group')).querySelector('img');
  imgAddBtn = (e.parentNode).querySelector('p')
  fileBox = (e.parentNode).querySelector('.filebox')

  fileBox.value = "";
  imgTarget.src = "";
  (imgTarget.parentNode).style.display = "none";
  imgAddBtn.textContent = "画像追加"
  e.remove();
}

// イベント ---------------------------------------------
function titleImageView(e) {
  let imgBox = (e.parentNode).querySelector('img');
  let videoBox = (e.parentNode).querySelector('img');
  if ( e == null ) { 
    return false
  } else if(e.files.length == 0) {
    imgBox.src = ""
    videoBox.src = ""
    e.value = "";
    imgBox.style.display="none";
    videoBox.style.display="none";
    return false
  }
  // 1枚だけ表示する
  titlefile = e.files[0];
  // 画像表示する要素を格納
  let preview = setElement(e.parentNode, titlefile)
  if (preview === false) return false;
  selectImage(preview, titlefile)
};


function textareaImageView() {
  e = event.target
  let imageBox = (e.closest('.js-file_group')).querySelector('.textarea-imageBox');
  if ( e == null ) { 
    imageBox.style.display="none";
    return false
  } else if (e.files.length == 0) {
    const targetImg = imageBox.querySelector('img');
    targetImg.src = ""
    targetImg.style.display="none";
    return false
  }
  
  // 画像追加 ＞ 画像変更 にする。
  (e.parentNode).querySelector('p').textContent = '画像変更';
  // 削除ボタンの追加
  deleteBtn(e.closest('.textareaImageBtn'));
  // 1枚だけ表示する
  textareafile = e.files[0];
  // 画像表示する要素を格納
  let preview = setElement(imageBox, textareafile)
  if (preview === false) return false;
  selectImage(preview, textareafile)
  imageBox.style.display="block";
}

// フラッシュメッセージスライドアップで隠す
// jQuery(function(){
//   setTimeout("jQuery('.notifications').slideUp('slow')", 4000) 
// })
// if(document.URL.match("recreations/new")){

// }
// function scrollRecTab() {
//   let element = event.target.parentNode; // 移動させたい位置の要素を取得
//   // let rect = element.getBoundingClientRect();
//   // let position = rect.top;    // 一番上からの位置を取得
//   element.scrollIntoView({
//     behavior: "smooth", 
//     block: "center" 
//   });
// };
