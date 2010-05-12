var BoardTemplate = function () {
  this.html = $('#boardTemplate').clone()
  this.html.find('h1').text('current board: ' + current_board.id())
}