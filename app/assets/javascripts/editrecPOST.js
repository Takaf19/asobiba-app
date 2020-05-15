$(function() {
  $(document).on('submit', "#recEditForm", function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr('action')
    formData.append("delete_textarea", delete_textarea);
    formData.append("delete_images", delete_images);

    $.ajax({ 
      type: 'PATCH',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      window.location.href = "/recreations/" + data.id;
    })
    .fail(function(){
      alert('error');
    })
  });
});