$(function(){
  console.log(last_message_id)
  if ( message.image ) {
       var html =
          `<div class= "message-date__log">
            <div class= "user">
              ${message.user_name}
            </div>
            <div class= "date">
              ${message.created_at}
            </div>
          </div>  
          <div class="message-date__comment">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >`
      return html;
    } else {
      var html =
      ` <div class="message-date__log">
          <div class="user">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-date__comment">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>`
     return html;
    };
   
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.send-btn').removeAttr('data-disable-with');
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax ({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-date').append(html);
      $('.message-date').animate({ scrollTop: $('.message-date')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("error");
    });
  };
  })
 });