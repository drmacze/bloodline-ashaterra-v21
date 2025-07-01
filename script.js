// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
let player = {
  name: "Hero",
  level: 1,
  exp: 0,
  maxExp: 100,
  hp: 100,
  atk: 10,
  def: 5,
  gold: 100,
  inventory: { potion: 1 }
};

function log(text) {
  document.getElementById("log").textContent += text + "\n";
}

function updateStatus() {
  const s = player;
  document.getElementById("status").innerHTML =
    `👤 ${s.name} | ⭐ Lv.${s.level} | ❤️ ${s.hp} | ⚔️ ${s.atk} | 🛡️ ${s.def} | 💰 ${s.gold}`;
}

function startBattle() {
  const enemy = { name: "Goblin", hp: 30, atk: 8 };
  log(`⚔️ Battle started vs ${enemy.name}`);
  while (enemy.hp > 0 && player.hp > 0) {
    enemy.hp -= player.atk;
    player.hp -= Math.max(0, enemy.atk - player.def);
  }
  if (player.hp > 0) {
    player.exp += 30;
    player.gold += 20;
    log("🏆 Victory! +30 EXP, +20 Gold");
    levelUp();
  } else {
    player.hp = 100;
    log("💀 You lost! Respawned with 100 HP.");
  }
  updateStatus();
}

function levelUp() {
  while (player.exp >= player.maxExp) {
    player.exp -= player.maxExp;
    player.level++;
    player.maxExp = Math.floor(player.maxExp * 1.25);
    player.hp += 20;
    player.atk += 3;
    player.def += 2;
    log(`⭐ Leveled up to Lv.${player.level}!`);
  }
}

function viewStatus() {
  updateStatus();
  log("📊 Status viewed.");
}

function openShop() {
  if (player.gold >= 50) {
    player.gold -= 50;
    player.inventory.potion++;
    log("🛒 Bought Potion (+1)");
  } else {
    log("❌ Not enough gold for potion.");
  }
  updateStatus();
}

function useInventory() {
  if (player.inventory.potion > 0) {
    player.hp += 50;
    player.inventory.potion--;
    log("🧪 Used Potion (+50 HP)");
  } else {
    log("🎒 No potions left.");
  }
  updateStatus();
}

window.onload = updateStatus;
