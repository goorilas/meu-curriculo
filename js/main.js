// Efeito de hipervelocidade com Canvas
const canvas = document.getElementById('hyperspace-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 1000;
const speed = 5;

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: (Math.random() - 0.5) * canvas.width,
            y: (Math.random() - 0.5) * canvas.height,
            z: Math.random() * canvas.width
        });
    }
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        
        star.z -= speed;

        if (star.z <= 0) {
            star.x = (Math.random() - 0.5) * canvas.width;
            star.y = (Math.random() - 0.5) * canvas.height;
            star.z = canvas.width;
        }

        const k = 128.0 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        if (px >= -canvas.width/2 && px <= canvas.width/2 && py >= -canvas.height/2 && py <= canvas.height/2) {
            const size = (1 - star.z / canvas.width) * 4;
            const shade = parseInt((1 - star.z / canvas.width) * 255);
            ctx.fillStyle = `rgb(${shade},${shade},255)`;
            ctx.beginPath();
            ctx.arc(px, py, size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    ctx.restore();
    requestAnimationFrame(draw);
}

window.onresize = setup;
setup();
draw();

// Lógica do Modal
const clickableCards = document.querySelectorAll('.clickable');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

clickableCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.dataset.modalId;
        const content = document.getElementById(`${modalId}-content`).innerHTML;
        const title = card.querySelector('h2').innerText;

        modalTitle.innerText = title;
        modalBody.innerHTML = content;
        modalOverlay.classList.add('visible');
        document.body.classList.add('modal-open');
    });
});

const closeModal = () => {
    modalOverlay.classList.remove('visible');
    document.body.classList.remove('modal-open');
};

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Lógica para revelar o organograma após um delay
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('organogram-lower').classList.add('visible');
    }, 2000); // 2000ms = 2 segundos
});