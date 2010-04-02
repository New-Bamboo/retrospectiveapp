$(document).ready(function(){
  $('.note').draggable({ 
    containment: 'parent', 
    distance: 10, 
    opacity: 0.75
  });
  
  $('.addNote').click(function(){
    var text = "<div class='note'><div class='delete'>x</div><textarea class='textedit'>Click here to write</textarea></div>";
    text = $(text).addClass(this.className.split(' ')[1]);
    var degree = Math.random()*5;
    text = $(text).css({'-webkit-transform':'rotate(-'+degree+'deg)'});
    text = $(text).css({'-moz-transform':'rotate(-'+degree+'deg)'});
    $('#notesContainer').append(text);
    $('.note').draggable({ 
      containment: 'parent', 
      distance: 10, 
      opacity: 0.75
    });    
  });
  
  $('textarea').live('focus', function(){
    if (this.value == "Click here to write"){
      this.value = "";
    }
  });
  
  $('.delete').live('click', function(){
    $(this).parent().remove();
  });

  $('textarea').live('blur', function(){
    if (this.value == ""){
      this.value = "Click here to write";
    }
  });
  
});