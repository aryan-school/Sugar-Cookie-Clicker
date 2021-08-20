//GAME VARS
var tipsRunning = false;


function controlAll(tip1, tip2, tip3, removeBtn, control){
    control(tip1)
    control(tip2)
    control(tip3)

    if (removeBtn)
        control(removeBtn)
}

async function tips(){
    let tip1 = $("#tip1")
    let tip2 = $("#tip2")
    let tip3 = $("#tip3")
    let removeTips = $("#removeTips")

    controlAll(tip1, tip2, tip3, removeTips, tip => tip.css("display", "block"))

    tipsRunning = true;

    while (tipsRunning){
        await sleep(3000)

        controlAll(tip1, tip2, tip3, null, tip => tip.css("opacity", "0"))

        await sleep(300)

        controlAll(tip1, tip2, tip3, null, tip => tip.css("opacity", "1"))
    }
}

$(() => {
    let removeTips = $("#removeTips")

    removeTips.on("click", () => {
        if (tipsRunning){
            
            removeTips.off();
            tipsRunning = false
    
            controlAll(tip1, tip2, tip3, removeTips, tip => tip.remove())
        }
    })
})