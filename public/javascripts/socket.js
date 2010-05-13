function startSockets () {
  var socketServer = new Pusher('8ebcdcaa1f1cee3ff93e', current_board.id())

  socketServer.bind('connection_established', function(event){
    socket_id = event.socket_id
  });

  socketServer.bind('board-update', function (board_attributes) {
    current_board.merge(board_attributes)
    current_board.loadNotes()
    app.trigger('draw-board', current_board)
  })
}