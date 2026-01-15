// ============================================
// ELITE MECHATRONICS PORTFOLIO - JAVASCRIPT
// Workshop Modal | History API | Next/Prev Navigation
// ============================================

// ============================================
// WORKSHOP DATABASE (MECHATRONICS SPECIFIC)
// ============================================
const workshopProjects = {
    arduino: [], // Coming soon - empty array
    pneumatics: [], // Coming soon - empty array
    tkm: [], // Coming soon - empty array
    fabrication: [], // Coming soon - empty array
    cae: [], // Coming soon - empty array
    assembly: [] // Coming soon - empty array
};

// Flatten array for navigation
const allWorkshopProjects = Object.values(workshopProjects).flat();

// ============================================
// STATE MANAGEMENT
// ============================================
// ============================================
// STATE MANAGEMENT
// ============================================
let currentFilter = 'all';
let currentWorkshopIndex = 0;
let currentWorkshopCategory = null;
let modalHistoryState = null;

// ============================================
// CERTIFICATES DATABASE (Updated with Multiple Images)
// ============================================
const certificatesData = [
    {
    id: 1,
    title: "4th Runner Up - Scientific Paper FUSE 2025 (Polman Bandung)",
    category: "science",
    badge: "Scientific Paper",
    description: "Teknologi Hibrid Elektrokoagulasi-Flotasi dan Biomedikal untuk Pemurnian Limbah Cair",
    certImage: "./asset/Certificate_4th Runner Up_Scientific Paper_FUSE POLMAN Bandung_2025 - Muhammad Zavier Rizkayanto_page-0001.jpg",
    evidenceImages: ["./asset/fuse/harapan 2.JPG", "./asset/fuse/harapan 2 1.JPG", "./asset/fuse/harapn 2.3.JPG"],
    pdfLink: "./asset/Zahavir_SMKN4JAKARTA_FullPaper_TEKNOLOGI HIBRID ELEKTROKOAGULASI-FLOTASI DAN BIOMEDIKAL UNTUK SOLUSI PEMURNIAN LIMBAH CAIR BERKELANJUTAN.pdf",
    theoryText: "Integrasi metode pra-perlakuan agen biomedikal (Eco-Enzyme & EM4) dengan proses elektrokoagulasi in situ untuk pemisahan flok polutan secara berkelanjutan.",
    toolText: "Sistem Elektrokoagulasi-Flotasi (EC-F), Reaktor Biomedikal, Elektroda Fe/Al, Agen Bioremediasi (Eco-Enzyme/EM4), Alat ukur parameter COD/BOD/TSS.",
    story: "Penelitian ini berfokus pada solusi pemurnian limbah cair di pintu air perkotaan yang kronis. Kami mengusulkan teknologi hibrid yang menggabungkan proses biologi (bioremediasi) dan elektrokimia. Tantangan utamanya adalah memecah molekul polutan yang sulit diurai (recalcitrant) agar lebih mudah diproses secara alami. Dengan sistem ini, kami berhasil merumuskan metode yang tidak hanya hemat energi, tetapi juga mampu mengurangi volume lumpur limbah hingga 50% dibandingkan metode kimia konvensional.",
    documentation: "Detail Proyek: Sistem pengolahan limbah cair hibrid. Mekanisme: Pra-perlakuan biomedikal dilanjutkan dengan Elektrokoagulasi untuk penggumpalan polutan dan Flotasi untuk pemisahan fase. Keunggulan: Efisiensi penurunan COD (87.73%) dan TSS (92.52%) hingga di bawah baku mutu Permen LH No. 5 Th 2014. Tim: Muhammad Zavier Rizkayanto, Azahid Pramudya Al Ghifahri, Harold Daniel Metcalf Siregar. Pembimbing: Mochammad Aldi Mauludin."
    },
    {
    id: 2,
    title: "2nd Place - IoT Competition TENNOVEX 2025",
    category: "robotics",
    badge: "Internet of Things",
    description: "Sistem Peringatan Penebangan Liar (SIPEGA-IoT)",
    certImage: "./asset/its/Certificate_2nd Place_IoT Competition_ITS_2025 - Muhammad Zavier Rizkayanto.png",
    evidenceImages: ["./asset/its/sipega.jpeg", "./asset/its/its.jpeg", "./asset/its/tennovex.jpeg"], // Ganti dengan nama file dokumentasi Anda
    pdfLink: "./asset/its/Sinergi Hijau_SMKN4JAKARTA_PAPER_Rancang Bangun SIPEGA-IoT (Sistem Peringatan Penebangan Liar) Menggunakan Sensor Akustik dan Akselerometer 3-Sumbu Terintegrasi GPS dan Self-Sustaining Power.pdf",
    theoryText: "Sistem deteksi deforestasi berbasis IoT menggunakan sensor akustik (suara gergaji mesin) dan akselerometer 3-sumbu untuk mendeteksi getaran pohon tumbang secara real-time.",
    toolText: "ESP32, Sensor Akustik, Akselerometer ADXL345, GPS Neo-6M, Panel Surya (Self-Sustaining Power), SMS.",
    story: "Proyek SIPEGA-IoT dirancang untuk mengatasi masalah pembalakan liar yang sulit dipantau di area hutan luas. Tantangan utama kami adalah memastikan perangkat tetap menyala secara mandiri menggunakan sistem tenaga surya dan mampu membedakan suara gergaji mesin dari suara bising hutan lainnya. Keberhasilan kami dalam mengintegrasikan sensor getaran dan koordinat GPS memungkinkan respons cepat dari pihak berwenang saat terjadi aktivitas ilegal.",
    documentation: "Spesifikasi Sistem: Mikrokontroler ESP32 dengan konektivitas Wi-Fi/LoRa. Sensor: Analog Sound Sensor & ADXL345 3-Axis Accelerometer. Penentuan Lokasi: GPS Neo-6M module. Daya: Baterai Li-ion dengan pengisian daya otomatis melalui Panel Surya 5V. Fitur: Notifikasi instan melalui SMS yang menyertakan lokasi titik koordinat kejadian. Kompetisi: Lomba Internet of Things TENNOVEX 2025, Institut Teknologi Sepuluh Nopember (ITS)."
    },
    {
    id: 3, 
    title: "2nd Place - Electrical Innovation UIKA Bogor 2025",
    category: "robotics",
    badge: "Machine Learning & IoT",
    description: "Sistem Peringatan Penebangan Liar Berbasis AI dengan Notifikasi SMS",
    certImage: "./asset/uika/Certificate_2nd Place_Electrical Innovation_UIKA Bogor_2025 - Muhammad Zavier Rizkayanto.jpg",
    evidenceImages: ["./asset/uika/bukti 1.JPG", "./asset/uika/bukti 2.JPG", "./asset/uika/bukti 3.JPG"], // Ganti dengan nama file dokumentasi Anda
    pdfLink: "Pengembangan_SIPEGA_IoT_AI_SMS.pdf",
    theoryText: "Penerapan Edge AI untuk sensor fusion antara data akustik dan getaran. Sistem menggunakan logika klasifikasi untuk memastikan validitas ancaman sebelum mengirim peringatan.",
    toolText: "ESP32, Sensor Suara, Akselerometer ADXL345, SIM800L GSM Module (SMS), GPS Neo-6M, TinyML, Solar Power.",
    story: "Pengembangan versi kedua ini difokuskan pada akurasi deteksi di lapangan. Kami mengintegrasikan Machine Learning untuk menganalisis pola frekuensi suara gergaji dan getaran pohon secara bersamaan. Peringatan hanya akan dikirimkan melalui SMS jika kedua sensor mendeteksi aktivitas secara sinkron. Penggunaan SMS dipilih untuk menjamin notifikasi tetap terkirim meskipun di area hutan dengan sinyal internet (data) yang minim, sehingga lebih reliabel dibandingkan aplikasi chat.",
    documentation: "Update Spesifikasi: Logika verifikasi 'Dual-Trigger' berbasis Machine Learning. Modul Komunikasi: SIM800L untuk SMS Alert real-time. Fitur Keamanan: Notifikasi menyertakan koordinat GPS lokasi kejadian. Power: Sistem mandiri dengan Panel Surya dan manajemen daya Deep Sleep untuk operasional jangka panjang di area terpencil."
    },
    {
    id: 4, 
    title: "Participant - Southeast Asian Waste Hero Awards 2023",
    category: "environmental research",
    badge: "Environmental Innovation",
    description: "Inovasi Pengolahan Limbah Styrofoam menjadi Wastafel Ramah Lingkungan",
    certImage: "./asset/seameo/Certificate_Participation_SE Asian Waste Hero Awards_2023 - Muhammad Zavier Rizkayanto.jpg",
    videoEmbed: "https://www.youtube.com/embed/fvaaRvo3uwo",
    pdfLink: "Inovasi_Wastafel_Styrofoam_SEAMEO.pdf",
    theoryText: "Pemanfaatan teknik pelelehan Styrofoam (Polystyrene) menggunakan minyak jelantah sebagai pelarut alami untuk menciptakan material komposit yang kuat dan water-resistant.",
    toolText: "Limbah Styrofoam, Minyak Jelantah, Cetakan Wastafel, Kompor/Pemanas, Semen (sebagai pengeras tambahan).",
    story: "Mewakili SMPN 121 Jakarta Utara dalam kompetisi regional Asia Tenggara. Proyek ini bermula dari keprihatinan saya terhadap limbah styrofoam di sekitar Pasar Koja yang sulit terurai. Saya bereksperimen menggunakan minyak jelantah untuk melarutkan styrofoam tersebut hingga menjadi pasta material yang bisa dibentuk kembali. Inovasi ini mengubah sampah yang mencemari lingkungan menjadi barang sanitasi yang fungsional dan tahan lama.",
    documentation: "Penyelenggara: SEAMEO SEPS & Indorama Ventures PCL. Fokus: Circular Economy & Waste Management. Lokasi Riset: Pasar Koja & Lab SMPN 121 Jakarta."
    },
    {
    id: 5, 
    title: "Grand Finalist - National Literacy & Numeracy Competition 2024",
    category: "academic", 
    badge: "National Finalist",
    description: "Finalis Nasional Kategori SMK Kelas 10 - UNJ",
    certImage: "./asset/Finalist_Literacy_Numeracy_National_2024 - Muhammad Zavier Rizkayanto.pdf.jpg",
    evidenceImages: ["unj-final-stage.jpg", "unj-presentation.jpg", "unj-competition-news.jpg"],
    pdfLink: "https://www.detik.com/edu/edutainment/d-7663696/kompetisi-literasi-numerasi-nasional-2024-unj-diikuti-43-ribuan-siswa-ini-juaranya",
    theoryText: "Kompetisi tingkat nasional yang menguji kemampuan Higher Order Thinking Skills (HOTS) dalam literasi dan numerasi.",
    toolText: "Logical Reasoning, Critical Thinking, Oral Presentation, Problem Solving.",
    story: "Berhasil terpilih menjadi Finalis Nasional kategori SMK Kelas 10 dalam kompetisi yang diikuti oleh lebih dari 43.000 peserta dari seluruh Indonesia. Saya melewati berbagai tahapan ketat mulai dari seleksi internal sekolah, penyisihan, hingga Grand Final di Universitas Negeri Jakarta (UNJ). Pengalaman paling berharga adalah saat menjalani tes lisan di hadapan dewan juri untuk mempresentasikan logika pemecahan masalah secara langsung.",
    documentation: "Penyelenggara: Universitas Negeri Jakarta (UNJ). Status: Finalis Nasional (Kategori SMK Kelas 10). Tahapan: Seleksi Internal, Penyisihan, Semifinal, Grand Final (LCMS & Tes Lisan). Kompetisi ini menguji kemampuan analisis teks kompleks dan pemecahan masalah matematika tingkat tinggi."
    }
];

