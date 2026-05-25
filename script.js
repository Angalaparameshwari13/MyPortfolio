/* ==========================================================================
   PORTFOLIO LOGIC - ANGALAPARAMESHWARI A
   Theme: Vibrant Gradient Banner & Clean White Layout (Anishka-Style Reference)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. PAGE LOADER INITIALIZATION
    // ----------------------------------------------------------------------
    const loader = document.getElementById('loader');
    const loadProgress = document.querySelector('.loader-progress');
    let width = 0;
    
    const loadInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.classList.remove('loading');
                startInteractiveEffects();
            }, 300);
        } else {
            width += Math.floor(Math.random() * 15) + 8;
            if (width > 100) width = 100;
            loadProgress.style.width = width + '%';
        }
    }, 60);

    function startInteractiveEffects() {
        initTypingEffect();
        animateCounters();
        initThemeToggle();
    }

    // ----------------------------------------------------------------------
    // 2. THEME SWITCHER LOGIC (DEFAULT LIGHT, OPTIONAL DARK)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    function initThemeToggle() {
        const savedTheme = localStorage.getItem('theme');
        // Default to light mode as requested in reference image
        if (savedTheme === 'dark') {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });

    function enableLightMode() {
        document.body.classList.remove('dark-mode');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    }

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    }

    // ----------------------------------------------------------------------
    // 3. NAV BAR & SCROLL PROGRESS
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Active Link on Scroll
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 150;
            const sectionHeight = sec.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------------------------------------------------------
    // 4. MOBILE NAVIGATION DECK
    // ----------------------------------------------------------------------
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

    mobileNavToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        mobileNavToggle.classList.toggle('active');
        document.body.classList.toggle('loading');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileNavToggle.classList.remove('active');
            document.body.classList.remove('loading');
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            !mobileNavToggle.contains(e.target)) {
            mobileMenu.classList.remove('open');
            mobileNavToggle.classList.remove('active');
            document.body.classList.remove('loading');
        }
    });

    // ----------------------------------------------------------------------
    // 5. HERO TEXT TYPING EFFECT
    // ----------------------------------------------------------------------
    function initTypingEffect() {
        const typeTarget = document.querySelector('.typing-text');
        if (!typeTarget) return;
        
        const words = JSON.parse(typeTarget.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentWord = '';
        
        function type() {
            const currentFullWord = words[wordIndex];
            
            if (isDeleting) {
                currentWord = currentFullWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentWord = currentFullWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typeTarget.textContent = currentWord;
            
            let typingSpeed = 100;
            if (isDeleting) typingSpeed = 45;
            
            if (!isDeleting && currentWord === currentFullWord) {
                typingSpeed = 2200; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && currentWord === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 400; // Pause before next word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }

    // ----------------------------------------------------------------------
    // 6. COUNTER INCREMENT ANIMATIONS
    // ----------------------------------------------------------------------
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num');
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 15;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }

    // ----------------------------------------------------------------------
    // 7. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If this is the skills section card, trigger slider bars
                const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                if (skillBars.length > 0) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 8. PROJECT DETAILS MODAL COMPONENT
    // ----------------------------------------------------------------------
    const modal = document.getElementById('project-modal');
    const modalDetails = document.getElementById('modal-project-details');
    const openModalBtns = document.querySelectorAll('.open-project-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    const projectData = {
        'wireless-io': {
            title: 'Wireless IO System',
            subtitle: 'Industrial Wireless Monitor & Control Node',
            desc: 'Designed and developed an industrial-grade wireless input/output system. It allows reliable real-time monitoring and controlling of analog & digital IO ports in harsh, electrically noisy environments.',
            features: [
                'Encrypted wireless data transmission utilizing AES-128 cryptographic algorithms.',
                'One-way and two-way wireless data synchronization over high-reliability RF links.',
                'Over-the-air parameters calibration and firmware fine-tuning via UART and Bluetooth interfaces.',
                'Rugged design structure incorporating transmission timeouts and communication retry triggers.',
                'Enhanced power efficiency with low-sleep configurations in standby states.'
            ],
            tech: ['PIC24FJ64GP205', 'RF Transceiver (2.4GHz)', 'HC-05 BLE Module', 'C / Embedded C', 'AES-128', 'UART/SPI']
        },
        'crane-control': {
            title: 'Dual-Mode Wireless IR & RF Remote Control System',
            subtitle: 'Heavy Industrial Crane Remote System',
            desc: 'A mission-critical remote control system developed for crane operations in factory facilities, combining Infrared (IR) and Radio Frequency (RF) signaling in a dual-redundancy configuration.',
            features: [
                'Instant operational mode-switching between Line-Of-Sight IR control and Non-Line-Of-Sight long-distance RF.',
                'A custom display interface with on-board screen menus for choosing communication frequency bands.',
                'Deep-sleep power optimizations ensuring multi-week battery life under constant usage.',
                'Built-in watchdog timers and framing checks preventing stray triggers from ambient electrical noise.',
                'Compact firmware structure with custom low-level device drivers.'
            ],
            tech: ['STM32F446RE', 'IR LED & Receiver Arrays', 'RF Transceiver Module', 'Embedded C', 'STM32Cube IDE', 'Power Savings Modes']
        },
        'temp-sensor': {
            title: 'Temperature Sensor Monitoring & Data Logging',
            subtitle: 'Acquisition & Local Storage System',
            desc: 'A robust microcontroller-based data logging unit designed to read temperatures from LM35 sensors, display logs on an LCD panel, and persist telemetry data inside EEPROMs.',
            features: [
                'Highly accurate ADC conversion routines for translating LM35 analog voltage measurements into Celsius metrics.',
                'Simulation mode designed to generate test temperatures for verifying peripheral drivers without active heating/cooling.',
                'I2C connection to external EEPROM chips for periodic logging of values for post-operational analysis.',
                'Custom character mapping for LCD visualization systems.',
                'Robust error handling to flag open sensor probes or I2C communication failures.'
            ],
            tech: ['8051 Microcontroller', 'PIC Microcontrollers', 'LM35 Sensor', 'EEPROM (I2C AT24C)', 'LCD (HD44780)', 'Keil uVision5']
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];
            
            if (data) {
                let techTagsHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('');
                let featuresHTML = data.features.map(f => `<li>${f}</li>`).join('');
                
                modalDetails.innerHTML = `
                    <div class="modal-header">
                        <h2>${data.title}</h2>
                        <div class="modal-subtitle">// ${data.subtitle}</div>
                    </div>
                    <div class="modal-body">
                        <h4>Project Overview</h4>
                        <p>${data.desc}</p>
                        
                        <h4>Key Engineering Accomplishments</h4>
                        <ul class="modal-feature-list">
                            ${featuresHTML}
                        </ul>
                        
                        <h4>Hardware & Software Stack</h4>
                        <div class="modal-tech-grid">
                            ${techTagsHTML}
                        </div>
                    </div>
                `;
                
                modal.classList.add('show');
                document.body.classList.add('loading');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('loading');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 9. CONTACT FORM HANDLER WITH PACKET TRANSMISSION SIMULATION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const messageText = document.getElementById('message').value;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = true;
            btnText.textContent = "ENCRYPTING PACKETS...";
            btnIcon.className = "fa-solid fa-key blink";
            
            setTimeout(() => {
                btnText.textContent = "PREPARING REDIRECT...";
                btnIcon.className = "fa-solid fa-spinner fa-spin";
                
                setTimeout(() => {
                    btnText.textContent = "TRANSMISSION OPENED!";
                    btnIcon.className = "fa-solid fa-check";
                    submitBtn.style.background = "linear-gradient(135deg, #22c55e 0%, #15803d 100%)";
                    submitBtn.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.4)";
                    
                    // Compile message and open WhatsApp URL
                    const formattedMessage = `Hi Angalaparameshwari,\n\nI filled out your portfolio contact form:\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:* ${messageText}`;
                    const whatsappUrl = `https://wa.me/919150109792?text=${encodeURIComponent(formattedMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.style.background = "";
                        submitBtn.style.boxShadow = "";
                        btnText.textContent = "TRANSMIT MESSAGE";
                        btnIcon.className = "fa-solid fa-paper-plane";
                    }, 3000);
                    
                }, 1300);
            }, 1000);
        });
    }
});
