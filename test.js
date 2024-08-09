let a = document.querySelectorAll(".box");
let player = true;
let msg = document.querySelector(".msg");
const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

a.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (player) {
      box.innerText = "X";
      box.classList.add("neon-red");
      player = false;
    } else {
      box.innerText = "O";
      box.classList.add("neon-blue");
      player = true;
    }
    box.disabled = true;
    checkwin();
  });
});

const checkwin = () => {
  for (const pattern of winpattern) {
    const [pos1, pos2, pos3] = pattern;
    const pos1Val = a[pos1].innerText;
    const pos2Val = a[pos2].innerText;
    const pos3Val = a[pos3].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      msg.innerText = `${pos1Val} is the winner!`;

      // Apply the appropriate neon effect based on the winner
      if (pos1Val === "X") {
        msg.className = "msg-neon-red";
      } else {
        msg.className = "msg-neon-blue";
      }

      a.forEach((box) => (box.disabled = true)); // Disable all boxes after a win
      return;
    }
  }

  if ([...a].every((box) => box.innerText !== "")) {
    msg.innerText = "It's a draw!";
    msg.className = ""; // Reset to default styling
  }
};

let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  a.forEach((box) => {
    box.innerText = "";
    box.classList.remove("neon-red", "neon-blue");
    box.disabled = false;
  });
  msg.innerText = "";
  player = true;
});