// ============================================
// IMAGE LIGHTBOX SYSTEM
// ============================================
let lightboxImages = [];
let currentLightboxIndex = 0;

function initLightbox() {
    const lightboxOverlay = document.getElementById('image-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
        }
    });
}

function openLightbox(imageSrc, imageList = []) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    // Set images array
    lightboxImages = imageList.length > 0 ? imageList : [imageSrc];
    currentLightboxIndex = lightboxImages.indexOf(imageSrc);

    if (currentLightboxIndex === -1) {
        currentLightboxIndex = 0;
    }

    lightboxImage.src = lightboxImages[currentLightboxIndex];
    updateLightboxCounter();

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

function updateLightboxCounter() {
    const counter = document.getElementById('lightbox-counter');
    counter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
}

function attachLightboxToImage(img, imageList = []) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(img.src, imageList);
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('%c⚙️ Interactive Workshop Portfolio Loaded', 'color: #C0C0C0; font-size: 16px; font-weight: bold;');

    // Mobile Menu Toggle - IMPROVED
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileToggle && mobileMenu) {
        // Toggle menu visibility on hamburger click
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.toggle('hidden');
            const isActive = mobileMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', !isHidden);
        });

        // Close menu on close button click
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        }

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow navigation to happen
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.add('hidden');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    initNavbar();
    initSmoothScroll();
    initFilterSystem();
    initCertificateModal();
    initWorkshopCards();
    initWorkshopModal();
    initHistoryAPI();
    initLightbox();
    renderCertificates(currentFilter);

    // Attach lightbox to documentation images after render
    setTimeout(() => {
        document.querySelectorAll('.documentation-image').forEach(img => {
            attachLightboxToImage(img);
        });
    }, 100);

    console.log('%c✅ Workshop system ready with Lightbox', 'color: #C0C0C0; font-size: 14px;');
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// FILTER SYSTEM
// ============================================
function initFilterSystem() {
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            renderCertificates(currentFilter);
        });
    });
}

