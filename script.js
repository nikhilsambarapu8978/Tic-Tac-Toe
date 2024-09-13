let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetGame = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("O", "X");
    box.disabled = false;
  });
  turnO = true;
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const checkWinner = () => {
  let isTie = true;
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  boxes.forEach(box => {
    if (box.innerText === "") {
      isTie = false;
    }
  });

  if (isTie) {
    showTie();
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showTie = () => {
  msg.innerText = "It's a Tie!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("O");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("X");
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
