<template>
  <div class="allRecShow">
    <div class="allRecShow__contents">
      <!-- テスト用 -->
      <div class="card_item" :id="'card' + n" v-for="n of 20" :key="n" v-show="true">
        <a :href="'/recreations/' + recreations[0].id" class="card_item--flame" :id=" 'flame' + n">
          <div class="imagebox" :id=" 'imgbox' + n">
            <img v-bind:id=" 'front' + n" class="image_b" :src='recreations[0].recimage.url' />
          </div>
          <div class="contents" :id="'contents' + n">
            <div class="contents__title">
              <p class="contents__title--item item-title">{{recreations[0].recname}}</p>
              <div class="required">
                <p class="contents__title--item item-human">
                  <i class="fas fa-user-circle"></i>
                  {{recreations[0].requirednumber}}
                </p>
                <p class="contents__title--item item-time">
                  <i class="fas fa-clock"></i>
                  {{recreations[0].rectime}}
                </p>
              </div>
            </div>
            <div class="contents__textbox">
              {{recreations[0].recComment}}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from "axios";
  export default {
    data: function() {
      return {
        recreations: [],
      };
    },
    created: function() {
      this.fetchallRecreations();
    },
    updated() {
      this.rotationAnimationLoop();
    },
    methods: {
      fetchallRecreations() {
        axios.get("/api/recreations/allNewRec").then(
          res => {
            for (let i = 0; i < res.data.recreations.length; i++) {
              this.recreations.push(res.data.recreations[i]);
            };
          },
          error => {
            console.log(error);
          }
        );
      },
      rotationAnimationLoop() {
        //画像データ取得
        var width = $(".card_item--flame").width();
        var height = $(".card_item--flame").height();
        var margin = width/2;

        $(".card_item--flame").css({
              opacity: '0',
        });

        for (let i = 0; i < $(".card_item--flame").length; i++) {
          //始動！ 2秒ごとに処理を実行
          window.setTimeout(function(){
            $("#flame" + (i+1)).stop().animate({
              opacity: "1"
            },{ duration: 100 });
            window.setTimeout(function(){
              this.startAnimation(width, height, margin, i+1);
            }.bind(this), 200 + 50 * i+1); 
          }.bind(this), 1000 + 200 * i+1); 
        };

      },
      startAnimation(width, height, margin, id) {
          $("#flame" + id).stop().animate({
            width: "0px",
            height: "" + height + "px",
            marginLeft:''+margin+'px',
            opacity: "0.5"
          },{ duration: 100 });
          window.setTimeout(function() {
            $("#flame" + id).stop().animate({
              width: "" + width + "px",
              height: "" + height + "px",
              marginLeft:'0px',
              opacity: "1"
            },{ duration: 100,
              complete:function(){
                //jQueryで直書きされたstyleを初期化。
                $("#flame" + id).removeAttr('style');
            }});
            // 画像とコメント部分表示
            $("#imgbox" + id).css({
              opacity: '1',
            });
            $("#contents" + id).css({
              opacity: '1',
            });
          }, 50);
      },
    },
  };
</script>

<style scoped>
.allRecShow {
  padding: 30px;
}
.allRecShow__contents {
  max-width: 1300px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
}
/* レスポンシブ（最終行のみ左寄せ） */
.allRecShow__contents:before{
    content:"";
    display:block;
    width: 310px;
    height:0;
    order:1;
  }

.image_b {
  position: absolute;
   left: 0px;
   top: 0px;
  z-index: 2;
  height: 100%;
  width: 100%;
}

.card_item {  
  text-align: left;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  width: 300px;
  height: 300px;
  max-height: 300px;
  position: relative;
  overflow: hidden;
}

.card_item--flame {
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  height: 100%;
  width: 100%;
  display: block;
  text-decoration: none;
  backdrop-filter: blur(12px);
}

/* 線(ボーダー)のスタイル 共通 */
.card_item:before,
.card_item:after,
.card_item--flame:before,
.card_item--flame:after {
    content: '';
    position: absolute;
    z-index: 9;
}

/* 下のボーダー */
.card_item:before {
    bottom: 0px;
    left: -300px;
    width: 300px;
    height: 2px;
    background: rgba(125, 203, 255, 0.747); /*線の色*/
}
/* 右のボーダー */
.card_item:after {
    bottom: -300px;
    right: 0;
    width: 2px;
    height: 300px;
    background: rgba(125, 203, 255, 0.747); /*線の色*/
}
/* 上のボーダー */
.card_item--flame:before {
    top: 0;
    right: -300px;
    width: 300px;
    height: 2px;
    background: rgba(125, 203, 255, 0.747); /*線の色*/
}
/* 左のボーダー */
.card_item--flame:after {
    top: -300px;
    left: 0;
    width: 2px;
    height: 300px;
    background: rgba(125, 203, 255, 0.747); /*線の色*/
}

/* ホバー時のアニメーション指定 */
.card_item:hover:before {
    animation: leftAnim 1s ease-out 0s infinite;
}
.card_item:hover:after {
    animation: bottomAnim 1s ease-out .75s infinite;
}
.card_item--flame:hover:before {
    animation: rightAnim 1s ease-out 0s infinite;
}
.card_item--flame:hover:after {
    animation: topAnim 1s ease-out .75s infinite;
}

/* 各アニメーション */
@keyframes topAnim {
    0% {top:-300px;}
    100% {top:300px;}
}
@keyframes bottomAnim {
    0% {bottom:-300px;}
    100% {bottom:300px;}
}
@keyframes rightAnim {
    0% {right:-300px;}
    100% {right:300px;}
}
@keyframes leftAnim {
    0% {left:-300px;}
    100% {left:300px;}
}

.imagebox {
  height: 50%;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  background: rgba(125, 125, 126, 0.8);
  opacity: 0;
}

.contents {
  opacity: 0;
  height: 100%;
}

.contents__title {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 0.7em;
  background-color: rgba(42, 42, 43, 0.6);
  color: white;
}

/* 最初の要素のみ左寄せ */
.contents__title--item:first-child {
  margin-right: auto;
}
.item-title {
  font-size: 1rem;
}

.contents__textbox {
    background-color: rgba(252, 252, 253, 0.5);
    height: 100%;
    padding: 5px;
    font-size: 0.8em;
    color: rgb(56, 55, 55);
}


.card_item--flame > .imagebox img {
  border: 0px;
}

</style>