function renderCertificates(filter) {
    const grid = document.getElementById('certificates-grid');
    const existingCards = grid.querySelectorAll('.certificate-card');
    existingCards.forEach(card => card.classList.add('fade-out'));

    setTimeout(() => {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? certificatesData : certificatesData.filter(cert => cert.category === filter);
        filtered.forEach((cert, index) => {
            const card = createCertificateCard(cert);
            grid.appendChild(card);
            setTimeout(() => card.classList.remove('fade-out'), index * 50);
        });
        if (filtered.length === 0) {
            grid.innerHTML = '<p class="text-chrome-silver/70 text-center col-span-full py-12">No certificates found.</p>';
        }
    }, 300);
}

function createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'certificate-card fade-out';
    card.setAttribute('data-id', cert.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
        <div class="certificate-badge">${cert.badge}</div>
        <h3 class="certificate-title">${cert.title}</h3>
        <p class="certificate-desc">${cert.description}</p>
    `;
    card.addEventListener('click', () => openCertificateModal(cert.id));
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCertificateModal(cert.id);
        }
    });
    return card;
}

// ============================================
// CERTIFICATE MODAL - TAB SYSTEM WITH CAROUSEL
// ============================================
let currentCarouselIndex = 0;
let carouselAutoPlayInterval = null;

function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const closeBtn = document.getElementById('close-modal');
    const downloadBtn = document.getElementById('modal-pdf');
    
    if (closeBtn) closeBtn.addEventListener('click', closeCertificateModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCertificateModal();
    });

    // Download button click handler
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // Let browser handle the link normally
            // Don't prevent default
        });
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.cert-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.cert-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active to clicked button and corresponding content
            this.classList.add('active');
            const tabContent = document.getElementById(`cert-tab-${tabName}`);
            if (tabContent) {
                tabContent.classList.add('active');
                
                // Start carousel if documentation tab is active
                if (tabName === 'documentation') {
                    startCarouselAutoPlay();
                } else {
                    stopCarouselAutoPlay();
                }
            }
        });
    });

    // Carousel controls
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateCarousel(-1);
            resetCarouselAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateCarousel(1);
            resetCarouselAutoPlay();
        });
    }
}

function navigateCarousel(direction) {
    const certId = document.getElementById('modal-title')?.getAttribute('data-cert-id');
    if (!certId) return;
    
    const cert = certificatesData.find(c => c.id === parseInt(certId));
    if (!cert || !cert.evidenceImages || cert.evidenceImages.length === 0) return;

    currentCarouselIndex = (currentCarouselIndex + direction + cert.evidenceImages.length) % cert.evidenceImages.length;
    updateCarouselDisplay();
}

function updateCarouselDisplay() {
    const cert = certificatesData.find(c => c.id === parseInt(document.getElementById('modal-title').getAttribute('data-cert-id')));
    if (!cert || !cert.evidenceImages) return;

    const evidenceImage = document.getElementById('modal-cert-evidence');
    const indicators = document.querySelectorAll('.carousel-indicator');

    // Fade out effect
    evidenceImage.classList.add('fade-out');

    setTimeout(() => {
        // Change image source
        evidenceImage.src = cert.evidenceImages[currentCarouselIndex];
        
        // Small delay before fade in
        setTimeout(() => {
            evidenceImage.classList.remove('fade-out');
        }, 50);

        // Update indicators - no layout shift
        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === currentCarouselIndex);
        });
    }, 500);
}

function startCarouselAutoPlay() {
    stopCarouselAutoPlay();
    
    // Add a delay before starting autoplay so user can see the first image
    const delayStart = 2000; // Wait 2 seconds before first auto-change
    setTimeout(() => {
        carouselAutoPlayInterval = setInterval(() => {
            navigateCarousel(1);
        }, 10000); // Change image every 10 seconds
    }, delayStart);
}

function stopCarouselAutoPlay() {
    if (carouselAutoPlayInterval) {
        clearInterval(carouselAutoPlayInterval);
        carouselAutoPlayInterval = null;
    }
}

function resetCarouselAutoPlay() {
    const docTab = document.getElementById('cert-tab-documentation');
    if (docTab && docTab.classList.contains('active')) {
        // Stop current autoplay and start fresh
        stopCarouselAutoPlay();
        startCarouselAutoPlay();
    }
}

function openCertificateModal(certId) {
    // Stop any ongoing autoplay from previous modal
    stopCarouselAutoPlay();
    
    const cert = certificatesData.find(c => c.id === certId);
    if (!cert) return;

    const modal = document.getElementById('certificate-modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = cert.title;
    modalTitle.setAttribute('data-cert-id', certId);

    // Certificate Tab - Image (Centered)
    const certImage = document.getElementById('modal-cert-image');
    certImage.src = cert.certImage;
    certImage.onerror = () => certImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%231A1A1A"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23C0C0C0" font-size="14"%3E${cert.title}%3C/text%3E%3C/svg%3E`;
    
    // Attach lightbox to certificate image
    attachLightboxToImage(certImage);

    // Certificate Tab - Story & Description
    const fullDesc = `${cert.theoryText} ${cert.toolText || ''}`;
    document.getElementById('modal-cert-desc').textContent = fullDesc;
    document.getElementById('modal-cert-story').textContent = cert.story || "Story not available yet.";
    
    // Download button - Hide for UIKA (ID 3) and SEAMEO (ID 4)
    const downloadBtn = document.getElementById('modal-pdf');
    if (certId === 3 || certId === 4) {
        downloadBtn.style.display = 'none';
    } else if (certId === 5) {
        // Grand Finalist (ID 5) - Show but change text to "View Article"
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.textContent = 'View Article';
        downloadBtn.href = cert.pdfLink;
        downloadBtn.target = '_blank';
        downloadBtn.removeAttribute('download');
    } else {
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.textContent = 'Download / View Paper';
        downloadBtn.href = cert.pdfLink;
        downloadBtn.target = '_blank';
        // Don't use download attribute, let browser handle it naturally
    }

    // Documentation Tab - Carousel Setup (or Video for SEAMEO)
    // IMPORTANT: Reset carousel index to 0 for this certificate
    currentCarouselIndex = 0;
    
    // Check if certificate has videoEmbed (SEAMEO ID 4)
    if (cert.videoEmbed) {
        // Hide carousel evidence section, show video
        const evidenceSection = document.getElementById('doc-evidence-section');
        if (evidenceSection) {
            evidenceSection.style.display = 'none';
        }
        
        const evidenceImage = document.getElementById('modal-cert-evidence');
        evidenceImage.style.display = 'none';
        
        const indicatorsContainer = document.getElementById('carousel-indicators');
        indicatorsContainer.innerHTML = '';
        indicatorsContainer.style.display = 'none';
        
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        
        // Stack layout vertically (top to bottom)
        const docGrid = document.querySelector('.documentation-grid');
        docGrid.style.display = 'flex';
        docGrid.style.flexDirection = 'column';
        docGrid.style.gap = '2rem';
        
        const videoWrapper = document.getElementById('doc-video-wrapper');
        if (videoWrapper) {
            videoWrapper.style.display = 'block';
            videoWrapper.style.order = '1';
            const videoContainer = videoWrapper.querySelector('.documentation-image-container');
            if (videoContainer) {
                videoContainer.innerHTML = `<iframe width="100%" height="400" src="${cert.videoEmbed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }
        }
        
        // Move documentation details below video
        const docDetails = document.getElementById('doc-details-section');
        if (docDetails) {
            docDetails.style.display = 'block';
            docDetails.style.order = '2';
            // Ensure content is populated
            docDetails.innerHTML = `
                <h4 class="documentation-title">Details & Specifications</h4>
                <div class="documentation-text">
                    <p id="modal-cert-documentation" class="documentation-desc">${cert.documentation || "Documentation details coming soon."}</p>
                </div>
            `;
        }
    } else {
        // Show carousel for regular evidence images (stacked layout)
        const evidenceSection = document.getElementById('doc-evidence-section');
        if (evidenceSection) {
            evidenceSection.style.display = 'block';
            evidenceSection.style.order = '1';
        }
        
        const videoWrapper = document.getElementById('doc-video-wrapper');
        if (videoWrapper) {
            videoWrapper.style.display = 'none';
        }
        
        const docGrid = document.querySelector('.documentation-grid');
        docGrid.style.display = 'flex';
        docGrid.style.flexDirection = 'column';
        docGrid.style.gap = '2rem';
        
        const docDetails = document.getElementById('doc-details-section');
        if (docDetails) {
            docDetails.style.display = 'block';
            docDetails.style.order = '2';
            // Reset to normal content
            docDetails.innerHTML = `
                <h4 class="documentation-title">Details & Specifications</h4>
                <div class="documentation-text">
                    <p id="modal-cert-documentation" class="documentation-desc">${cert.documentation || "Documentation details coming soon."}</p>
                </div>
            `;
        }
        
        const evidenceImage = document.getElementById('modal-cert-evidence');
        evidenceImage.style.display = 'block';
        
        const evidenceImages = cert.evidenceImages || [cert.certImage];
        evidenceImage.src = evidenceImages[0];
        evidenceImage.onerror = () => evidenceImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%231A1A"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23C0C0C0" font-size="12"%3EEvidence Image%3C/text%3E%3C/svg%3E`;

        // Attach lightbox to evidence image with full list
        attachLightboxToImage(evidenceImage, evidenceImages);

        // Create indicators
        const indicatorsContainer = document.getElementById('carousel-indicators');
        indicatorsContainer.innerHTML = '';
        evidenceImages.forEach((_, idx) => {
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                currentCarouselIndex = idx;
                updateCarouselDisplay();
                resetCarouselAutoPlay();
            });
            indicatorsContainer.appendChild(indicator);
        });

        // Only show carousel nav if more than 1 image
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        if (evidenceImages.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    // Documentation Tab - Details
    document.getElementById('modal-cert-documentation').textContent = cert.documentation || "Documentation details coming soon.";

    // Reset to Certificate tab
    document.querySelectorAll('.cert-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.cert-tab-content').forEach(content => content.classList.remove('active'));
    
    // Hide Documentation tab for ID 5 (Grand Finalist)
    const docTabBtn = document.querySelector('.cert-tab-btn[data-tab="documentation"]');
    if (certId === 5) {
        docTabBtn.style.display = 'none';
    } else {
        docTabBtn.style.display = 'block';
    }
    
    document.querySelector('.cert-tab-btn[data-tab="certificate"]').classList.add('active');
    document.getElementById('cert-tab-certificate').classList.add('active');

    stopCarouselAutoPlay();

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // History API
    pushModalState('certificate', certId);
}

function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    stopCarouselAutoPlay();
}

// ============================================
// WORKSHOP CARDS (CLICKABLE)
// ============================================
// ============================================
// WORKSHOP CARDS (CLICKABLE & COMING SOON)
// ============================================
function initWorkshopCards() {
    document.querySelectorAll('.workshop-card').forEach(card => {
        const category = card.getAttribute('data-workshop-category');
        const projects = workshopProjects[category];

        // CHECK IF DATA EXISTS (Coming Soon or Active)
        if (!projects || projects.length === 0) {
            // COMING SOON STATE
            card.classList.add('coming-soon');
            card.style.cursor = 'default';
            
            // Optional: Show toast on click
            card.addEventListener('click', function (e) {
                e.preventDefault();
                showToast('Coming Soon', `${category.charAt(0).toUpperCase() + category.slice(1)} projects are being prepared.`);
            });
        } else {
            // ACTIVE STATE - workshop has projects
            card.addEventListener('click', function () {
                openWorkshopModal(category, 0);
            });
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openWorkshopModal(category, 0);
                }
            });
        }
    });
}

