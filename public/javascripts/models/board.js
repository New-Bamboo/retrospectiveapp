Board = Model("board", {
  persistence: Model.RackJSONPersistence('/boards'),

  load_current: function (id, callback) {
    $.getJSON('/boards/' + id, function (board_json) {
      current_board = new Board(board_json[0])
      current_board.loadNotes()
      callback()
    })
  }
}, {

  broadcast: function () {
    $.ajax({
      type: 'POST',
      url: '/pusher/' + this.id() + '?event=board-update&socket_id=' + socket_id,
      data: this.toString()
    })
  },

  id: function () {
    return this.attributes["_id"] || this.attributes["id"] || null;
  },

  loadNotes: function () {
    Note.collection = []
    $.each(this.attributes['notes'] || [], function () {
      Note.add(new Note(JSON.parse(this)))
    })
  },

  location: function () {
    return window.location.href + 'boards/' + this.id()
  },

  toString: function () {
    var notes_json = []
    $.each(Note.all(), function () {
      this.save()
      notes_json.push(this.toString())
    })
    this.attributes['notes'] = notes_json
    return JSON.stringify(this.attr())
  }
});