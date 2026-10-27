
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t))
    };
}

for (let i = 0; i < 600; i++) {
    
    function reiniciarCoracao() {
    particles.forEach(p => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
    });
}

    const t = Math.random() * Math.PI * 2;
    const point = heart(t);

    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: point.x,
        targetY: point.y,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.03 + 0.01
    });
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, width, height);

    const scale = Math.min(width, height) / 40;
    const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.08;

    particles.forEach(p => {
        const x = width / 2 + p.targetX * scale * pulse;
        const y = height / 2 + p.targetY * scale * pulse;

        p.x += (x - p.x) * p.speed;
        p.y += (y - p.y) * p.speed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ff3366";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();


function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    if (senha.trim().toLowerCase() === "29.10.25") {
        document.getElementById("entrada").style.display = "none";
        document.getElementById("surpresa").style.display = "block";

        resize();
        reiniciarCoracao();

    } else {
        erro.textContent = "Ops! Tente novamente, meu amor. 💕";
    }
}

