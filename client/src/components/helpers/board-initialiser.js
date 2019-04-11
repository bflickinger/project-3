import Pawn from '../pieces/pawn.js';

export default function initialiseChessBoard(){
  const squares = Array(9).fill(null);

  for(let i = 0; i < 3; i++){
    squares[i] = new Pawn(2);
    squares[i+6] = new Pawn(1);
  }
  
  return squares;
}