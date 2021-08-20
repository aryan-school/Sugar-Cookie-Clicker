$(() => {
    //COOOKIIEEEEE
    daCookie.on("click", () => {
        if (gameInteractable){
            giveCookie()
        }
    })

    //shop

    bakerBuy.on("click", () => {
        if (gameInteractable){
            if (numCookies < 50){
                alert(`You need ${50 - numCookies} more cookies to get a baker, price is 50 cookies.`)
                return;
            }
            else if (numBakers >= 50){
                alert("Maximum bakers is 50.")
                return;
            }

            numCookies -= 50
            numBakers++
            updateLabels()

            alert("Purchase succesful!")
        }
    })

    boostBuy.on("click", () => {
        if (gameInteractable){
            if (numCookies < 200){
                alert(`You need ${200 - numCookies} more cookies to get a baker, price is 200 cookies.`)
                return;
            }
            else if (gameBoosted){
                alert("You can't buy this right now.")
            }

            gameBoosted = true

            effectTickTime = 1
            effectIncreaseAmount = 2
            $("body").css("background-image", "url(\"assets/background-boost.png\")")

            setInterval(() => {
                effectTickTime = 20
                effectIncreaseAmount = 1
                $("body").css("background-image", "url(\"assets/background.png\")")

                gameBoosted = false
            }, 1000 * 30);
        }
    })
})