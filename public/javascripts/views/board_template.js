var BoardTemplate = function () {
  this.html = $('#boardTemplate').clone()
  this.html.find('h1').text('share this board: ' + window.location.href + 'boards/' + current_board.id())
}