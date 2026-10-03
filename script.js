// Music controls
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const iconPlay = document.getElementById('music-icon-play');
const iconPause = document.getElementById('music-icon-pause');

let isMusicPlaying = false;

// Initialize audio volume
bgMusic.volume = 0.3;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
    }
    isMusicPlaying = !isMusicPlaying;
});

// Start paused by default to avoid browser autoplay blocks
iconPlay.classList.remove('hidden');
iconPause.classList.add('hidden');

// Try playing on first interaction if not playing
document.body.addEventListener('click', () => {
    if(!isMusicPlaying) {
        // Optional: Auto-play music on first click anywhere.
        // bgMusic.play().then(() => { 
        //     isMusicPlaying = true; 
        //     iconPlay.classList.add('hidden'); 
        //     iconPause.classList.remove('hidden'); 
        // }).catch(e=>{});
    }
}, {once: true});

// Navigation between sections
function handleGiftClick() {
    const btn = document.getElementById('s3-btn');
    const sec3 = document.getElementById('sec-3');
    
    // Create dark overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 z-[40] transition-opacity duration-1000 opacity-0';
    document.body.appendChild(overlay);
    
    // Transform button to gift box
    btn.style.position = 'fixed';
    const rect = btn.getBoundingClientRect();
    btn.style.top = rect.top + 'px';
    btn.style.left = rect.left + 'px';
    btn.style.width = rect.width + 'px';
    btn.style.height = rect.height + 'px';
    
    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        
        btn.innerHTML = '🎁';
        btn.className = 'fixed z-[50] transition-all duration-1000 transform scale-[3] drop-shadow-[0_0_50px_rgba(236,72,153,1)] flex items-center justify-center bg-transparent border-none';
        btn.style.top = '50%';
        btn.style.left = '50%';
        btn.style.width = '100px';
        btn.style.height = '100px';
        btn.style.transform = 'translate(-50%, -50%) scale(2)';
        
        setTimeout(() => {
            // Burst effects
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { y: 0.5 },
                colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffd700'],
                shapes: ['circle', 'square']
            });
            
            btn.style.transform = 'translate(-50%, -50%) scale(2.5) rotate(5deg)';
            btn.innerHTML = '✨🎁✨';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                nextSection(3, 4);
                setTimeout(() => overlay.remove(), 1000);
            }, 1200);
        }, 1500);
    });
}
// Navigation between sections
function nextSection(current, next) {
    const currentSec = document.getElementById(`sec-${current}`);
    const nextSec = document.getElementById(`sec-${next}`);
    
    currentSec.style.opacity = '0';
    
    setTimeout(() => {
        currentSec.classList.add('hidden');
        currentSec.classList.remove('active-section');
        
        nextSec.classList.remove('hidden');
        nextSec.classList.add('active-section');
        
        // Trigger specific animations based on section
        requestAnimationFrame(() => {
            nextSec.style.opacity = '1';
            triggerSectionAnimations(next);
        });
    }, 1000); // Wait for fade out
}

