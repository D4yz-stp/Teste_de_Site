// mutable variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Arm"];
let monsterLevel;
let monsterName;

// Non-mutable variables
const button1_store = document.querySelector("#button1");
const button2_cave = document.querySelector("#button2");
const button3_dragon = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText  = document.querySelector("#goldText");
const monsterStatus = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "Arm",
        power: 5
    },
    {
        name: "Stick",
        power: 30
    },
    { 
        name: "Fação",
        power: 50
    },
    {
        name:"Argumentos",
        power:100
    }
];
const monsters = [
    {
        name: "Alvinho",
        lvl: 1,
        health: 20
    },
    {
        name: "Elton",
        lvl: 8,
        health: 60
    },
    {
        name: "Fishengon",
        lvl: 18,
        health: 140
    },
    {
        name: "Dragon",
        lvl: 30,
        health: 500
    }
];


const locations = [
    {
        name: "Town Square",
        "button text": [
            "Go to Store" , "Go to Cave" , "Fight Dragon"
        ],
        "button functions": [goStore, goCave, fightDragon],
        text: "U are in the town Square. U see the direction of the \"Store\""
    },
    {
        name: "Store",
        "button text" : [ 
            "Buy 10 health ( 10 gold )", "Buy Weapon ( 30 gold )", "Go to Town Square"
        ],
        "button functions" : [buyHealth , buyWeapon, goTown],
        text: "U enterred the Store"
    },
    {
        name: "Cave",
        "button text" : [ 
            "fight Alvinho", "fight Elton", "fight Big Fat Peixe"
        ],
        "button functions" : [fightAlvinho , fightElton, fightFish],
        text: "U enterred the Store"
    },
    {
        name: "Fight",
        "button text" : [
            "Attack", "DOdge" , "Run"
        ],
        "button functions" : [ attack , dodge, run],
        text : "U are fighting right now lil bro"
    },
    {
        name: "Kill Monster",
        "button text" : [
            "Go to the Town" , "Go to the Town" , "Go to the Town"
        ],
        "button functions" : [goTown , goTown, goTown],
        text: function(){ return "U defeated the monster " + monsterName;}
    },
    {
        name: "Death",
        "button text" : [
            "Replay" , "Replay" , "Replay"
        ],
        "button functions" : [Replay , Replay, Replay],
        text: 'Imagine being this bad, i will be laughing by here... in matter of fact i think even i could beat ur ass'
    },
    {
        name: "WinGame",
        "button text" : [
            "Replay" , "Replay" , "Replay"
        ],
        "button functions" : [Replay , Replay, Replay],
        text: 'I was gonna jump u, but nahh, u kinda good lil bro'
    }
];
// initialize buttons
button1_store.onclick = goStore;
button2_cave.onclick = goCave;
button3_dragon.onclick = fightDragon;
//Functions
function update(location) {
    if(monsterHealth <=0){
        monsterStatus.style.display = "none";
    }
    button1_store.innerText = location["button text"][0];
    button2_cave.innerText = location["button text"][1];
    button3_dragon.innerText = location["button text"][2];
    button1_store.onclick = location["button functions"][0];
    button2_cave.onclick = location["button functions"][1];
    button3_dragon.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown(){
    update(locations[0]);
}
function goStore(){
    update(locations[1]);

}
function goCave(){
    update(locations[2]);
}
function run(){
    monsterStatus.style.display = "none";
    update(locations[0]);
}
function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
        health.innerText = health;
    }
    else{
        text.innerText = "U poor thief Dog!"
    }
}
function buyWeapon(){
    if(currentWeapon < weapons.length - 1 ){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "U have a new weapon, a "+newWeapon + "\n";
            inventory.push[newWeapon];
            text.innerText+= "And u now have it in ur inventory"
        }
        else{
            text.innerText = "U poor thief Dog!"
        }
    }
    else{
        text.innerText= "U already have the Strongest Weapon! U can sell it though";
        button2_cave.innerText = "15 Gold";
        button2_cave.onclick = sellWeapon;
        
    }
}
function sellWeapon(){
    if(inventory.length > 1){
        gold+= 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "U just sold a " + currentWeapon + ".";
        text.innerText = "U now Have "+ inventory;
    }
    else{
        text.innerText = "U cannot sell ur DAMN ARM lmao";
    }
}
function fightDragon(){
    fighting = 3;
    gofight();
}
function fightAlvinho(){
    fighting = 0;
    gofight();
    
}
function fightElton(){
    fighting = 1;
    gofight();
}
function fightFish(){
    fighting = 2;
    gofight();
}
function gofight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterLevel = monsters[fighting].lvl;
    monsterName = monsters[fighting].name;

    monsterStatus.style.display = "block";
    monsterNameText.innerText = monsterName;
    monsterHealthText.innerText = monsterHealth;

}
function attack(){
    for(let i = 0; i < 1; i++){
        text.innerText = "The " + monsterName + " attacks. \n";
        if(isMonsterHit()){
            text.innerText += "You attack it with your " +weapons[currentWeapon].name;
            health -= monsterLevel + Math.floor(Math.random() * xp) +1;
            healthText.innerText = health;
            if(health <=0){
                lose();
                break;
            }
            if(Math.random() < 0.05 && inventory.length > 1){
                text.innerText+= "\n Bro, sadly ur "+inventory[currentWeapon].name + " was destroyed becouse u used it to much or had unlucky";~
                inventory.pop();
                currentWeapon--;
            }
        }
        
        monsterHealth -= weapons[currentWeapon].power;
        monsterHealthText.innerText = monsterHealth;
        if(monsterHealth <=0 ){
            (fighting == 4) ? winGame() : defeatMonster();
        }
    }

}
function isMonsterHit(){
    return (Math.random() > 0.15 || health < 20);
}
function dodge(){
    text.innerText = "You fricking dodge the fucking fuck attack of the fucking "+ monsterName + " What a fuck sake great fucking thing ";
}

function defeatMonster(){
    gold += Math.floor( monsterLevel * 6.7);
    xp += monsterLevel;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update( locations[4]);
}
function lose(){
    update(locations[5]);
}
function Replay(){
    monsterStatus.style.display = "none";
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = ["Arm"];
    monsterLevel;
    monsterName;

    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown();
}
function winGame(){
    update(locations[6]);
}


