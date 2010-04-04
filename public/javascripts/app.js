$(document).ready(function(){
  server = new Pusher('c9f08e8c50f6f0cfb136', 'retrospectiveapp-development');
    
  $('.addNote').click(function(){
    $.post('/notes.json', {
      'color' : this.className.split(' ')[1], 
      'text'  : 'Click here to write', 
      'angle' : Math.random()*5,
      'w'     : 100,
      'h'     : 80,
      'x'     : 40,
      'y'     : 40
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
  
  $.get('/notes.json', function(data){
    $.each(data, function(index,value){
      generateNote(value);
    });
  });
  
  function generateNote(data){
    var template = "<div class='note'><div class='delete'>x</div><textarea class='textedit'>"+ data.text + "</textarea></div>";
    template = $(template).addClass(data.color);
    template = $(template).css({
      '-webkit-transform':'rotate(-'+data.angle+'deg)',
      '-moz-transform':'rotate(-'+data.angle+'deg)',
      'min-width': data.w,
      'min-height': data.h,
      'left': data.x,
      'top': data.y  
    });
    $('#notesContainer').append(template);
    $('.note').draggable({ 
      containment: 'parent', 
      distance: 10, 
      opacity: 0.75
    });
  };
  
  server.bind('note-create', function(note) {
    generateNote(JSON.parse(note));
  });
  
});