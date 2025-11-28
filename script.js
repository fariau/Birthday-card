const candles = document.querySelectorAll(".candle");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const nameText = document.getElementById("nameText");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Confetti
function createConfetti() {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    document.body.appendChild(conf);
    conf.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
    setTimeout(() => conf.remove(), 5000);
}
setInterval(createConfetti, 200);

// Fireworks
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);

    for (let i = 0; i < 50; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 80,
            color: `hsl(${Math.random() * 360},100%,50%)`
        });
    }
}

// Draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(draw);
}
draw();
setInterval(createFirework, 1500);

// Candle click 
candles.forEach(candle => {
    let isLit = true;
    candle.addEventListener('click', () => {
        if (!isLit) return;
        isLit = false;

        const flame = candle.querySelector('.flame');
        const smoke = candle.querySelector('.smoke');

        // Turn off flame and start smoke
        flame.style.display = 'none';
        smoke.style.animation = "smokeUp 2s forwards";

        // Change text
        nameText.textContent = "Make a wish! 🎉";
        nameText.classList.add('sparkle');

        createFirework();

        // Reset candle & text 
        setTimeout(() => {
            flame.style.display = 'block';
            smoke.style.animation = '';
            nameText.textContent = "Happy Birthday 🎂";
            nameText.classList.remove('sparkle');
            isLit = true;
        }, 8000);
    });
});

// Balloon pop + confetti
document.querySelectorAll('.balloon').forEach(balloon => {
    balloon.addEventListener('click', () => {
        balloon.style.animation = 'pop 0.5s forwards';
        setTimeout(() => balloon.remove(), 500);

        for (let i = 0; i < 5; i++) createConfetti();
    });
});
