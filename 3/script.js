document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // Envelope Opening Animation
    // ===============================

    function openEnvelope() {

        const envelope = document.querySelector(".envelope");

        if (!envelope) return;

        envelope.classList.add("open");

        setTimeout(() => {

            document.getElementById("envelopeContainer").style.display = "none";

            const letter = document.querySelector(".letter");

            if (letter) {
                letter.style.display = "block";
            }

            startLetterExperience();

        }, 1200);
    }


    // ===============================
    // Letter Typing Animation
    // ===============================

    function startTyping() {

        const letter = document.querySelector(".letter-write");

        if (!letter) return;


        const walker = document.createTreeWalker(
            letter,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );


        const textNodes = [];

        let node;


        while ((node = walker.nextNode())) {

            if (node.textContent.trim() !== "") {

                textNodes.push({
                    node: node,
                    text: node.textContent
                });

                node.textContent = "";
            }
        }


        let nodeIndex = 0;
        let charIndex = 0;

        const speed = 40;


        function type() {

            if (nodeIndex >= textNodes.length) {

                // After typing completes
                setTimeout(() => {

                    showMemorySection();

                }, 20);

                return;
            }


            const current = textNodes[nodeIndex];


            current.node.textContent +=
                current.text.charAt(charIndex);


            charIndex++;


            if (charIndex < current.text.length) {

                setTimeout(type, speed);

            } else {

                nodeIndex++;
                charIndex = 0;

                setTimeout(type, speed);
            }
        }


        setTimeout(type, 500);
    }



    // ===============================
    // Video Controls
    // ===============================

    function playVideos() {

        const video1 = document.getElementById("v1");
        const video2 = document.getElementById("v2");
        audio = document.querySelector("#audio");
        audio.play()


        if (video1) {

            setTimeout(() => {

                video1.style.display = "block";

                video1.play()
                    .catch(err => console.log(err));

            }, 1000);
        }



        if (video2) {

            setTimeout(() => {

                video2.style.display = "block";

                video2.play()
                    .catch(err => console.log(err));

            }, 11000);
        }
    }



    // ===============================
    // Floating Hearts Animation
    // ===============================

    function startHearts() {

        const hearts = [
            "❤️",
            "💖",
            "💕",
            "💗",
            "💘",
            "💝"
        ];


        function createHeart() {

            const heart = document.createElement("div");


            heart.className = "floating-heart";


            heart.innerHTML =
                hearts[
                Math.floor(Math.random() * hearts.length)
                ];


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.fontSize =
                (18 + Math.random() * 20) + "px";


            heart.style.animationDuration =
                (4 + Math.random() * 4) + "s";


            heart.style.setProperty(
                "--move",
                (Math.random() * 200 - 100) + "px"
            );


            document
                .getElementById("hearts-container")
                .appendChild(heart);



            setTimeout(() => {

                heart.remove();

            }, 8000);

        }



        setTimeout(() => {

            setInterval(createHeart, 1000);

        }, 2000);

    }

    function showMemorySection() {

        const letter =
            document.querySelector(".letter");


        const memory =
            document.getElementById("memorySection");


        letter.style.opacity = "0";


        setTimeout(() => {


            letter.style.display = "none";


            memory.style.display = "block";


            setTimeout(() => {

                memory.style.opacity = "1";

            }, 100);



        }, 1000);

    }

    // ===============================
    // Start Complete Experience
    // ===============================

    function startLetterExperience() {

        startTyping();

        playVideos();

        startHearts();
    }



    // ===============================
    // Make Function Global
    // ===============================

    window.openEnvelope = openEnvelope;


});