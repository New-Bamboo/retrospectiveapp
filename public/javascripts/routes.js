app = $.sammy(function() {

  this.element_selector = 'body';

  this.bind('draw-board', function (event, current_board) {
    var board = $('#notesContainer')
    board.empty()
    $('#currentBoard').html(new BoardTemplate().html)
    $.each(Note.all(), function () {
      $('#notesContainer').append(new NoteTemplate(this).html)
    })
  })

  this.get('#/', function () {
    if (typeof current_board === 'undefined') {
      current_board = new Board ()
      current_board.save()
    };
    this.trigger('draw-board', current_board)
  })

  this.get('#/boards/:id', function () {
    var self = this
    Board.load_current(this.params['id'], function () {
      self.redirect('#/')
    })
  })

  this.put('#/notes/:id', function () {
    var note = Note.find(this.params['id'])
    note.attr('text', this.params.toHash()['text'])
    current_board.save()
    return false
  })

  this.get('#/notes/:id/delete', function () {
    var self = this;
    var note = Note.find(this.params['id'])
    note.destroy()
    current_board.save(function () {
      self.redirect('#/')
    })
  })

  this.get('#/notes/new/:colour', function () {
    var self = this
    var note = new Note ({
      'id'    : new Date().getTime(),
      'color' : self.params['colour'],
      'text'  : 'Click here to write', 
      'angle' : Math.random()*5,
      'w'     : 100,
      'h'     : 80,
      'x'     : 40,
      'y'     : 40
    })
    Note.add(note)
    current_board.save(function () {
      self.redirect('#/')
    })
  })
});