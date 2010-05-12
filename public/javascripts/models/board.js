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

  id: function () {
    return this.attributes["_id"] || this.attributes["id"] || null;
  },

  loadNotes: function () {
    Note.clear()
    $.each(this.attributes['notes'] || [], function () {
      Note.add(new Note(JSON.parse(this)))
    })
  },

  toString: function () {
    var notes_json = []
    $.each(Note.all(), function () {
      notes_json.push(this.toString())
    })
    this.attributes['notes'] = notes_json
    return JSON.stringify(this.attr())
  }
});