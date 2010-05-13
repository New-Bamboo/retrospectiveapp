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
    current_board.save(function () {
      current_board.broadcast()
    })
  })

  this.html.find('textarea')
    .attr('value', note.attr('text'))
    .width(note.attr('w') - 4)
    .height(note.attr('h') - 4)
    .blur(function () {
      $(this).parents('form').submit();
    })

}