function showToast(title, message) {
    // Remove existing toasts
    const existing = document.querySelectorAll('.toast-notification');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="toast-title">[SYSTEM]: ${title}</span>
        <span class="toast-message">${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('active');
    });

    // Auto dismiss
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ============================================
// WORKSHOP MODAL (WITH NEXT/PREV NAVIGATION)
// ============================================
function initWorkshopModal() {
    const modal = document.getElementById('workshop-modal');
    const closeBtn = document.getElementById('close-workshop-modal');
    const prevBtn = document.getElementById('workshop-prev');
    const nextBtn = document.getElementById('workshop-next');

    if (closeBtn) closeBtn.addEventListener('click', closeWorkshopModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeWorkshopModal();
    });

    if (prevBtn) prevBtn.addEventListener('click', navigateWorkshop(-1));
    if (nextBtn) nextBtn.addEventListener('click', navigateWorkshop(1));
}

function openWorkshopModal(category, index = 0) {
    currentWorkshopCategory = category;
    const projects = workshopProjects[category];
    if (!projects || projects.length === 0) return;

    currentWorkshopIndex = Math.max(0, Math.min(index, projects.length - 1));
    displayWorkshopProject(projects[currentWorkshopIndex]);

    const modal = document.getElementById('workshop-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // History API
    pushModalState('workshop', projects[currentWorkshopIndex].id);
}

function displayWorkshopProject(project) {
    document.getElementById('workshop-modal-title').textContent = project.title;
    document.getElementById('workshop-modal-category').textContent = project.category;

    // 1. PHYSICAL / DOCUMENTATION IMAGE
    const physicalContainer = document.getElementById('workshop-physical-container');
    if (project.physicalImage && project.physicalImage.trim() !== '') {
        physicalContainer.style.display = 'block';
        const physicalImage = document.getElementById('workshop-physical-image');
        physicalImage.src = project.physicalImage;
        physicalImage.onerror = () => physicalImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23000000"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23C0C0C0" font-size="14"%3E${project.physicalImage}%3C/text%3E%3C/svg%3E`;
        
        // Attach lightbox
        attachLightboxToImage(physicalImage);
    } else {
        physicalContainer.style.display = 'none';
    }

    // 2. SCHEMATIC IMAGE
    const schematicContainer = document.getElementById('workshop-schematic-container');
    if (project.schematicImage && project.schematicImage.trim() !== '') {
        schematicContainer.style.display = 'block';
        const schematicImage = document.getElementById('workshop-schematic-image');
        schematicImage.src = project.schematicImage;
        schematicImage.onerror = () => schematicImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23000000"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23C0C0C0" font-size="14"%3E${project.schematicImage}%3C/text%3E%3C/svg%3E`;
        
        // Attach lightbox
        attachLightboxToImage(schematicImage);
    } else {
        schematicContainer.style.display = 'none';
    }

    // 3. VIDEO
    const videoWrapper = document.getElementById('workshop-video-wrapper');
    const videoContainer = document.getElementById('workshop-video-container');

    if (project.videoEmbed && project.videoEmbed.trim() !== '') {
        videoWrapper.style.display = 'block';
        videoContainer.innerHTML = project.videoEmbed;
    } else {
        videoWrapper.style.display = 'none';
        videoContainer.innerHTML = '';
    }

    document.getElementById('workshop-description').textContent = project.description;
}

function navigateWorkshop(direction) {
    return function () {
        const projects = workshopProjects[currentWorkshopCategory];
        if (!projects) return;

        currentWorkshopIndex = (currentWorkshopIndex + direction + projects.length) % projects.length;

        // Smooth transition
        const images = document.querySelectorAll('.workshop-image-container');
        images.forEach(img => img.style.opacity = '0');

        setTimeout(() => {
            displayWorkshopProject(projects[currentWorkshopIndex]);
            pushModalState('workshop', projects[currentWorkshopIndex].id);
            setTimeout(() => images.forEach(img => img.style.opacity = '1'), 50);
        }, 400);
    };
}

function closeWorkshopModal() {
    const modal = document.getElementById('workshop-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// ============================================
// HISTORY API (FIX BACK BUTTON UX)
// ============================================
function initHistoryAPI() {
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.modalType) {
            // Modal was open, now closing with back button
            if (event.state.modalType === 'workshop') {
                closeWorkshopModal();
            } else if (event.state.modalType === 'certificate') {
                closeCertificateModal();
            }
        } else {
            // Ensure modals are closed
            closeWorkshopModal();
            closeCertificateModal();
        }
    });

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const workshopModal = document.getElementById('workshop-modal');
            const certModal = document.getElementById('certificate-modal');
            if (workshopModal.classList.contains('active')) {
                closeWorkshopModal();
                if (modalHistoryState) window.history.back();
            } else if (certModal.classList.contains('active')) {
                closeCertificateModal();
                if (modalHistoryState) window.history.back();
            }
        }
    });
}

function pushModalState(modalType, id) {
    modalHistoryState = { modalType, id };
    history.pushState(modalHistoryState, '', `#${modalType}-${id}`);
}

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #C0C0C0');
console.log('%c MUHAMMAD ZAVIER RIZKAYANTO', 'color: #C0C0C0; font-size: 18px; font-weight: bold;');
console.log('%c Interactive Workshop Portfolio', 'color: #C0C0C0; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #C0C0C0');
console.log('%c 🔧 20+ Workshop Circuits', 'color: #C0C0C0;');
console.log('%c 🏆 Next/Prev Navigation', 'color: #C0C0C0;');
console.log('%c ⬅️ Back Button Support', 'color: #C0C0C0;');
