let player = {
  name: '',
  id: '',
  level: 1,
  exp: 0,
  gold: 100,
  guest: false,
  created: Date.now()
};

function login() {
  const name = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;
  if (name && pin.length === 4) {
    player.name = name;
    player.id = "ID-" + Math.floor(Math.random() * 100000);
    localStorage.setItem("playerData", JSON.stringify(player));
    startGame();
  } else {
    alert("Please enter name and 4-digit PIN");
  }
}

function loginAsGuest() {
  player.name = "Guest";
  player.id = "GUEST-" + Date.now();
  player.guest = true;
  player.created = Date.now();
  localStorage.setItem("playerData", JSON.stringify(player));
  startGame();
}

function startGame() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  const p = JSON.parse(localStorage.getItem("playerData"));
  if (p.guest && Date.now() - p.created > 86400000) {
    alert("Guest trial expired!");
    location.reload();
    return;
  }
  document.getElementById("playerName").textContent = p.name;
  document.getElementById("playerId").textContent = p.id;
  document.getElementById("playerLevel").textContent = p.level;
}

function enterBattle() {
  document.getElementById("gameContent").innerHTML = "⚔️ You entered a battle!";
}

function openInventory() {
  document.getElementById("gameContent").innerHTML = "🎒 Your inventory is empty (soon)";
}

function openShop() {
  document.getElementById("gameContent").innerHTML = "🛒 Shop is under construction!";
}

function viewQuests() {
  document.getElementById("gameContent").innerHTML = "📜 No quests yet!";
}

function exploreMinimap() {
  document.getElementById("gameContent").innerHTML = "🗺️ Exploring minimap...";
}

window.onload = () => {
  const saved = localStorage.getItem("playerData");
  if (saved) {
    const p = JSON.parse(saved);
    if (p.guest && Date.now() - p.created > 86400000) {
      alert("Guest trial expired!");
      localStorage.removeItem("playerData");
    } else {
      player = p;
      startGame();
    }
  }
};