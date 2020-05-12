<template>
  <div id="mainContents">
    <div id="recCreate">
      <div class="title">
        あそび情報の入力
        <i class="fas fa-pencil-alt"></i>
      </div>
      <form accept-charset="UTF-8">
        <div class="field">
          <div class="field--label">
            <label clas="reclabel" for="recreation_recimage">タイトル画像/動画</label>
            <span class="require">必須</span>
            <p>(アップロード可能: jpeg png mov mp4)</p>
            <p>※ブラウザにより動画が表示/再生されない場合があります。</p>
          </div>
          <label for="recreation_recimage">
            <div class="imageBox">
              <div class="message">
                <i class="fas fa-sad-tear"></i>
                <p>No Image.</p>
              </div>
              <img class="file-preview" />
              <video autobuffer controls="controls" class="file-preview"></video>
              <input @change="onDrop" required="required" onchange="titleImageView(this)" type="file"
                     name="recreation[recimage]" id="recreation_recimage" class="filebox" />
            </div>
          </label>
        </div>

        <div class="field">
          <div class="field--label">
            <label clas="reclabel" for="recreation_recname">あそび名</label>
            <span class="require">必須</span>
          </div>
          <input placeholder="20文字まで" required="required" maxlength="20" type="text"
                 name="recreation[recname]" id="recreation_recname" class="textbox titlebox" />
        </div>

        <div class="field">
          <div class="field--label">
            <label clas="reclabel" for="recreation_recComment">どんなあそび？</label>
            <span class="require">必須</span>
          </div>
          <textarea placeholder="200文字まで" required="required" maxlength="200" name="recreation[recComment]"
                    id="recreation_recComment" class="textareabox commentbox" ></textarea>
        </div>

        <div class="field">
          <div class="field--label selectBox">
            <label clas="reclabel" for="recreation_requirednumber_id">必要人数</label>
            <span class="require">必須</span>
            <br />
            <select name="recreation[requirednumber_id]" id="recreation_requirednumber_id">
              <option value="1">1人</option>
              <option value="2">2人</option>
              <option value="3">3人</option>
              <option value="4">4人</option>
              <option value="5">5人</option>
              <option value="6">5 ~ 10人</option>
              <option value="7">無制限</option>
            </select>
          </div>
        </div>

        <div class="field">
          <div class="field--label">
            <label clas="reclabel" for="recreation_rectime_id">必要時間</label>
            <span class="require">必須</span>
            <br />
            <select name="recreation[rectime_id]" id="recreation_rectime_id">
              <option value="1">1分以内</option>
              <option value="2">5分以内</option>
              <option value="3">10分以内</option>
              <option value="4">30分以内</option>
              <option value="5">1時間以内</option>
              <option value="6">1時間以上</option>
            </select>
          </div>
        </div>

        <div id="textForm" class="field">
          <div class="field--label">
            <label clas="reclabel" for="recreation_rectime_id">あそび方説明</label>
            <span class="require">必須</span>
            <p>最大５つまで追加可能です。</p>
          </div>
          <div id="0" class="js-file_group">
            <div class="textarea-imageBox">
              <div class="message">
                <i class="fas fa-sad-tear"></i>
                <p>No Image.</p>
              </div>
              <img class="text-imagePreview" style="display: none;" />
              <video autobuffer contorols class="text-imagePreview" style="display: none;"></video>
            </div>
            <textarea placeholder="200文字まで" required="required" maxlength="200"
                      name="recreation[explanations_attributes][0][recText]" id="recreation_explanations_attributes_0_recText" class="textareabox" ></textarea>
            <div class="js-file_group--btn">
              <div id="js-add" onclick="btnClick()" class="recbtn">+</div>
            </div>

            <div class="image-add">
              <div class="textareaImageBtn">
                <div class="textareaImgAdd textareaImageBtn--item">
                  <label for="recreation_explanations_attributes_0_image_attributes_imgurl">
                    <p>画像追加</p>
                    <input onchange="textareaImageView()" maxlength="200" type="file"
                           name="recreation[explanations_attributes][0][image_attributes][imgurl]"
                           id="recreation_explanations_attributes_0_image_attributes_imgurl"
                           class="filebox" style="display: none;"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" name="commit" value="登録する" data-disable-with="登録する" class="submit recFormBtn" />
        <br />
        <button type="button" onclick="backBtnClick()" class="back recFormBtn">戻る</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function() {
      return {
        recreation: {
          recname: '',
          recimage: '',
          publisher: '',
          genre: ''
        }
      }
    },
    methods: {
      createBook: function () {
        if (!this.recreation.recname) return;
        axios.post('/api/books', { book: this.recreation }).then((res) => {
          this.$router.push({ path: '/' });
        }, (error) => {
          console.log(error);
        });
      },
      onDrop:function(event){
        this.recreation.recimage = event.target.files
      }   
    }
  }
</script>
