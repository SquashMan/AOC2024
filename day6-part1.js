var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://adventofcode.com/2024/day/6/input', false ); // false for synchronous request
    xmlHttp.send( null );
data = xmlHttp.responseText;
/*data = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`*/

grid = data.split('\n').map((row) => row.split(''))

directions = ['up', 'right', 'down', 'left', 'up'];
guardPos = [0,0];
guardDirection = 'up';
done = false
findGuard = function() {
	for (i = 0; i < grid.length; i++) {
  	index = grid[i].findIndex((col) => col === '^');
    if (index > -1) {
      guardPos[0] = i;
      guardPos[1] = index
    }
  }
}

changeDirection = function() {
	guardDirection = directions[directions.findIndex((dir) => dir === guardDirection)+1]
}

moveGuard = function() {
	switch(guardDirection) {
    case 'up':
      if (!grid[guardPos[0]-1]) {
				done = true
      } else if (grid[guardPos[0]-1][guardPos[1]] === '#') {
				changeDirection()
			} else {
        grid[guardPos[0]][guardPos[1]] = 'X'
				guardPos[0]--
      }
			break;
    case 'right':
      if (!grid[guardPos[0]][guardPos[1]+1]) {
				done = true
			} else if (grid[guardPos[0]][guardPos[1]+1] === '#') {
				changeDirection()
			} else {
        grid[guardPos[0]][guardPos[1]] = 'X'
				guardPos[1]++
      }
			break;
    case 'down':
      if (!grid[guardPos[0]+1]) {
				done = true
			} else if (grid[guardPos[0]+1][guardPos[1]] === '#') {
				changeDirection()
			} else {
        grid[guardPos[0]][guardPos[1]] = 'X'
				guardPos[0]++
      }
			break;
    case 'left':
      if (!grid[guardPos[0]][guardPos[1]-1]) {
				done = true
			} else if (grid[guardPos[0]][guardPos[1]-1] === '#') {
				changeDirection()
			} else {
        grid[guardPos[0]][guardPos[1]] = 'X'
				guardPos[1]--
      }
      break;
  }
}

findGuard()
for (i = 0; i < 10000; i++) {
  moveGuard()
}
result = grid.map((g) => g.join('')).join('');
console.log(result.match(/X/g).length+1)
