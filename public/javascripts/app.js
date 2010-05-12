$(document).ready(function() {
  app.run('#/');
});

function generateBoardId() {
  return [
    colours[Math.floor(Math.random() * colours.length)],
    animals[Math.floor(Math.random() * animals.length)],
    Math.floor(Math.random() * 100)
  ].join('-')
}

var colours = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'brown',
  'white',
  'black',
  'grey',
  'gold',
  'silver',
  'orange',
  'indigo',
  'mauve'
]

var animals = [
  'tiger',
  'lion',
  'ant',
  'beetle',
  'hippo',
  'spider',
  'aardvark',
  'giraffe',
  'elephant',
  'shark',
  'sparrow',
  'falcon',
  'kestral',
  'baboon',
  'lama',
  'camel',
  'adder',
  'wasp',
  'worm',
  'fox',
  'elephant',
  'rhino'
]