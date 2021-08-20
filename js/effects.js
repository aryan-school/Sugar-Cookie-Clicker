var effectTickTime = 20;
var effectIncreaseAmount = 1;
$(() => {
    let body = $("body")

    let x = 0;
    let y = 0;

    (async () => {
        while (true){
            if (x < -1000){
                x = 0
                y = 0
            }

            await sleep(effectTickTime)

            x -= effectIncreaseAmount
            y -= effectIncreaseAmount

            body.css("background-position", `${x}px ${y}px`)
        }
    })();
})