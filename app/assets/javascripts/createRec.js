let fileIndex = [];
  // 登録済画像データだけの配列（DB用）
let delete_images =[];
  // 登録済みテキストエリア（DB用）
let delete_textarea =[];

  // ＜＜  呼び出し処理  ＞＞ーーーーーーーーーーーーーーーーー

  // groupを生成する関数
  const addgroup = (index) => {
    // テキストフォームの作成
    let groups = document.getElementsByClassName('js-file_group');
    let group = document.createElement('div');
    group.className = "js-file_group"
    group.id = `${index}`;

    group.appendChild(textareaImgViewCreate(index));
    group.appendChild(textareaPreviewCreate());
    group.appendChild(addinput(index));
    group.appendChild(groupbtn(groups, index));
    return group
  }

  // 画像を表示する要素を作成
  function textareaPreviewCreate() {
    let imageBox = document.createElement('div');
    let message = document.createElement('div');
    imageBox.className = "textarea-imageBox";
    message.className = "message";
    message.innerHTML = '<i class="fas fa-sad-tear"></i><p>No Image.</p>'
    let imgEl = `<img class="text-imagePreview" style="display:none"></img>`
    let videoEl = `<video class="text-imagePreview" contorols autobuffer style="display:none"></video>`
    imageBox.appendChild(message);
    imageBox.insertAdjacentHTML("beforeend", imgEl + videoEl)
    return imageBox
  }

  // textareaを生成する関数
  const addinput = (index) => {
    // テキストフォームの作成
    let input_data = document.createElement('textarea');
    input_data.className = "textareabox";
    input_data.required = "required";
    input_data.maxLength = "200";
    input_data.placeholder = "200文字まで";
    input_data.name = `recreation[explanations_attributes][${index}][recText]`;
    input_data.id = `recreation_explanations_attributes_${index}_recText`;
    return input_data
  }

  function groupbtn(groups, index) {
    // js-file_group--btnクラスの作成
    let groupBtn = document.createElement('div');
    groupBtn.className = "js-file_group--btn";
    groupBtn.appendChild(removeBtn(index));
    if (groups.length < 4) {
      groupBtn.appendChild(addBtn());
    };
    return groupBtn
  };


  // 追加ボタンを生成する関数
  function addBtn() {
    // テキストフォームの作成
    let addbtn = document.createElement('div');
    addbtn.className = "recbtn";
    addbtn.id = "js-add";
    const text = document.createTextNode("+");
    addbtn.addEventListener('click', btnClick, false);
    addbtn.appendChild(text);
    return addbtn
  };


  // 削除ボタンを生成する関数
  function removeBtn(index) {
    // テキストフォームの作成
    let removebtn = document.createElement('div');
    removebtn.className = "recbtn js-remove";
    removebtn.id = `remove${index}`;
    removebtn.addEventListener('click', btnClick, false);
    const text = document.createTextNode("−");
    removebtn.appendChild(text);
    return removebtn
  }

  // 画像を追加するボタンを作成
  function textareaImgViewCreate(index) {
    let imageAdd = document.createElement('div');
    let textareaImageBtn = document.createElement('div');
    let textareaImgAdd = document.createElement('div');
    let label = document.createElement('label');
    let textBox = document.createElement('input');
  
    imageAdd.className = "image-add";
    textareaImageBtn.className = "textareaImageBtn";
    textareaImgAdd.className = "textareaImgAdd textareaImageBtn--item";
    label.htmlFor = `recreation_explanations_attributes_${index}_imgurl`;
    
    textBox.type = "file";
    textBox.className = "filebox"
    textBox.accept = ".png,.jpg,.gif";
    textBox.name = `recreation[explanations_attributes][${index}][imgurl]`
    textBox.id = `recreation_explanations_attributes_${index}_imgurl`
    textBox.style.display = "none";
    textBox.addEventListener('change', textareaImageView, false);
    
    label.innerHTML = '<p>画像追加</p>'
    label.appendChild(textBox);
    textareaImgAdd.appendChild(label);
    textareaImageBtn.appendChild(textareaImgAdd);
    imageAdd.appendChild(textareaImageBtn);
    return imageAdd
  }

  // 削除ボタン作成
  function imgDeleteBtn(target) {
    if (target.querySelector('.textareaImgDel') != null) return false;
    let delBtn = document.createElement('div');
    delBtn.className = "textareaImgDel textareaImageBtn--item"
    delBtn.textContent = "削除"
    delBtn.addEventListener('click', textareaImgHidden, false);
    return delBtn;
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


    // 画像変更ボタン
    function removeBtn(index) {
      // テキストフォームの作成
      let removebtn = document.createElement('div');
      removebtn.className = "recbtn js-remove";
      removebtn.id = `remove${index}`;
      removebtn.addEventListener('click', btnClick, false);
      const text = document.createTextNode("−");
      removebtn.appendChild(text);
      return removebtn
    }

  // フェードアウトの処理
  function fadeOut(parent, duration) {
    parent.style.opacity = 1;

    var start = performance.now();
    
    requestAnimationFrame(function tick(timestamp) {
      // イージング計算式（linear）
      var easing = (timestamp - start) / duration;
  
      // opacityが0より小さくならないように
      parent.style.opacity = Math.max(1 - easing, 0);
      // イージング計算式の値が1より小さいとき
      if (easing < 1) {
        requestAnimationFrame(tick);
      } else {
        parent.style.opacity = '';
        parent.style.display = 'none';
      }
    });
  };

// Delete配列にIDを追加
  function addDelete() {
    el = event.target
    if (el.className == "recbtn js-remove"){
      delete_textarea.push(el.dataset.index);
    }else if(el.className == "textareaImgDel textareaImageBtn--item"){
      delete_images.push(el.dataset.index);
    };
  };
  
  // フェードイン
  function fadeIn(node, duration) {
    // display: noneでないときは何もしない
    if (getComputedStyle(node).display !== 'none') return;
    
    // style属性にdisplay: noneが設定されていたとき
    if (node.style.display === 'none') {
      node.style.display = '';
    } else {
      node.style.display = 'block';
    }
    node.style.opacity = 0;
  
    let start = performance.now();
    
    requestAnimationFrame(function tick(timestamp) {
      // イージング計算式（linear）
     let easing = (timestamp - start) / duration;
        // opacityが1を超えないように
      node.style.opacity = Math.min(easing, 1);
      // opacityが1より小さいとき
      if (easing < 1) {
        requestAnimationFrame(tick);
      } else {
        node.style.opacity = '';
      }
    });
  };


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

// ＜＜ クリック時のメイン処理 ＞＞ーーーーーーーーーーーーーーーーー
  function btnClick() {
    // イベント発火した要素を取得
    el = event.target
    // ボタンの親クラスを取得
    let groupBtn = el.parentNode;
    // ボタンの親クラスの親を取得
    parent = groupBtn.parentNode;
    // js-file_groupクラスを全て取得
    let groups = document.getElementsByClassName('js-file_group');
    // 追加ボタンの場合>>
    if (el.id == "js-add") {
      el.remove();
      if (groups.length == 1) {
        groupBtn.appendChild(removeBtn(groups[0].id));
      };

      let addHTML = addgroup(fileIndex[0])
      textForm.appendChild(addHTML);
      // フェードイン処理
      fadeIn(addHTML, 300);

      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)

    // 削除ボタンの場合>>
    } else if(el.className == "recbtn js-remove") {
      fadeOut(parent, 300);
      setTimeout( function() {
        parent.remove();
        let groups = document.getElementsByClassName('js-file_group');
        let addbtn = document.getElementById("js-add");
        let removebtn = document.getElementsByClassName("js-remove");
        if (addbtn === null) {
          let groupBtn = groups[groups.length-1].getElementsByClassName("js-file_group--btn");
          groupBtn[0].appendChild(addBtn());
          groupBtn[0].style.display = 'none';
          fadeIn(groupBtn[0], 50);
        };
        if (groups.length == 1) {
          removebtn[0].remove();
        };
      },400);

    };
  };

  function textareaImageView() {
    e = event.target
    let imageBox = (e.closest('.js-file_group')).querySelector('.textarea-imageBox');
    let delbtn
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
    delbtn = imgDeleteBtn(e.closest('.textareaImageBtn'))
    if ( delbtn ) {
      e.closest('.textareaImageBtn').appendChild(delbtn);
    }
    // 1枚だけ表示する
    textareafile = e.files[0];
    // 画像表示する要素を格納
    let preview = setElement(imageBox, textareafile)
    if (preview === false) return false;
    selectImage(preview, textareafile)
    imageBox.style.display="block";
  };



