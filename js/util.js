/*resolves after the given time its so I can use it in async functions*/
function sleep(ms){
    return new Promise(res => {
        setTimeout(res, ms)
    })
}

//opening and closing menus

function openMenu(obj){
    return new Promise(async (res, rej) => {
        obj.css("display", "block")

        for (let i = 0; i <= 0.5; i += 0.01){
            await sleep(5)
            obj.css("background-color", `rgba(0,0,0,${i})`)
        }

        res()
    })
}

function closeMenu(obj){
    return new Promise(async (res, rej) => {
        for (let i = 0.5; i >= 0; i -= 0.01){
            await sleep(2)
            obj.css("background-color", `rgba(0,0,0,${i})`)
        }

        obj.css("display", "none")
        res()
    })
}


//user data saving

function saveToSave(cookieAmount, bakerAmount, rebirthAmount){
    //type checking
    if (typeof(cookieAmount) != 'number')
        throw new Error(`Type ${typeof(cookieAmount)} was sent for 'cookieAmount' instead of type number.`);
    
    if (typeof(bakerAmount) != 'number')
        throw new Error(`Type ${typeof(cookieAmount)} was sent for 'bakerAmount' instead of type number.`);

    if (typeof(rebirthAmount) != 'number')
        throw new Error(`Type ${typeof(cookieAmount)} was sent for 'rebirthAmount' instead of type number.`);

    //main saving process

    let serializedSaveData = encodeURI(btoa(JSON.stringify({cookies: cookieAmount, bakers: bakerAmount, rebirths: rebirthAmount})))

    document.cookie = `${save_cookie_name}=${serializedSaveData}`
}

function loadFromSave(){
    let decodedCookie = decodeURIComponent(document.cookie)
    decodedCookie = decodedCookie.split(";")


    var encodedSaveData;

    for (let i = 0; i < decodedCookie.length; i++){
        let indexCookie = decodedCookie[i].trim()

        if (indexCookie.startsWith(`${save_cookie_name}=`)){
            encodedSaveData = indexCookie.substring(indexCookie.indexOf(`=`) + 1, indexCookie.length)
            break;
        }
    }

    if (!encodedSaveData){
        return {cookies: 0, bakers: 0, rebirths: 0, newPlayer: true};
    }

    var parsedSave;

    try{
        encodedSaveData = decodeURI(encodedSaveData)
        encodedSaveData = atob(encodedSaveData)

        parsedSave = JSON.parse(encodedSaveData)
    }
    catch (er){
        console.log(`${save_cookie_name} was corrupted for some reason?? here is the error: ${er}`)

        saveToSave(0,0,0)
        parsedSave = {cookies: 0, bakers: 0, rebirths: 0, newPlayer: true};
    }

    return parsedSave
}