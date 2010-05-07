var NoteTemplate = function (note) {
  this.html = $('#noteTemplate div.note').clone()
  this.html.addClass(note.attr('color'))
  this.html.attr('id', 'note_' + note.id())
  this.html.css({
    '-webkit-transform':'rotate(-' + note.attr('angle') + 'deg)',
    '-moz-transform':'rotate(-' + note.attr('angle') + 'deg)',
    'width': note.attr('w'),
    'height': note.attr('h'),
    'left': note.attr('x'),
    'top': note.attr('y')
  })

  this.html.find('form')
    .attr('action', '#/notes/' + note.id())

  this.html.find('a.delete')
    .attr('href', '#/notes/' + note.id() + '/delete')

  this.html.draggable({ 
    containment: 'parent', 
    opacity: 0.75
  })

  this.html.bind('dragstop', function (event, ui) {
    note.attr({
      x: ui.position.left,
      y: ui.position.top,
      w: $(this).width(),
      h: $(this).height()
    })
    note.save()
  })

  this.html.find('textarea')
    .attr('value', note.attr('text'))
    .width(note.attr('w') - 4)
    .height(note.attr('h') - 4)
    .blur(function () {
      $(this).parents('form').submit();
    })

}

// function generateNote(data){
//   var template = "<div id='note_"+ data._id + "' class='note'><div class='delete'>x</div><textarea class='textedit'>"+ data.text + "</textarea></div>";
//   template = $(template).addClass(data.color);
//   template = $(template).css({
//     '-webkit-transform':'rotate(-'+data.angle+'deg)',
//     '-moz-transform':'rotate(-'+data.angle+'deg)',
//     'min-width': data.w,
//     'min-height': data.h,
//     'left': data.x,
//     'top': data.y  
//   });
//   template.find("textarea").width(data.w - 4).height(data.h - 4);
//   // template.find("textarea").autoResize();
//   $('#notesContainer').append(template);
//   $('.note').draggable({ 
//     containment: 'parent', 
//     distance: 10, 
//     opacity: 0.75
//   });
//   $(template).bind( "dragstop", function(event, ui) {
//     var x = ui.position.left;
//     var y = ui.position.top;
//     var w = $(this).width();
//     var h = $(this).height();
//     $.ajax({type:"PUT", url:'/notes/'+data._id, data: JSON.stringify({'note':{'x':x,'y':y,'w':w,'h':h}})});
//   });
//   
// };