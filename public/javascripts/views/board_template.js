var BoardTemplate = function () {
  this.html = $('#boardTemplate').clone()
  this.html.find('h1').text('share this board: ' + current_board.location())

}