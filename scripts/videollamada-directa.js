document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("selector-idioma")
        .addEventListener("change", function (event) {
            setLanguage(event.target.value);
        });

    function setLanguage(language) {
        let videoNAME = "";

        switch (language) {
            case "pt":
                console.log("Cambiando idioma de videollamada a: portugués");
                videoNAME = "videos/video-pt.mp4";
                break;
            case "en":
                console.log("Cambiando idioma de videollamada a: inglés");
                videoNAME = "videos/video-en.mp4";
                break;
            case "jp":
                console.log("Cambiando idioma de videollamada a: japonés");
                videoNAME = "videos/video-jp.mp4";
                break;
            case "es":
            default:
                console.log("Cambiando idioma de videollamada a: español");
                videoNAME = "videos/video-es.mp4";
                break;
        }
        const videoSRC = document.getElementById("video-source");
        const videollamada = document.getElementById("videollamada-directa");
        videoSRC.src = videoNAME;
        videollamada.load();
    }
    const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];
    let userInput = [];

    document.addEventListener("keydown", (event) => {
        userInput.push(event.key);

        // Keep the user input array at the length of the Konami code
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }

        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            console.log("Konami code entered!");
            playEasterEggVideo();
            userInput = []; // Reset after successful input
        }
    });

    function playEasterEggVideo() {
        console.log("Playing Easter egg video");
        const videoSRC = document.getElementById("video-source");
        const videollamada = document.getElementById("videollamada-directa");
        videoSRC.src = "videos/easter-egg.mp4";
        videollamada.load();
        videollamada.play();
    }
});