function triggerSectionAnimations(section) {
    if (section === 2) {
        setTimeout(() => {
            const text1 = document.getElementById('s2-text1');
            text1.classList.remove('opacity-0', 'scale-90');
            text1.classList.add('opacity-100', 'scale-100');
        }, 300);
        
        setTimeout(() => {
            const text2 = document.getElementById('s2-text2');
            text2.classList.remove('opacity-0', 'scale-50');
            text2.classList.add('opacity-100', 'scale-100');
            
            // Mini confetti burst
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffc0cb', '#ffb6c1', '#ff69b4', '#db2777']
            });
        }, 1000);
        
        setTimeout(() => {
            const btn = document.getElementById('s2-btn');
            btn.classList.remove('opacity-0');
            btn.classList.add('opacity-100');
        }, 2000);
    }
    else if (section === 3) {
        const sec3 = document.getElementById('sec-3');
        const bokeh = document.getElementById('s3-bokeh');
        const text = document.getElementById('s3-text');
        const leftDecor = document.getElementById('s3-left-decor');
        const rightDecor = document.getElementById('s3-right-decor');
        const cakeContainer = document.getElementById('s3-cake-container');
        const btn = document.getElementById('s3-btn');
        const candles = [document.getElementById('candle-1'), document.getElementById('candle-2'), document.getElementById('candle-3')];
        
        // 1. Bg becomes brighter & bokeh appears
        setTimeout(() => {
            sec3.classList.remove('bg-[#280915]');
            sec3.classList.add('bg-[#380c1e]');
            bokeh.classList.remove('opacity-0');
            bokeh.classList.add('opacity-50');
            
            // Start simple particle generator for background
            createSparkles();
        }, 100);

        // 2. Text appears first with smooth glow
        setTimeout(() => {
            text.classList.remove('opacity-0', 'translate-z-[-100px]', 'scale-90');
            text.classList.add('opacity-100', 'translate-z-0', 'scale-100');
        }, 1000);

        // 3. Bouquets and balloons slide in
        setTimeout(() => {
            leftDecor.classList.remove('opacity-0', '-translate-x-20');
            leftDecor.classList.add('opacity-100', 'translate-x-0');
            
            rightDecor.classList.remove('opacity-0', 'translate-x-20');
            rightDecor.classList.add('opacity-100', 'translate-x-0');
        }, 2500);

        // 4. Cake slowly appears (scale-up)
        setTimeout(() => {
            cakeContainer.classList.remove('opacity-0', 'scale-75');
            cakeContainer.classList.add('opacity-100', 'scale-100');
        }, 4000);



        // 6. Burst of sparkles and confetti
        setTimeout(() => {
            shootCinematicConfetti();
        }, 7000);

        // 7. Show Button
        setTimeout(() => {
            btn.classList.remove('opacity-0');
            btn.classList.add('opacity-100');
        }, 8500);
    }
    else if (section === 4) {
        setTimeout(() => {
            document.getElementById('s4-card').classList.remove('opacity-0', 'translate-y-10');
            document.getElementById('s4-card').classList.add('opacity-100', 'translate-y-0');
            
            // Start typewriter
            setTimeout(typeWriter, 800);
        }, 500);
    }
    else if (section === 5) {
        setTimeout(() => {
            document.getElementById('s5-title').classList.remove('opacity-0');
            document.getElementById('s5-title').classList.add('opacity-100');
        }, 300);

        // Intersection observer for memory cards to reveal on scroll
        const cards = document.querySelectorAll('.memory-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

        cards.forEach((card, index) => {
            observer.observe(card);
        });
    }
    else if (section === 6) {
        setTimeout(() => {
            document.getElementById('s6-text1').classList.remove('opacity-0', 'translate-y-5');
            document.getElementById('s6-text1').classList.add('opacity-100', 'translate-y-0');
        }, 500);

        setTimeout(() => {
            document.getElementById('s6-text2').classList.remove('opacity-0', 'scale-90');
            document.getElementById('s6-text2').classList.add('opacity-100', 'scale-100');
            
            // Mini celebration here too
            confetti({
                particleCount: 50,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ffc0cb', '#ff69b4', '#fff']
            });
        }, 1500);

        setTimeout(() => {
            document.getElementById('s6-btn').classList.remove('opacity-0');
            document.getElementById('s6-btn').classList.add('opacity-100');
        }, 3000);
    }
    else if (section === 7) {
        setTimeout(() => {
            document.getElementById('s7-card').classList.remove('opacity-0', 'scale-95');
            document.getElementById('s7-card').classList.add('opacity-100', 'scale-100');
        }, 500);
    }
}

// Special transition for Celebration reveal
function triggerCelebration() {
    nextSection(2, 3);
}

// Typewriter Effect
const message = `Happy Birthday meri jaan! 🎉\n\nMain humesha sochta tha ki zindagi mein kya khaas hoga, phir tum mil gayi.\n\nTumhari muskurahat mere din ki sabse khoobsurat cheez hai. Tumhare bina baatein adhuri lagti hain. You bring so much joy, peace, and madness into my life. ✨\n\nI just want to see you happy, always and forever. I am so lucky to have you. 🥺❤️\n\nBhagwan kare tumhe duniya ki saari khushiyan milein.`;
let i = 0;
const speed = 45; // typing speed in ms
const textElement = document.getElementById('typewriter-text');

function typeWriter() {
    if (i < message.length) {
        if (message.charAt(i) === '\n') {
            textElement.innerHTML += '<br>';
        } else {
            textElement.innerHTML += message.charAt(i);
        }
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Typing finished
        textElement.classList.remove('cursor');
        setTimeout(() => {
            document.getElementById('s4-signature').classList.remove('opacity-0');
            document.getElementById('s4-signature').classList.add('opacity-100');
            
            setTimeout(() => {
                document.getElementById('s4-btn').classList.remove('opacity-0');
                document.getElementById('s4-btn').classList.add('opacity-100');
            }, 1000);
        }, 500);
    }
}

// Ensure cursor class is present initially
textElement.classList.add('cursor');

