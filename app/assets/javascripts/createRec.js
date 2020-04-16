let fileIndex = [1, 2, 3, 4];

  // ＜＜  呼び出し処理  ＞＞ーーーーーーーーーーーーーーーーー

  // groupを生成する関数
  const addgroup = (index) => {
    // テキストフォームの作成
    let groups = document.getElementsByClassName('js-file_group');
    let group = document.createElement('div');
    group.className = "js-file_group"
    group.id = `${index}`;
    group.style.display = 'none'
    group.appendChild(addinput(index));
    group.appendChild(groupbtn(groups, index));
    return group
  }

  // inputを生成する関数
  const addinput = (index) => {
    // テキストフォームの作成
    let input_data = document.createElement('textarea');
    input_data.className = "textareabox";
    input_data.required = "required";
    input_data.maxlength = "200";
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
  }
  
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
  }


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
