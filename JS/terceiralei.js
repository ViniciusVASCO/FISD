let ball1 = document.getElementById("ball1");
let ball2 = document.getElementById("ball2");
let force1 = document.getElementById("force1");
let force2 = document.getElementById("force2");

let vel1Text = document.getElementById("vel1");
let vel2Text = document.getElementById("vel2");
let mom1Text = document.getElementById("mom1");
let mom2Text = document.getElementById("mom2");
let totalMomentumText = document.getElementById("total-momentum");

let mass1Value = document.getElementById("mass1-value");
let mass2Value = document.getElementById("mass2-value");
let mass1Text = document.getElementById("mass1");
let mass2Text = document.getElementById("mass2");

let slider1 = document.getElementById("slider1");
let slider2 = document.getElementById("slider2");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");

let pos1 = 20, pos2 = 80;
let v1 = 0, v2 = 0;
let m1 = 1, m2 = 1;
let running = false;
let interval;

function updateDisplay() {
  ball1.style.left = pos1 + "%";
  ball2.style.left = pos2 + "%";
  vel1Text.textContent = v1.toFixed(2);
  vel2Text.textContent = v2.toFixed(2);
  mom1Text.textContent = (v1 * m1).toFixed(2);
  mom2Text.textContent = (v2 * m2).toFixed(2);
  totalMomentumText.textContent = (v1*m1 + v2*m2).toFixed(2);
}

function collision() {
  const newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);

  const force = Math.abs(m1 * (newV1 - v1));
  force1.textContent = `F = ${force.toFixed(1)}N →`;
  force2.textContent = `← F = ${force.toFixed(1)}N`;
  force1.style.left = pos1 + "%";
  force2.style.left = pos2 + "%";
  force1.classList.remove("hidden");
  force2.classList.remove("hidden");

  setTimeout(() => {
    force1.classList.add("hidden");
    force2.classList.add("hidden");
  }, 1000);

  v1 = newV1;
  v2 = newV2;
}

function startSimulation() {
  if (running) return;
  running = true;
  v1 = 3;
  v2 = -2;
  interval = setInterval(() => {
    pos1 += v1 * 0.5;
    pos2 += v2 * 0.5;

    if (pos1 <= 5) { v1 = -v1 * 0.8; pos1 = 5; }
    if (pos2 >= 95) { v2 = -v2 * 0.8; pos2 = 95; }

    if (Math.abs(pos1 - pos2) < 5 && v1 > 0 && v2 < 0) collision();
    updateDisplay();
  }, 50);
}

function resetSimulation() {
  running = false;
  clearInterval(interval);
  pos1 = 20; pos2 = 80;
  v1 = 0; v2 = 0;
  updateDisplay();
}

slider1.oninput = () => {
  m1 = parseFloat(slider1.value);
  mass1Value.textContent = m1.toFixed(1);
  mass1Text.textContent = m1.toFixed(1);
  ball1.textContent = m1.toFixed(1);
};

slider2.oninput = () => {
  m2 = parseFloat(slider2.value);
  mass2Value.textContent = m2.toFixed(1);
  mass2Text.textContent = m2.toFixed(1);
  ball2.textContent = m2.toFixed(1);
};

startBtn.onclick = startSimulation;
resetBtn.onclick = resetSimulation;

updateDisplay();
