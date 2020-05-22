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


// フラッシュメッセージスライドアップで隠す
$(function() {
  setTimeout("$('.notifications').slideUp('slow')", 4000);
});
// if(document.URL.match("recreations/new")){

// ローディング処理
  $(function() {
    var h = $(window).height();
    $('#main').css('display','none');
    $('#loader-bg ,#loader').height(h).css('display','block');
  });
    
  $(window).load(function () { //全ての読み込みが完了したら実行
      $('#loader-bg').delay(300).fadeOut(200);
      $('#loader').delay(400).fadeOut(200);
      $('#main').css('display', 'block');
  });
    
  //20秒たったら強制的にロード画面を非表示
  $(function(){
    setTimeout('stopload()',20000);
  });
    
  function stopload(){
    $('#main').css('display','block');
    $('#loader-bg').delay(600).fadeOut(500);
    $('#loader').delay(400).fadeOut(200);
  }
