import Piece from './piece.js';

export default class Pawn extends Piece {
  constructor(player){
    super(player, (player === 1?  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
    this.initialPositions = {
      1: [6, 7, 8],
      2: [0, 1, 2]
    }
  }

  isMovePossible(src, dest, isDestEnemyOccupied){

    if(this.player === 1){
      if((dest === src - 3 && !isDestEnemyOccupied) || (dest === src - 6 && this.initialPositions[1].indexOf(src) !== -1)){
        return true;
      }
      else if(isDestEnemyOccupied && (dest === src - 4 || dest === src - 2)){
        return true;
      }
    }
    else if(this.player === 2){
      if((dest === src + 3 && !isDestEnemyOccupied) || (dest === src + 6 && this.initialPositions[2].indexOf(src) !== -1)){
        return true;
      }
      else if(isDestEnemyOccupied && (dest === src + 4 || dest === src + 2)){
        return true;
      }
    }
    return false;
  }

  getSrcToDestPath(src, dest){
    if(dest === src - 6){
      return [src - 3];
    }
    else if(dest === src + 6){
      return [src + 3];
    }
    return [];
  }
}
