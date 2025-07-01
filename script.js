let player = null;
let trialStart = null;
const maxTrialTime = 86400000; // 1 day in ms

const avatars = ["🧙", "🧝", "🧛", "🧞", "🧟", "🧚"];
let selectedAvatar = null;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function generatePlayerID() {
  return "ASH-" + Math.floor(Math.random() * 90000 + 10000);
}

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function login() {
  const name = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;
  if (!name || pin.length !== 4) return alert("Masukkan nama dan PIN 4 digit.");
  player = {
    name,
    id: generatePlayerID(),
    ref: generateReferralCode(),
    avatar: null
  };
  showAvatarSelection();
}

function guestLogin() {
  player = {
    name: "Guest",
    id: "GUEST-" + Date.now(),
    ref: "TRIAL",
    avatar: null
  };
  trialStart = Date.now();
  showAvatarSelection();
}

function socialLogin(method) {
  alert(`🔐 Login dengan ${method} belum tersedia di versi demo.`);
}

function showAvatarSelection() {
  showScreen("avatar-selection");
  const container = document.getElementById("avatars");
  container.innerHTML = "";
  avatars.forEach((a, i) => {
    const btn = document.createElement("div");
    btn.className = "avatar-option";
    btn.textContent = a;
    if (i < 3 || player.name === "Guest") {
      btn.onclick = () => {
        document.querySelectorAll(".avatar-option").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedAvatar = a;
      };
    } else {
      btn.style.opacity = 0.3;
      btn.title = "🔒 Terkunci";
    }
    container.appendChild(btn);
  });
}

function confirmAvatar() {
  if (!selectedAvatar) return alert("Pilih avatar terlebih dahulu.");
  player.avatar = selectedAvatar;
  startGame();
}

function startGame() {
  document.getElementById("playerName").innerText = `${player.avatar} ${player.name}`;
  document.getElementById("playerID").innerText = player.id;
  document.getElementById("referralCode").innerText = player.ref;
  showScreen("main-menu");
}

function showStatus() {
  alert(`📊 ${player.name}\n🆔 ${player.id}\n🎭 Avatar: ${player.avatar}\n🎁 Referral: ${player.ref}`);
}

function startBattle() {
  if (player.name === "Guest" && Date.now() - trialStart > maxTrialTime) {
    alert("❌ Masa trial guest telah habis. Silakan login akun untuk lanjut.");
    logout();
    return;
  }
  alert("🎮 Memulai battle... (fitur akan dikembangkan)");
}

function logout() {
  player = null;
  trialStart = null;
  showScreen("login-screen");
}