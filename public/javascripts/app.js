$(document).ready(function(){
  jsEnvironments = {
    'retrospectiveapp.local': 'development',
    'retrospectiveapp.heroku.com': 'production'  
  };
  jsEnv = jsEnvironments[document.location.host];
  server = new Pusher('c9f08e8c50f6f0cfb136', 'retrospectiveapp-'+jsEnv);
    
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
    var id = $(this).parent()[0].id.split("_")[1];
    $.ajax({type:"DELETE", url:'/notes/'+id+'.json'});
  });

  $('textarea').live('blur', function(){
    if (this.value == ""){
      this.value = "Click here to write";
    }
    var id   = $(this).parent()[0].id.split("_")[1];
    var text = this.value
    $.ajax({type:"PUT", url:'/notes/'+id+'.json', data: {'text':text}});
    
  });
  
  $.get('/notes.json', function(data){
    $.each(data, function(index,value){
      generateNote(value);
    });
  });
    
  function generateNote(data){
    var template = "<div id='note_"+ data.id + "' class='note'><div class='delete'>x</div><textarea class='textedit'>"+ data.text + "</textarea></div>";
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
    $(template).bind( "dragstop", function(event, ui) {
      var x = ui.position.left;
      var y = ui.position.top;
      var w = $(this).width();
      var h = $(this).height();
      $.ajax({type:"PUT", url:'/notes/'+data.id+'.json', data: {'x':x,'y':y,'w':w,'h':h}});
    });
    
  };
  
  function updateNote(data){
    var note = $("#note_" + data.id);
    xx = $(note).find("textarea")[0].value = data.text;
    note.css({
      'min-width': data.w,
      'min-height': data.h,
      'left': data.x,
      'top': data.y
    });
  };
  
  server.bind('note-create', function(note) {
    generateNote(JSON.parse(note));
  });

  server.bind('note-destroy', function(data) {
    $("#note_"+JSON.parse(data).id).remove();
  });
  
  server.bind('note-update', function(note) {
    updateNote(JSON.parse(note));
  });

  server.bind('note-softupdate', function(note) {
    updateNote(JSON.parse(note));
  });
  
});