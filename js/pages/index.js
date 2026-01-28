import { initGlobal } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initHeroSlider();
    initReviewSlider();
});

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let curr = 0;
    if (slides.length) {
        setInterval(() => {
            slides[curr].classList.remove('active');
            curr = (curr + 1) % slides.length;
            slides[curr].classList.add('active');
        }, 6000);
    }
}

function initReviewSlider() {
    const track = document.querySelector('.reviews-track');
    // Mock user reviews
    const reviews = [
        { t: "The scent of kings.", a: "Ahmed A." },
        { t: "My home has never felt so warm.", a: "Layla S." },
        { t: "Packaging is art in itself.", a: "Omar K." },
        { t: "Night Candlelight mode is a vibe.", a: "Sarah J." },
        { t: "Oud Ember is my new signature.", a: "Fahad M." },
        { t: "Calmness delivered in a jar.", a: "Noura B." }
    ];

    if (track) {
        const chunkSize = 3;
        const slides = [];
        for (let i = 0; i < reviews.length; i += chunkSize) {
            slides.push(reviews.slice(i, i + chunkSize));
        }

        track.innerHTML = slides.map(group => `
            <div class="review-slide-group">
                ${group.map(r => `
                    <div class="review-card">
                        <p class="review-quote">"${r.t}"</p>
                        <div class="review-author">- ${r.a}</div>
                    </div>
                `).join('')}
            </div>
        `).join('');

        let setIndex = 0;
        const totalSets = slides.length;
        setInterval(() => {
            setIndex = (setIndex + 1) % totalSets;
            track.style.transform = `translateX(-${setIndex * 100}%)`;
        }, 5000);
    }
}
