 /* --- AWAL KODE JAVASCRIPT --- */

        // Variabel untuk Musik dan Suara Klik
        const music = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-toggle');
        const clickSound = document.getElementById('click-sound'); // Ambil elemen audio klik
        let isMusicPlaying = false;

        // Fungsi Helper: Mainkan Suara Klik
        function playClickSound() {
            if (clickSound) {
                clickSound.currentTime = 0; // Reset ke awal agar bisa diklik cepat
                clickSound.play().catch(e => console.log("Gagal memutar suara klik", e));
            }
        }

        // Fungsi Toggle Musik (On/Off)
        musicBtn.addEventListener('click', function() {
            playClickSound(); // Bunyi klik saat tombol musik ditekan
            if (isMusicPlaying) {
                music.pause();
                musicBtn.innerText = "🔇"; // Ikon Mati
            } else {
                music.play();
                musicBtn.innerText = "🔊"; // Ikon Nyala
            }
            isMusicPlaying = !isMusicPlaying;
        });

        // Fungsi Navigasi Sederhana
        function navigateTo(pageId) {
            playClickSound(); // Bunyi klik saat navigasi

            // 1. Coba nyalakan musik otomatis saat tombol pertama ditekan
            if (!isMusicPlaying && pageId === 'menu-page') {
                music.play().then(() => {
                    isMusicPlaying = true;
                    musicBtn.innerText = "🔊";
                }).catch(error => {
                    console.log("Autoplay dicegah oleh browser, user perlu klik tombol musik manual.");
                });
            }

            // 2. Navigasi Halaman
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const target = document.getElementById(pageId);
            if(target) {
                target.classList.add('active');
            }

            if(pageId === 'wishes-page') {
                createConfetti();
            }
        }

        // Logic Slider Foto Multi-Instance (Bisa banyak slider)
        const sliderIndices = {
            'slider-about': 0,
            'slider-games': 0,
            'slider-places': 0
        };
        
        function changeSlide(sliderId, direction) {
            playClickSound(); // Bunyi klik saat geser foto

            const container = document.getElementById(sliderId);
            if (!container) return;

            const slides = container.querySelectorAll('.polaroid');
            let currentIndex = sliderIndices[sliderId];
            
            // Sembunyikan slide aktif saat ini
            slides[currentIndex].classList.remove('active');
            
            // Hitung index baru
            currentIndex += direction;
            
            // Loop balik
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            
            // Simpan index baru
            sliderIndices[sliderId] = currentIndex;
            
            // Tampilkan slide baru
            slides[currentIndex].classList.add('active');

            // --- Update Deskripsi (Jika ada) ---
            const descBox = document.getElementById(sliderId + '-desc');
            if (descBox) {
                const newDesc = slides[currentIndex].getAttribute('data-desc');
                if (newDesc) {
                    descBox.innerText = newDesc;
                } else {
                    descBox.innerText = ""; 
                }
            }
        }

        // Efek Konfeti Biasa
        function createConfetti() {
            for(let i=0; i<20; i++) {
                const confetti = document.createElement('div');
                confetti.innerText = ['★', '❤', '♪', '✿'][Math.floor(Math.random() * 4)];
                
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-50px';
                confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
                confetti.style.color = ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'][Math.floor(Math.random() * 5)];
                confetti.style.fontFamily = 'Patrick Hand';
                confetti.style.zIndex = '100';
                confetti.style.transition = 'top 2.5s ease-in, transform 2.5s linear, opacity 2.5s ease-in';
                
                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.style.top = (window.innerHeight + 50) + 'px';
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    confetti.style.opacity = '0';
                }, 100);

                setTimeout(() => { confetti.remove(); }, 2600);
            }
        }

        // Fungsi Baru: Ledakan Love
        function triggerLoveExplosion() {
            playClickSound(); // Bunyi klik saat tombol love ditekan

            // Array variasi hati
            const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
            
            // Buat 30 elemen hati jatuh
            for(let i=0; i<30; i++) {
                const love = document.createElement('div');
                love.innerText = hearts[Math.floor(Math.random() * hearts.length)];
                
                love.style.position = 'fixed';
                love.style.left = Math.random() * window.innerWidth + 'px';
                love.style.top = '-50px'; 
                love.style.fontSize = (Math.random() * 30 + 20) + 'px'; 
                love.style.zIndex = '1000';
                love.style.pointerEvents = 'none'; 
                love.style.transition = 'top 3s ease-in, transform 3s ease-out, opacity 3s ease-in';
                
                document.body.appendChild(love);

                requestAnimationFrame(() => {
                    love.style.top = (window.innerHeight + 100) + 'px'; 
                    love.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px)`;
                    love.style.opacity = '0.8';
                });

                setTimeout(() => {
                    love.remove();
                }, 3000);
            }
        }

        /* --- AKHIR KODE JAVASCRIPT --- */