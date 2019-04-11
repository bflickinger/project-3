<div className="board">
<button id="btn0" className="empty">♟</button>
<button id="btn1" className="button">♟</button>
<button id="btn2" className="empty">♟</button>
<button id="btn3" className="button"> </button>
<button id="btn4" className="empty"> </button>
<button id="btn5" className="button"> </button>
<button id="btn6" className="empty">♙</button>
<button id="btn7" className="button">♙</button>
<button id="btn8" className="empty">♙</button>
<p className="txt">Player: 0 Computer: 0</p>
<button className="button long hide hide"></button>
</div>


createBtns = () => {
    // console.log('createBtns has been called');
    let b, d = document.createElement("div"), x = document.getElementById("hexa"), v = false, tempPlayBtn = "", tempScore = "";
    // console.log("hexa :",x);
    d.className += "board";
    x.appendChild(d);
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            b = document.createElement("button");
            b.id = "btn" + (i + j * 3);
            b.i = i; b.j = j;
            // b.addEventListener("click", btnHandle, false);
            b.appendChild(document.createTextNode(""));
            d.appendChild(b);
            if (v) b.className = "button"
            else b.className = "empty";
            v = !v;
        }
    }
    tempPlayBtn = document.createElement("button");
    tempPlayBtn.className = "button long hide";
    tempPlayBtn.addEventListener("click", this.restart, false);
    tempScore = document.createElement("p");
    tempScore.className = "txt";
    d.appendChild(tempScore);
    d.appendChild(tempPlayBtn);
    // updateScore();
};