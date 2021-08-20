const save_cookie_name = "cc_save"
let msg = $("#msg");

$(() => {
    if (loadFromSave().rebirths < 7){
        location.replace("main.html")
    }

    (async () => {
        await sleep(2100)

        msg.text("Congrats on beating the game!")
        await tweenIn()

        await sleep(2500)

        await tweenOut()
        msg.text("I hope you liked my final assignment")
        await tweenIn()

        await sleep(2500)

        await tweenOut()
        msg.text("From Aryan")
        await tweenIn()

        await sleep(2500)

        await tweenOut()
        saveToSave(0, 0, 0)
        msg.text("Your stats have been reset so you can play the game again, you will be redirected now.")
        await tweenIn()

        await sleep(5000)

        location.replace("main.html")
    })();
})

//functions

function tweenIn(){
    return new Promise(async res => {
        for (let i = 0; i <= 1; i+=0.01){
            await sleep(10)
            msg.css("opacity", i)
        }

        res()
    })
}

function tweenOut(){
    return new Promise(async res => {
        for (let i = 1; i >= 0; i-=0.01){
            await sleep(10)
            msg.css("opacity", i)
        }

        res()
    })
}