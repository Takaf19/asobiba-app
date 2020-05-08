<template>
  <div class="allRecShow__contents">
    <!-- テスト用 -->
    <div class="card_item" :id="'card' + index" v-for="(rec, index) in recreations" :key="index" v-show="true">
      <a :href="'/recreations/' + rec.id" class="card_item--flame" :id=" 'flame' + index">
        <div class="imagebox" :id=" 'imgbox' + index">
          <video
            :src="rec.recimage.url"
            autobuffer
            controls
            class="item--preview"
            v-if="setImageType(rec.recimageType)"
          />
          <img v-bind:id=" 'front' + index" class="image_b" :src="rec.recimage.url" v-else />
          <div class="imagebox--bookmark">
            <i class="fas fa-star"></i>
            {{rec.bookmark}}
          </div>
        </div>
        <div class="contents" :id="'contents' + index">
          <div class="contents__title">
            <p class="contents__title--item item-title">{{rec.recname}}</p>
            <div class="required">
              <p class="contents__title--item item-human">
                <i class="fas fa-user-circle"></i>
                {{rec.requirednumber}}
              </p>
              <p class="contents__title--item item-time">
                <i class="fas fa-clock"></i>
                {{rec.rectime}}
              </p>
            </div>
          </div>
          <div class="contents__textbox">{{rec.recComment}}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["recreations"],
  updated() {
    this.rotationAnimationLoop();
  },
  watch: {
    recreations: function () {
      this.rotationAnimationLoop();
    },
  },
  methods: {
    setImageType: function(image) {
      if (image == "画像") {
        return false;
      } else {
        return true;
      }
    },
    // ページ表示時の処理----
    rotationAnimationLoop() {
      //画像データ取得
      var width = $(".card_item--flame").width();
      var height = $(".card_item--flame").height();
      var margin = width / 2;

      // 初期化処理
      $(".card_item *").removeAttr("style");
      $(".card_item--flame").css({
        opacity: "0"
      });

      for (let i = 0; i < $(".card_item--flame").length; i++) {
        //始動！ 2秒ごとに処理を実行
        window.setTimeout(
          function() {
            $("#flame" + (i)).stop().animate({
              opacity: "1"
            },{ duration: 100 });

            window.setTimeout(function() {
              this.startAnimation(width, height, margin, i );
            }.bind(this),100 * i);
          }.bind(this),50 * i
        );
      }
    },

    startAnimation(width, height, margin, id) {
      $("#flame" + id)
        .stop()
        .animate(
          {
            width: "0px",
            height: "" + height + "px",
            marginLeft: "" + margin + "px",
            opacity: "0.5"
          },
          { duration: 100 }
        );
      window.setTimeout(function() {
        $("#flame" + id)
          .stop()
          .animate(
            {
              width: "" + width + "px",
              height: "" + height + "px",
              marginLeft: "0px",
              opacity: "1"
            },
            {
              duration: 100,
              complete: function() {
                //jQueryで直書きされたstyleを初期化。
                $("#flame" + id).removeAttr("style");
              }
            }
          );
        // 画像とコメント部分表示
        $("#imgbox" + id).css({
          opacity: "1"
        });
        $("#contents" + id).css({
          opacity: "1"
        });
      }, 50);
    },
  },
};

</script>


<style scoped>

.allRecShow__contents {
  height: calc(100vh - 145px);
  max-width: 1300px;
  overflow: scroll;
  display: flex;
  justify-content: center;
  margin-right: auto;
  flex-wrap: wrap;
}
/* レスポンシブ（最終行のみ左寄せ） */
.allRecShow__contents:before {
  content: "";
  display: block;
  height: 0;
  order: 1;
  width: 310px;
  height: 10px;
}
.allRecShow__contents:after {
  content: "";
  display: block;
  height: 0;
  order: 1;
  width: 620px;
  height: 10px;
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
  margin: 0 5px 5px;
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
  content: "";
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
  animation: bottomAnim 1s ease-out 0.75s infinite;
}
.card_item--flame:hover:before {
  animation: rightAnim 1s ease-out 0s infinite;
}
.card_item--flame:hover:after {
  animation: topAnim 1s ease-out 0.75s infinite;
}

/* 各アニメーション */
@keyframes topAnim {
  0% {
    top: -300px;
  }
  100% {
    top: 300px;
  }
}
@keyframes bottomAnim {
  0% {
    bottom: -300px;
  }
  100% {
    bottom: 300px;
  }
}
@keyframes rightAnim {
  0% {
    right: -300px;
  }
  100% {
    right: 300px;
  }
}
@keyframes leftAnim {
  0% {
    left: -300px;
  }
  100% {
    left: 300px;
  }
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

.imagebox--bookmark {
  position: absolute;
    top: 0;
    left: 0px;
  z-index: 9;
  color:rgb(56, 55, 55);
  padding: 0 10px;
  text-shadow: 1px 2px white;
  background: rgba(247, 247, 250, 0.7);
  border-radius: 0px 0px 3px 0px;
}


.imagebox--bookmark > i {
  color: gold;
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