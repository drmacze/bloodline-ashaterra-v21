let player = null;

window.onload = () => {
  const loginScreen = document.getElementById("loginScreen");
  const gameScreen = document.getElementById("gameScreen");
  const saved = localStorage.getItem("playerData");

  if (saved) {
    const p = JSON.parse(saved);
    if (p.guest && Date.now() - p.created > 86400000) {
      alert("⏰ Masa percobaan Guest sudah habis. Silakan login.");
      localStorage.removeItem("playerData");
      loginScreen.style.display = "block";
      gameScreen.style.display = "none";
    } else {
      player = p;
      startGame();
    }
  } else {
    loginScreen.style.display = "block";
    gameScreen.style.display = "none";
  }
};

document.getElementById("startBtn").addEventListener("click", () => {
  const pin = document.getElementById("pinInput").value;
  const method = document.querySelector('input[name="loginMethod"]:checked');
  if (!pin || !method) return alert("Masukkan PIN dan pilih metode login.");

  const loginType = method.value;
  const now = Date.now();

  let guestLimit = loginType === "guest" ? now + 86400000 : null;
  player = {
    username: loginType === "guest" ? "Guest_" + Math.floor(Math.random() * 1000) : loginType.toUpperCase() + "_User",
    loginType: loginType,
    pin: pin,
    created: now,
    guest: loginType === "guest",
    level: 1,
    exp: 0,
    gold: 100,
    inventory: [],
    skill: [],
    quests: [],
    id: "ID" + now.toString().slice(-6),
    referal: "REF" + Math.floor(Math.random() * 10000),
    hp: 100
  };

  localStorage.setItem("playerData", JSON.stringify(player));
  startGame();
});

function startGame() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("playerName").innerText = player.username;
  document.getElementById("playerId").innerText = "🆔 " + player.id;
  document.getElementById("playerLevel").innerText = "⭐ Lv. " + player.level;
  document.getElementById("playerGold").innerText = "💰 " + player.gold + " G";
  document.getElementById("playerReferal").innerText = "🔗 " + player.referal;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("playerData");
  location.reload();
});