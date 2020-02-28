$(function(){
  var buildHTML = function(message){
    if ( message.content && message.image ) {
      var html =
        `<div class= "message-date__log" data-message-id= "${message.id}" >
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
          <img src="${message.image}" class="image" >
        </div>
      </div>`
        } else if (message.content){
        var html =
         `<div class="message-date__log" data-message-id= ${message.id}>
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
      } else if (message.image) {
        var html = 
          `<div class="message-date__log" data-message-id= "${message.id}">
           <div class="user">
              ${message.user_name} 
            </div> 
            <div class="date">
              ${message.created_at }
            </div>
          </div>
          <div class="message-date__comment">
            <img src="${message.image}" class="image">
         </div>
        </div>`
      };
      return html;
    };
    
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messages){
      let html = buildHTML(messages);
      $('.message-date').append(html);
      $('#new_message')[0].reset();
    })
    .always(function(){
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("error");
    });
  });
  var reloadMessages = function(){
    var last_message_id = $('.message-date:last').data("message-id");
    $.ajax ({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
     if (messages.length !==0) {
      var insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });
      $('.message-date').append(insertHTML);
      $('.message-date').animate({scrollTop: $('.message-date')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
 });