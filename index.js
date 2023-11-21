const Square = (x, y, pred) => {
  const name = [x, y];
  pred = pred || null;
  return {name, pred}
}

const knightMoveXY = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
const knightMoves = (start, end, queue = []) => {
  if (!start.pred) start = Square(start[0], start[1]);
  const possibleMoves = [];
  if (JSON.stringify(start.name) == JSON.stringify(end)) {
    queue.length = 0;
    const path = [];
    while (start !== null) {
      path.unshift(start.name);
      start = start.pred;
    }
    console.log(`The shortest path was ${path.length} moves!`);
    console.log('The moves were:');
    path.forEach(move => console.log(move));
    return;
  }
  knightMoveXY.forEach((knightMove) => {
    const arr = [start.name[0] + knightMove[0], start.name[1] + knightMove[1]];
    if (arr.every(isValidMove)) {
      const square = Square(arr[0], arr[1], start);
      possibleMoves.push(square);
    }
  });
  possibleMoves.forEach(move => queue.push(move));
  while (queue.length > 0) {
    const current = queue[0];
    queue.shift();
    knightMoves(current, end, queue);
  }
}

const isValidMove = (move) => move >= 0 && move < 8;

