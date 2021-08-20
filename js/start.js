$(() => {
    let mainGame = $("#mainGame")
    let startMenu = $("#mainMenuScreen")
    let startButton = $("#mainMenuStartBtn")

    var startMenuStartBtn = false;
    
    (async () => {
        await sleep(2000)
        await openMenu(startMenu)

        startMenuStartBtn = true

        startButton.on("click", async () => {
            if (!startMenuStartBtn)
                return;
            
            startMenuStartBtn = false

            await closeMenu(startMenu)
            startGame()
        })
    })();
})