document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("selector-idioma");


    const reservationData = JSON.parse(localStorage.getItem("userReservations"));
    const username = localStorage.getItem("loggedInUser");
    let defaultLanguage = "es"; // Default de españól

    if (reservationData && username) {
        const userReservations = reservationData[username] || [];
        if (userReservations.length > 0) {
            // Poner el idioma de la reserva
            const latestReservation = userReservations[userReservations.length - 1];
            defaultLanguage = latestReservation.language || "es";
        }
    }

    // Cambiar el idioma si se seleccionó uno previamente en la reserva
    languageSelector.value = defaultLanguage;
    setLanguage(defaultLanguage);

    // Listener para el cambio de lenguaje
    languageSelector.addEventListener("change", function (event) {
        setLanguage(event.target.value);
    });

    // Cambio del idioma de la llamada
    function setLanguage(language) {
        let videoNAME = "";

        switch (language) {
            case "Português":
                videoNAME = "videos/video-pt.mp4";
                break;
            case "English":
                videoNAME = "videos/video-en.mp4";
                break;
            case "日本語":
                videoNAME = "videos/video-jp.mp4";
                break;
            case "Español":
            default:
                videoNAME = "videos/video-es.mp4";
                break;
        }

        const videoSRC = document.getElementById("video-source");
        const videollamada = document.getElementById("videollamada-directa");
        videoSRC.src = videoNAME;
        videollamada.load();
    }

    // Konami Code for Easter egg
    const konamiCode = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight", "b", "a"
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
