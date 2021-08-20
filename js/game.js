/*Game controller*/

//DOM objects
let daCookie = $("#daCookie")
let mainGame = $("#mainGame")
let bakerBuy = $("#bakerBuy")
let boostBuy = $("#boostBuy")
let cookieAmountLabel = $("#cookieAmountLabel")
let rebirthAmountLabel = $("#rebirthAmountLabel")
let bakerAmountLabel = $("#bakerAmountLabel")

//GAME VARS
const save_cookie_name = "cc_save"

var numCookies = undefined;
var numBakers = undefined;
var numRebirths = undefined;

var tipsRunning = false;
var gameInteractable = false;
var gameBoosted = false;

async function startGame(){
    let playerSave = loadFromSave()

    numBakers = playerSave.bakers
    numCookies = playerSave.cookies
    numRebirths = playerSave.rebirths

    if (numRebirths >= 7){
        location.replace("winner.html")
    }

    updateLabels()
    autoSave()
    cookieEffect()
    startBakerWork()

    await openMenu(mainGame)
    gameInteractable = true

    if (playerSave.newPlayer){
        alert("Because you are new, read the cyan text for info and then press remove tips when your done.")
        tips()
    }
}

async function startBakerWork(){
    while (true){
        await sleep(1000)

        for (let i = 0; i < numBakers; i++){
            giveCookie()
        }
    }
}

async function cookieEffect(){
    while (true){
        for (let i = 0; i < 360; i++){
            await sleep(10)
            daCookie.css("transform", `rotate(${i}deg)`)
        }
    }
}


async function autoSave(){
    while (true){
        await sleep(1000 * 4)
        
        try{
            saveToSave(numCookies, numBakers, numRebirths)
            console.log("Autosave succesful")
        }
        catch(er){
            console.log(`Autosave failed, error: ${er}`)
        }
    }
}

function updateLabels(){
    cookieAmountLabel.text(`Cookies: ${numCookies}`)
    rebirthAmountLabel.text(`Rebirths: ${numRebirths}/7`)
    bakerAmountLabel.text(`Bakers: ${numBakers}`)
}

function giveRebirth(){
    if (numCookies >= 1000){
        numCookies = 0
        numBakers = 0
        numRebirths++
        
        if (numRebirths >= 7){
            saveToSave(0, 0, 7)
            location.replace("winner.html")
        }
        else{
            alert("Congradulations you are on the next rebirth!")
            updateLabels()
        }
    }
}

function giveCookie(){
    gameBoosted ? numCookies += 4 : numCookies++

    if (numCookies >= 1000){
        giveRebirth()
    }

    updateLabels()
}