window.onload = function(){
  // あそび編集ページ読み込み時
  let index = []
  let group = document.getElementsByClassName('js-file_group');
  let textareaImg = document.getElementsByClassName('textarea-imageBox');
  let textareaImageBtn = document.getElementsByClassName('textareaImageBtn');
  let delbtn

  if(document.URL.match(/recreations\/\d{1,}\/edit/)) {
    // value値を格納
    for( let i = 0; i < group.length; i++ ) {
      index.push(document.getElementById('recreation_explanations_attributes_' + i + '_id').value);
      if (textareaImg[i].style.display == "block") {
        textareaImg[i].dataset.index = index[i];
        delbtn = imgDeleteBtn(textareaImageBtn[i])
        delbtn.addEventListener('click', addDelete, false);
        delbtn.dataset.index = index[i]
        textareaImageBtn[i].appendChild(delbtn);
      };
    };
  };

  if(document.URL.match(/recreations\/\d{1,}\/edit/) || document.URL.match(/recreations\/new/)) {
    let fileBox = document.getElementsByClassName('textareaFilebox');
    let deletebtn = document.getElementsByClassName('textareaImgDel');
    let groupbtn = document.getElementsByClassName('js-file_group--btn');

    // ボタンにイベントをセット
    for( let i = 0; i < fileBox.length; i++ ) {
      fileBox[i].addEventListener('change', textareaImageView, false);
    };
    for( let i = 0; i < deletebtn.length; i++ ) {
      deletebtn[i].addEventListener('click', textareaImgHidden, false);
    };

    // グループにふるIDのセット
    if (group.length > 1) {
      for( let i = 0; i < 4; i++ ) {
        fileIndex.push(group.length+i);
      };

      // 追加、削除ボタンのセット
      let groupCount = group.length
      for( let i = 0; i < groupCount; i++ ) {
        removebtn = removeBtn(group[i].id);
        removebtn.dataset.index = index[i]
        removebtn.addEventListener('click', addDelete, false);
        groupbtn[i].appendChild(removebtn);
        if( (i+1) == groupCount && i < 4) {
          groupbtn[i].appendChild(addBtn());
        };
      };
    } else {
      fileIndex.splice(0, 0, 1, 2, 3, 4);
      groupbtn[0].appendChild(addBtn());
    };
  };
};

function backBtnClick() { 
  let backURL = document.referrer;
  window.location.href = backURL;
};



