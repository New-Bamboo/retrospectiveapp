app = $.sammy(function() {

  this.element_selector = 'body';

  this.bind('run', function () {
    var self = this
    $.getJSON('/notes', function (notes_json) {
      $.each(notes_json, function () {
        Note.add(new Note(this))
      })
      self.trigger('draw-notes', Note.all())
    })
  })

  this.bind('draw-notes', function (event, notes) {
    var board = $('#notesContainer')
    board.empty()
    $.each(notes, function () {
      $('#notesContainer').append(new NoteTemplate(this).html)
    })
  })

  this.get('#/', function () {
    this.trigger('draw-notes', Note.all())
  })

  this.put('#/notes/:id', function () {
    var note = Note.find(this.params['id'])
    note.attr('text', this.params.toHash()['text'])
    note.save()
    return false
  })

  this.get('#/notes/:id/delete', function () {
    var self = this;
    var note = Note.find(this.params['id'])
    note.destroy(function () {
      Note.remove(note.id())
      self.redirect('#/')
    })
  })

  this.get('#/notes/new/:colour', function () {
    var self = this
    var note = new Note ({
      'color' : self.params['colour'],
      'text'  : 'Click here to write', 
      'angle' : Math.random()*5,
      'w'     : 100,
      'h'     : 80,
      'x'     : 40,
      'y'     : 40
    })
    note.save(function () {
      self.redirect('#/')
    })
  })
});