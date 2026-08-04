let highestZ = 1;
class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
        const move = (clientX, clientY) => {
            this.mouseX = clientX;
            this.mouseY = clientY;
            this.velX = this.mouseX - this.prevMouseX;
            this.velY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        };

        // Mouse Move
        document.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
        // Touch Move
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                move(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        // Mouse Down
        paper.addEventListener('mousedown', (e) => {
            this.startInteraction(e.clientX, e.clientY, e.button, paper);
        });

        // Touch Start
        paper.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.startInteraction(e.touches[0].clientX, e.touches[0].clientY, 0, paper);
            }
        });

        // Mouse/Touch End
        window.addEventListener('mouseup', () => this.endInteraction());
        window.addEventListener('touchend', () => this.endInteraction());
    }

    startInteraction(x, y, button, paper) {
        if (this.holdingPaper) return;
        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;
        this.mouseTouchX = x;
        this.mouseTouchY = y;
        this.prevMouseX = x;
        this.prevMouseY = y;
        if (button === 2) this.rotating = true;
    }

    endInteraction() {
        this.holdingPaper = false;
        this.rotating = false;
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

// Handle Form One
const firstPage = document.querySelector(".first-page");
const finalPage = document.querySelector(".final-page");
const rejection = document.getElementById(".rejection");
const letter = document.querySelector(".letter");
document.getElementById("formOne").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("https://formspree.io/f/xyzjjevq", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        firstPage.style.display = "none";
        finalPage.style.display = "flex";
    }
});

// Handle Form Two
document.getElementById("formTwo").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("https://formspree.io/f/xyzjjevq", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        firstPage.style.display = "none";
        rejection.style.display = "flex";
    }
});

const form = document.getElementById("formThree");
let listenerAdded = false;

// Periodically check if #formThree is visible
const interval = setInterval(() => {
    const isVisible = form && form.offsetParent !== null;

    if (isVisible && !listenerAdded) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            const response = await fetch("https://formspree.io/f/xyzjjevq", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {

                if (letter && finalPage && firstPage) {
                    finalPage.style.display = "none";
                    firstPage.style.display = "none";
                    letter.style.display = "flex";
                }
            }
        });

        listenerAdded = true; // Prevent re-adding
        clearInterval(interval); // Stop checking
    }
}, 300); // Check every 300ms

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.wrapper');
    const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
    const click = document.querySelector('.click-me');
    let visible = false;
    let loopStarted = false;

    function startLoop() {
        if (!visible || loopStarted) return;
        loopStarted = true;

        function cycleCheckboxes() {
            if (!visible) return;

            let index = 0;

            function checkNext() {
                if (!visible) return;

                if (index < checkboxes.length) {
                    checkboxes[index].checked = true;
                    index++;
                    setTimeout(checkNext, 1000);
                } else {
                    click.style.display = 'block';
                    wrapper.style.animation = 'throbAnim 0.5s infinite';
                    wrapper.classList.add('throb');

                    setTimeout(() => {
                        wrapper.classList.remove('throb');
                        checkboxes.forEach(cb => cb.checked = false);
                        loopStarted = false;

                        click.style.display = 'none';
                        wrapper.style.animation = 'none';
                        startLoop(); // Restart
                    }, 1500);
                }
            }

            checkNext();
        }

        setTimeout(cycleCheckboxes, 1000); // Initial delay
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            visible = entry.isIntersecting;

            if (visible) {
                startLoop();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(wrapper);
});