// Floating Hearts Background Generator
function createHeart() {
    const container = document.getElementById('particles-container');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    
    // Randomize position and size
    const size = Math.random() * 15 + 10; // 10px to 25px
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`;
    
    // Randomize animation duration
    const duration = Math.random() * 3 + 5; // 5s to 8s
    heart.style.animationDuration = `${duration}s`;
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generate hearts periodically
setInterval(createHeart, 800);

function finishJourney() {
    const btn = document.getElementById('s7-btn');
    const msg = document.getElementById('final-message');
    
    btn.style.transform = 'scale(0.9)';
    
    // Big heart confetti
    const defaults = { spread: 360, ticks: 100, gravity: 0, decay: 0.94, startVelocity: 30, colors: ['#ffc0cb', '#ff69b4', '#db2777', '#f472b6', '#fbcfe8'] };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: 0.75,
        shapes: ['circle']
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    
    setTimeout(() => {
        btn.classList.add('hidden');
        msg.classList.remove('hidden');
        msg.classList.add('animate-fade-in-up');
    }, 500);
}

// Modal functions for "NO" button interaction
function showNoModal() {
    const modal = document.getElementById('no-modal');
    const modalContent = document.getElementById('no-modal-content');
    
    modal.classList.remove('hidden');
    
    // Trigger reflow to restart animations
    void modal.offsetWidth;
    
    // Fade in backdrop
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    
    // Scale up content
    modalContent.classList.remove('scale-90');
    modalContent.classList.add('scale-100');
    
    // Add cute shake animation
    modalContent.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.02) rotate(-3deg)' },
        { transform: 'scale(1.04) rotate(0deg)' },
        { transform: 'scale(1.02) rotate(3deg)' },
        { transform: 'scale(1) rotate(0deg)' }
    ], {
        duration: 500,
        easing: 'ease-in-out'
    });
}

function handleModalYes() {
    const modal = document.getElementById('no-modal');
    const modalContent = document.getElementById('no-modal-content');
    
    // Fade out backdrop
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    
    // Scale down content
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        // Proceed to next section as if YES was clicked originally
        nextSection(1, 2);
    }, 300);
}

// Cinematic helpers for Section 3
function shootCinematicConfetti() {
    var duration = 4000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#ffc0cb', '#ffd700', '#ffffff', '#ff69b4']
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#ffc0cb', '#ffd700', '#ffffff', '#ff69b4']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function createSparkles() {
    const container = document.getElementById('s3-particles');
    if(!container) return;
    
    // Create new sparkles and petals periodically
    const interval = setInterval(() => {
        const sparkle = document.createElement('div');
        // Mix of stars, hearts, and rose petals
        const rand = Math.random();
        sparkle.innerHTML = rand > 0.8 ? '❤️' : rand > 0.4 ? '🌹' : '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = (Math.random() * 120 - 10) + 'vh'; // start slightly offscreen sometimes
        sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        sparkle.style.opacity = '0';
        sparkle.style.transition = 'all 5s cubic-bezier(0.25, 1, 0.5, 1)';
        sparkle.style.transform = `translateY(0) scale(0.5) rotate(${Math.random() * 360}deg)`;
        sparkle.style.filter = 'drop-shadow(0 0 8px rgba(255,192,203,0.6))';
        sparkle.style.zIndex = Math.random() > 0.5 ? '5' : '35'; // some behind, some in front
        
        container.appendChild(sparkle);
        
        // Fade in and float
        setTimeout(() => {
            sparkle.style.opacity = rand > 0.8 ? '0.6' : '0.4';
            sparkle.style.transform = `translateY(-${Math.random() * 150 + 50}px) translateX(${Math.random() * 100 - 50}px) scale(1) rotate(${Math.random() * 360}deg)`;
        }, 100);
        
        // Fade out
        setTimeout(() => {
            sparkle.style.opacity = '0';
        }, 4000);
        
        // Remove from DOM
        setTimeout(() => {
            sparkle.remove();
        }, 6000);
    }, 200);
}

// Parallax effect for Section 3
document.addEventListener('mousemove', (e) => {
    const sec3 = document.getElementById('sec-3');
    if (!sec3 || !sec3.classList.contains('active-section')) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const leftDecor = document.getElementById('s3-left-decor');
    const rightDecor = document.getElementById('s3-right-decor');
    const cakeContainer = document.getElementById('s3-cake-container');
    const bokeh = document.getElementById('s3-bokeh');

    if (leftDecor) leftDecor.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
    if (rightDecor) rightDecor.style.transform = `translate(${-x * 1.5}px, ${y * 1.5}px)`;
    if (cakeContainer) cakeContainer.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1)`;
    if (bokeh) bokeh.style.transform = `translate(${-x * 2}px, ${-y * 2}px)`;
});
