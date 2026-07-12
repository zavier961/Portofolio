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
// STATE MANAGEMENT & PERFORMANCE CACHE
// ============================================
let currentFilter = 'all';
let currentWorkshopIndex = 0;
let currentWorkshopCategory = null;
let modalHistoryState = null;

// Convert massive Base64 strings to memory-efficient Blob URLs instantly
const blobCache = new Map();
function getBlobUrl(base64Data) {
    if (!base64Data || !base64Data.startsWith('data:')) return base64Data;
    if (blobCache.has(base64Data)) return blobCache.get(base64Data);

    try {
        const arr = base64Data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);
        blobCache.set(base64Data, url);
        return url;
    } catch (e) {
        return base64Data;
    }
}

// ============================================
// CERTIFICATES DATABASE
// ============================================
const defaultCertificates = [
    {
        "id": 1,
        "title": "4th Runner Up - Scientific Paper FUSE 2025 (Polman Bandung)",
        "category": "science",
        "badge": "Scientific Paper",
        "description": "Teknologi Hibrid Elektrokoagulasi-Flotasi dan Biomedikal untuk Pemurnian Limbah Cair",
        "certImage": "",
        "evidenceImages": [
            "",
            "",
            ""
        ],
        "pdfLink": "./asset/Zahavir_SMKN4JAKARTA_FullPaper_TEKNOLOGI HIBRID ELEKTROKOAGULASI-FLOTASI DAN BIOMEDIKAL UNTUK SOLUSI PEMURNIAN LIMBAH CAIR BERKELANJUTAN.pdf",
        "theoryText": "Integrasi metode pra-perlakuan agen biomedikal (Eco-Enzyme & EM4) dengan proses elektrokoagulasi in situ untuk pemisahan flok polutan secara berkelanjutan.",
        "toolText": "Sistem Elektrokoagulasi-Flotasi (EC-F), Reaktor Biomedikal, Elektroda Fe/Al, Agen Bioremediasi (Eco-Enzyme/EM4), Alat ukur parameter COD/BOD/TSS.",
        "story": "Penelitian ini berfokus pada solusi pemurnian limbah cair di pintu air perkotaan yang kronis. Kami mengusulkan teknologi hibrid yang menggabungkan proses biologi (bioremediasi) dan elektrokimia. Tantangan utamanya adalah memecah molekul polutan yang sulit diurai (recalcitrant) agar lebih mudah diproses secara alami. Dengan sistem ini, kami berhasil merumuskan metode yang tidak hanya hemat energi, tetapi juga mampu mengurangi volume lumpur limbah hingga 50% dibandingkan metode kimia konvensional.",
        "documentation": "Detail Proyek: Sistem pengolahan limbah cair hibrid. Mekanisme: Pra-perlakuan biomedikal dilanjutkan dengan Elektrokoagulasi untuk penggumpalan polutan dan Flotasi untuk pemisahan fase. Keunggulan: Efisiensi penurunan COD (87.73%) dan TSS (92.52%) hingga di bawah baku mutu Permen LH No. 5 Th 2014. Tim: Muhammad Zavier Rizkayanto, Azahid Pramudya Al Ghifahri, Harold Daniel Metcalf Siregar. Pembimbing: Mochammad Aldi Mauludin.",
        "dateObtained": "2025-11-15",
        "videoEmbed": ""
    },
    {
        "id": 2,
        "title": "2nd Place - IoT Competition TENNOVEX 2025",
        "category": "robotics",
        "badge": "Internet of Things",
        "description": "Sistem Peringatan Penebangan Liar (SIPEGA-IoT)",
        "certImage": "",
        "evidenceImages": [
            "",
            "",
            ""
        ],
        "pdfLink": "./asset/its/Sinergi Hijau_SMKN4JAKARTA_PAPER_Rancang Bangun SIPEGA-IoT (Sistem Peringatan Penebangan Liar) Menggunakan Sensor Akustik dan Akselerometer 3-Sumbu Terintegrasi GPS dan Self-Sustaining Power.pdf",
        "theoryText": "Sistem deteksi deforestasi berbasis IoT menggunakan sensor akustik (suara gergaji mesin) dan akselerometer 3-sumbu untuk mendeteksi getaran pohon tumbang secara real-time.",
        "toolText": "ESP32, Sensor Akustik, Akselerometer ADXL345, GPS Neo-6M, Panel Surya (Self-Sustaining Power), SMS.",
        "story": "Proyek SIPEGA-IoT dirancang untuk mengatasi masalah pembalakan liar yang sulit dipantau di area hutan luas. Tantangan utama kami adalah memastikan perangkat tetap menyala secara mandiri menggunakan sistem tenaga surya dan mampu membedakan suara gergaji mesin dari suara bising hutan lainnya. Keberhasilan kami dalam mengintegrasikan sensor getaran dan koordinat GPS memungkinkan respons cepat dari pihak berwenang saat terjadi aktivitas ilegal.",
        "documentation": "Spesifikasi Sistem: Mikrokontroler ESP32 dengan konektivitas Wi-Fi/LoRa. Sensor: Analog Sound Sensor & ADXL345 3-Axis Accelerometer. Penentuan Lokasi: GPS Neo-6M module. Daya: Baterai Li-ion dengan pengisian daya otomatis melalui Panel Surya 5V. Fitur: Notifikasi instan melalui SMS yang menyertakan lokasi titik koordinat kejadian. Kompetisi: Lomba Internet of Things TENNOVEX 2025, Institut Teknologi Sepuluh Nopember (ITS).",
        "dateObtained": "2025-11-08",
        "videoEmbed": ""
    },
    {
        "id": 3,
        "title": "2nd Place - Electrical Innovation UIKA Bogor 2025",
        "category": "robotics",
        "badge": "Machine Learning & IoT",
        "description": "Sistem Peringatan Penebangan Liar Berbasis AI dengan Notifikasi SMS",
        "certImage": "",
        "evidenceImages": [
            "",
            "",
            ""
        ],
        "pdfLink": "Pengembangan_SIPEGA_IoT_AI_SMS.pdf",
        "theoryText": "Penerapan Edge AI untuk sensor fusion antara data akustik dan getaran. Sistem menggunakan logika klasifikasi untuk memastikan validitas ancaman sebelum mengirim peringatan.",
        "toolText": "ESP32, Sensor Suara, Akselerometer ADXL345, SIM800L GSM Module (SMS), GPS Neo-6M, TinyML, Solar Power.",
        "story": "Pengembangan versi kedua ini difokuskan pada akurasi deteksi di lapangan. Kami mengintegrasikan Machine Learning untuk menganalisis pola frekuensi suara gergaji dan getaran pohon secara bersamaan. Peringatan hanya akan dikirimkan melalui SMS jika kedua sensor mendeteksi aktivitas secara sinkron. Penggunaan SMS dipilih untuk menjamin notifikasi tetap terkirim meskipun di area hutan dengan sinyal internet (data) yang minim, sehingga lebih reliabel dibandingkan aplikasi chat.",
        "documentation": "Update Spesifikasi: Logika verifikasi 'Dual-Trigger' berbasis Machine Learning. Modul Komunikasi: SIM800L untuk SMS Alert real-time. Fitur Keamanan: Notifikasi menyertakan koordinat GPS lokasi kejadian. Power: Sistem mandiri dengan Panel Surya dan manajemen daya Deep Sleep untuk operasional jangka panjang di area terpencil.",
        "dateObtained": "2025-12-06",
        "videoEmbed": ""
    },
    {
        "id": 4,
        "title": "Participant - Southeast Asian Waste Hero Awards 2023",
        "category": "environmental research",
        "badge": "Environmental Innovation",
        "description": "Inovasi Pengolahan Limbah Styrofoam menjadi Wastafel Ramah Lingkungan",
        "certImage": "./asset/seameo/Certificate_Participation_SE Asian Waste Hero Awards_2023 - Muhammad Zavier Rizkayanto.jpg",
        "videoEmbed": "https://www.youtube.com/embed/fvaaRvo3uwo",
        "pdfLink": "Inovasi_Wastafel_Styrofoam_SEAMEO.pdf",
        "theoryText": "Pemanfaatan teknik pelelehan Styrofoam (Polystyrene) menggunakan minyak jelantah sebagai pelarut alami untuk menciptakan material komposit yang kuat dan water-resistant.",
        "toolText": "Limbah Styrofoam, Minyak Jelantah, Cetakan Wastafel, Kompor/Pemanas, Semen (sebagai pengeras tambahan).",
        "story": "Mewakili SMPN 121 Jakarta Utara dalam kompetisi regional Asia Tenggara. Proyek ini bermula dari keprihatinan saya terhadap limbah styrofoam di sekitar Pasar Koja yang sulit terurai. Saya bereksperimen menggunakan minyak jelantah untuk melarutkan styrofoam tersebut hingga menjadi pasta material yang bisa dibentuk kembali. Inovasi ini mengubah sampah yang mencemari lingkungan menjadi barang sanitasi yang fungsional dan tahan lama.",
        "documentation": "Penyelenggara: SEAMEO SEPS & Indorama Ventures PCL. Fokus: Circular Economy & Waste Management. Lokasi Riset: Pasar Koja & Lab SMPN 121 Jakarta.",
        "dateObtained": "2023-10-10",
        "evidenceImages": []
    },
    {
        "id": 5,
        "title": "Grand Finalist - National Literacy & Numeracy Competition 2024",
        "category": "academic",
        "badge": "National Finalist",
        "description": "Finalis Nasional Kategori SMK Kelas 10 - UNJ",
        "certImage": [
            "./asset/Finalist_Literacy_Numeracy_National_2024 - Muhammad Zavier Rizkayanto.pdf.jpg",
            "./asset/2.jpg"
        ],
        "evidenceImages": [
            "unj-final-stage.jpg",
            "unj-presentation.jpg",
            "unj-competition-news.jpg"
        ],
        "pdfLink": "https://www.detik.com/edu/edutainment/d-7663696/kompetisi-literasi-numerasi-nasional-2024-unj-diikuti-43-ribuan-siswa-ini-juaranya",
        "theoryText": "Kompetisi tingkat nasional yang menguji kemampuan Higher Order Thinking Skills (HOTS) dalam literasi dan numerasi.",
        "toolText": "Logical Reasoning, Critical Thinking, Oral Presentation, Problem Solving.",
        "story": "Berhasil terpilih sebagai Finalis Nasional dari total lebih dari 43.000 peserta di seluruh Indonesia. Pencapaian ini diraih melalui proses seleksi berlapis, mulai dari tingkat internal sekolah hingga babak penyisihan nasional. Pada tahap Grand Final, saya menjalani ujian daring dengan protokol pengawasan ganda (dual-camera setup) yang ketat. Pengalaman utama meliputi presentasi logika pemecahan masalah secara langsung di hadapan dewan juri pada sesi tes lisan.",
        "documentation": "Penyelenggara: Universitas Negeri Jakarta (UNJ). Status: Finalis Nasional (Kategori SMK Kelas 10). Tahapan: Seleksi Internal, Penyisihan, Semifinal, Grand Final (LCMS & Tes Lisan). Kompetisi ini menguji kemampuan analisis teks kompleks dan pemecahan masalah matematika tingkat tinggi.",
        "dateObtained": "2024-10-18",
        "videoEmbed": ""
    },
    {
        "id": 6,
        "title": "1st Winner - LKTI Appropriate Technology STIP Jakarta 2026",
        "category": "science",
        "badge": "Scientific Paper",
        "description": "Inovasi Polybag Biodegradable Cangkang Kerang-Eceng Gondok bagi Ekosistem Mangrove Berkelanjutan",
        "certImage": [
            "asset/STIP/Certificate_1st Winner_LKTI Appropriate Technology_STIP Jakarta_20-21 Feb 2026_Muhammad Zavier Rizkayanto-1_result.webp",
            "asset/STIP/Certificate_1st Winner_LKTI Appropriate Technology_STIP Jakarta_20-21 Feb 2026_Muhammad Zavier Rizkayanto-2_result.webp",
            "asset/STIP/Certificate_1st Winner_LKTI Appropriate Technology_STIP Jakarta_20-21 Feb 2026_Muhammad Zavier Rizkayanto-3_result.webp"
        ],
        "evidenceImages": [
            "asset/STIP/1_result_result.webp",
            "asset/STIP/2_result_result.webp",
            "asset/STIP/3_result_result.webp",
            "asset/STIP/4_result_result.webp"
        ],
        "pdfLink": "./asset/STIP/Sendy Fokus Crypto_SMKN4JAKARTA_Karya Tulis Ilmiah_Inovasi Polybag Biodegradable Cangkang Kerang-Eceng Gondok bagi Ekosistem Mangrove Berkelanjutan.pdf",
        "theoryText": "Pemanfaatan komposit serat eceng gondok sebagai matriks organik dan kalsium karbonat (CaCO3) dari limbah cangkang kerang sebagai filler mekanis untuk menciptakan polybag ramah lingkungan.",
        "toolText": "Limbah Cangkang Kerang (Anadara granosa), Eceng Gondok (Eichhornia crassipes), Pati Tapioka (Perekat), Cetakan Polybag, Mesin Penggiling, Uji Biodegradabilitas.",
        "story": "Proyek ini berangkat dari keprihatinan terhadap tingginya residu sampah plastik polybag di wilayah pesisir saat restorasi mangrove. Kami mengembangkan inovasi wadah semai yang dapat terurai secara alami dan sekaligus menutrisi tanah. Tantangan terbesarnya adalah menemukan rasio campuran yang tepat agar polybag cukup kuat menahan air namun tetap cepat terurai setelah ditanam. Hasilnya, inovasi ini berhasil memenangkan Juara 1 dalam kategori Teknologi Tepat Guna di STIP Jakarta.",
        "documentation": "Detail Proyek: Inovasi Polybag Biodegradable. Mekanisme: Sinergi cangkang kerang sebagai penguat struktur dan eceng gondok sebagai serat organik. Keunggulan: Ramah lingkungan, mendukung restorasi mangrove tanpa sampah plastik, dan memanfaatkan limbah invasif. Tim: Muhammad Zavier Rizkayanto, Azahid Pramudya Al Ghifahri, Sendy Yasho. Pembimbing: Mochammad Aldi Mauludin.",
        "dateObtained": "2026-02-20",
        "videoEmbed": ""
    },
    {
        "id": 7,
        "title": "2nd Place & Gold Medal - National Scientific Paper AMPIBI XIX (Puspresnas ★★★)",
        "category": "science",
        "badge": "Scientific Paper",
        "description": "Sistem LODAYA GUARD: Pemantau Hutan Pintar dengan Transmisi Long Range",
        "certImage": "asset/ampibi/Juara 2 LKTI- Muhammad Zavier Rizkayanto.webp",
        "evidenceImages": [
            "asset/ampibi/desain 3d.webp",
            "asset/ampibi/nilai final.webp",
            "asset/ampibi/puspresnas.webp"
        ],
        "pdfLink": "./asset/ampibi/MuhammadZavierRizkayanto,SISTEM_LODAYA_GUARD PEMANTAU_HUTAN_PINTAR_DENGAN_TRANSMISI_LONGRANGE_SMKN 4 JAKARTA_KTI AMPIBI2026.pdf",
        "theoryText": "Implementasi Artificial Intelligence (TinyML) pada edge computing untuk deteksi audio-visual ilegal logging, diintegrasikan dengan protokol komunikasi LoRa (Long Range) untuk transmisi data jarak jauh pada area blank spot.",
        "toolText": "ESP32-S3 Sense,Modul kamera 5MP, Modul LoRa (SX1276), Sensor Akustik, Antena Gain Tinggi, TinyML Model (Edge Impulse), Gateway IoT.",
        "story": "Proyek ini dirancang sebagai solusi atas tingginya angka deforestasi dan keterbatasan sinyal di hutan pedalaman Indonesia. Kami mengembangkan 'Lodaya Guard', perangkat cerdas yang mampu mengenali suara gergaji mesin dan aktivitas mencurigakan secara real-time menggunakan kecerdasan buatan (TinyML) langsung di perangkat. Tantangan utama yang kami selesaikan adalah bagaimana mengirimkan peringatan dari tengah hutan tanpa sinyal internet, yang kami pecahkan dengan teknologi LoRa. Prestasi ini diakui sebagai Juara 2 tingkat Nasional dengan kurasi Puspresnas Bintang 3.",
        "documentation": "Detail Proyek: Sistem keamanan hutan berbasis IoT & AI. Mekanisme: Perangkat mendeteksi anomali suara/visual -> Klasifikasi lokal dengan TinyML -> Transmisi peringatan via LoRa ke pos pusat. Keunggulan: Konsumsi daya sangat rendah, jangkauan transmisi hingga beberapa kilometer, dan mampu beroperasi secara otonom. Tim: Muhammad Zavier Rizkayanto, Azahid Pramudya Al Ghifahri, Sendy Yasho. Pembimbing: Mochammad Aldi Mauludin.",
        "dateObtained": "2026-04-27",
        "videoEmbed": ""
    },
    {
        "id": 8,
        "title": "1st Place & Best Presentation – Lomba Karya Tulis Ilmiah Nasional IDEA #9 Universitas Negeri Jakarta (UNJ)",
        "category": "science",
        "badge": "Scientific Paper",
        "dateObtained": "2026-07-05",
        "description": "Pengembangan platform laboratorium mekatronika portabel berbasis ESP32 dengan sistem sensor modular plug-and-play tanpa internet (standalone) untuk memfasilitasi 8 modul eksperimen sains lintas rumpun (Fisika, Kimia, Biologi) di wilayah 3T.",
        "theoryText": "Mengintegrasikan prinsip modularitas perangkat keras dan arsitektur embedded system berdaya rendah menggunakan ESP32 (MCU 32-bit, 240 MHz) untuk menggantikan keterbatasan infrastruktur laboratorium konvensional. Sistem memanfaatkan metode sampling FFT (Fast Fourier Transform) untuk analisis gelombang fisik serta sirkuit akuisisi data real-time untuk pemantauan parameter elektrokimia dan biologis.",
        "toolText": "Mikrokontroler ESP32-WROOM-32, Layar OLED 0.96\" I2C, Sensor Mikrofon MAX4466, Waterproof Probe DS18B20, Barometer BMP280, Modul Elektroda pH Analog, Sensor Turbiditas, Sensor Gas MQ-135, Probe TDS Meter, Sensor Kelembaban DHT22, Custom PCB, Casing 3D Printed (PLA).",
        "story": "Kesenjangan sarana laboratorium IPA di wilayah 3T (Tertinggal, Terdepan, Terluar) Indonesia berdampak langsung pada rendahnya pemahaman sains taktil siswa akibat absennya praktikum nyata. Solusi digital berbasis cloud sering kali gagal diterapkan karena kendala internet. Didorong oleh tantangan struktural ini, kami merancang Omni-Sci Sensoric Board, sebuah laboratorium berbentuk koper mekatronika portabel yang berjalan sepenuhnya secara offline (standalone).\n\nTantangan terbesar kami adalah menyatukan delapan skenario eksperimen multi-rumpun (mulai dari titrasi asam-basa hingga uji fotosintesis tanaman lokal) ke dalam satu papan terpadu tanpa membuat kabel berantakan. Melalui pendekatan arsitektur modular, kami berhasil menekan biaya produksi hingga hanya Rp580.000 per unit—kurang dari 1% investasi laboratorium kimia-fisika konvensional. Inovasi ini membuahkan hasil luar biasa di ajang LKTIN IDEA #9 UNJ 2026, di mana kami tidak hanya menyabet gelar Juara 1 Nasional di subtema Inovasi Pembelajaran, melainkan juga dianugerahi penghargaan Best Presentation atas pemaparan solusi yang dinilai sangat aplikatif bagi target SDGs Poin 4.",
        "documentation": "Detail Proyek: Platform pemelajaran STEM portabel all-in-one berbentuk koper interaktif untuk daerah minim infrastruktur.\n\nMekanisme & Fitur: Dilengkapi fitur otomatisasi deteksi sensor (auto-detect plug-and-play) yang langsung menyesuaikan menu pada layar OLED. Menyediakan \"Sains Quest Mode\" berbasis gamifikasi interaktif untuk melatih logika berpikir kritis siswa menggunakan bahan alam di sekitar sekolah.\n\nDampak & Efisiensi: Mampu memotong biaya pengadaan lab konvensional yang mencapai puluhan juta rupiah; analisis cost-effectiveness membuktikan bahwa dengan anggaran Rp10 juta, sekolah dapat memproduksi hingga 17 unit alat yang sanggup mengakomodasi praktikum bagi 34 siswa secara berpasangan.\n\nTim Pengembang: Muhammad Zavier Rizkayanto (Ketua), Azahid Pramudya Al Ghifahri (Anggota).\n\nGuru Pembimbing: Alwisman.\n\nInstitusi: SMKN 4 Jakarta.",
        "videoEmbed": "",
        "pdfLink": "asset/idea 9/SISWA_Subtema Inovasi Pembelajaran_Muhammad Zavier Rizakaynto_SMKN 4 JAKARTA_OMNI-SCI SENSORIC BOARD.pdf",
        "certImage": [
            "asset/idea 9/1-1_result.webp",
            "asset/idea 9/Salinan Best Presentation Siswa-1-1_result.webp"
        ],
        "evidenceImages": [
            "asset/idea 9/WhatsApp Image 2026-07-12 at 11.16.50_result.webp",
            "asset/idea 9/WhatsApp Image 2026-07-11 at 18.15.35_result.webp",
            "asset/idea 9/Screenshot 2026-07-12 110520_result.webp",
            "asset/idea 9/Screenshot 2026-07-12 110439_result.webp"
        ]
    }
];

// ============================================
// PROJECTS DATABASE
// ============================================
const defaultProjects = [
    {
        "id": 1,
        "title": "Project Title",
        "category": "Category / Technology",
        "desc": "Brief description of your project goes here. Highlight the key challenges, solutions, and technologies used.",
        "tags": "Tag 1, Tag 2, Tag 3",
        "image": ""
    }
];

let certificatesData = defaultCertificates;
let projectsData = defaultProjects;

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Sort projects by date (newest first)
    const sortedProjects = [...projectsData].sort((a, b) => new Date(b.dateObtained || '2000-01-01') - new Date(a.dateObtained || '2000-01-01'));

    sortedProjects.forEach(proj => {
        const tagHTML = (proj.tags || '').split(',').map(tag => tag.trim()).filter(tag => tag).map(tag =>
            `<span class="bg-chrome-silver/10 text-chrome-silver/80 text-xs px-3 py-1 rounded">${tag}</span>`
        ).join('');

        const dateStr = proj.dateObtained ? new Date(proj.dateObtained).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : '';
        const optimizedImg = proj.image ? getBlobUrl(proj.image) : '';

        grid.innerHTML += `
            <div class="project-card bg-chrome-silver/5 border border-chrome-silver/20 rounded-lg p-6 hover:border-chrome-silver/50 transition-all duration-300" style="will-change: transform; transform: translateZ(0); backface-visibility: hidden;">
                ${optimizedImg ? `<img src="${optimizedImg}" loading="lazy" class="w-full h-48 object-cover rounded mb-4" style="will-change: transform; transform: translateZ(0);">` : ''}
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        ${dateStr ? `<p class="text-xs text-chrome-silver/50 mb-1 font-montserrat tracking-wider">${dateStr}</p>` : ''}
                        <h3 class="text-xl font-montserrat font-bold text-chrome-silver mb-2">${proj.title}</h3>
                        <p class="text-chrome-silver/60 text-sm">${proj.category}</p>
                    </div>
                </div>
                <p class="text-chrome-silver/70 text-sm mb-4">${proj.desc}</p>
                <div class="flex flex-wrap gap-2 mb-4">${tagHTML}</div>
                <div class="flex gap-3">
                    <a href="#" class="text-chrome-silver/60 hover:text-chrome-silver text-sm transition">View Details →</a>
                </div>
            </div>
        `;
    });
}

// ============================================
// FILE HANDLER - Open or Download Files
// ============================================
function openOrDownloadFile(fileUrl, defaultName = 'Document.pdf') {
    if (!fileUrl || fileUrl === '#') return;

    // Handle Blob or Data URLs reliably across all devices
    if (fileUrl.startsWith('blob:') || fileUrl.startsWith('data:')) {
        try {
            // Attempt to View the PDF in a new tab first (Works on Desktop & Android Chrome)
            const newWindow = window.open(fileUrl, '_blank');
            if (!newWindow) {
                // If popup blocker stops it, fallback to download immediately
                throw new Error("Popup blocked");
            }
        } catch (e) {
            // Fallback: Download the file (Required for iOS Safari and strict browsers)
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = defaultName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        return;
    }

    // If it's an external link (http/https), just open it
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
        return;
    }

    // For local files, try to open in new tab/window
    try {
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('Error opening file:', error);
        // Fallback: try downloading
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop() || defaultName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// ============================================
// IMAGE LIGHTBOX SYSTEM
// ============================================
let lightboxImages = [];
let currentLightboxIndex = 0;

function initLightbox() {
    const lightboxOverlay = document.getElementById('image-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxImage = document.getElementById('lightbox-image');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });

    // Swipe Support for Lightbox
    if (lightboxImage) {
        let touchstartX = 0;
        let touchendX = 0;

        lightboxImage.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxImage.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleLightboxSwipe();
        }, { passive: true });

        function handleLightboxSwipe() {
            const threshold = 50;
            if (touchendX < touchstartX - threshold) {
                navigateLightbox(1); // Swipe left = next
            } else if (touchendX > touchstartX + threshold) {
                navigateLightbox(-1); // Swipe right = prev
            }
        }
    }
}

function navigateLightbox(direction) {
    if (!lightboxImages || lightboxImages.length <= 1) return;

    currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
    updateLightboxDisplay();
}

function updateLightboxDisplay() {
    const lightboxImage = document.getElementById('lightbox-image');
    if (!lightboxImage) return;

    // Fade out
    lightboxImage.style.opacity = 0;

    setTimeout(() => {
        lightboxImage.src = lightboxImages[currentLightboxIndex];
        updateLightboxCounter();

        // Fade in
        setTimeout(() => {
            lightboxImage.style.opacity = 1;
        }, 50);
    }, 300);
}

function openLightbox(imageSrc, imageList = []) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Set images array
    lightboxImages = imageList.length > 0 ? imageList : [imageSrc];

    // Find index by matching the end of the URL (to handle absolute vs relative paths)
    currentLightboxIndex = lightboxImages.findIndex(img => {
        if (typeof img !== 'string') return false;
        // Strip leading ./ and compare
        const normalizedImg = img.replace(/^\.\//, '');
        return imageSrc.endsWith(normalizedImg);
    });

    if (currentLightboxIndex === -1) {
        currentLightboxIndex = 0;
    }

    // Toggle nav buttons based on image count
    if (lightboxImages.length > 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'flex';
        if (lightboxNext) lightboxNext.style.display = 'flex';
    } else {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
    }

    lightboxImage.src = lightboxImages[currentLightboxIndex];
    lightboxImage.style.opacity = 1;
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
    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
    }
}

function attachLightboxToImage(img, imageList = []) {
    img.style.cursor = 'zoom-in';
    img.onclick = (e) => {
        e.stopPropagation();
        openLightbox(img.src, imageList);
    };
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async function () {
    console.log('%c⚙️ Interactive Workshop Portfolio Loaded', 'color: #C0C0C0; font-size: 16px; font-weight: bold;');

    // Mobile Menu Toggle - IMPROVED
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileToggle && mobileMenu) {
        // Toggle menu visibility on hamburger click
        // Mobile Menu Toggle
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.toggle('hidden');
            const isActive = mobileMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', !isHidden);
            mobileToggle.style.opacity = isHidden ? '1' : '0';
            mobileToggle.style.pointerEvents = isHidden ? 'auto' : 'none';
        });

        // Close menu on close button click
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.style.opacity = '1';
                mobileToggle.style.pointerEvents = 'auto';
            });
        }

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow navigation to happen
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.style.opacity = '1';
                mobileToggle.style.pointerEvents = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.add('hidden');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.style.opacity = '1';
                    mobileToggle.style.pointerEvents = 'auto';
                }
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.style.opacity = '1';
                mobileToggle.style.pointerEvents = 'auto';
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
    renderProjects();

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
    const sections = document.querySelectorAll('section[id]');
    let isTicking = false;

    // Fast scroll event for navbar background using requestAnimationFrame
    window.addEventListener('scroll', function () {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true }); // passive flag for smooth scrolling

    // High performance section tracking using IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === currentId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
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
    if (!grid) return;
    const existingCards = grid.querySelectorAll('.certificate-card');
    existingCards.forEach(card => card.classList.add('fade-out'));

    setTimeout(() => {
        grid.innerHTML = '';
        let filtered = filter === 'all' ? certificatesData : certificatesData.filter(cert => cert.category === filter);

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.dateObtained || '2000-01-01') - new Date(a.dateObtained || '2000-01-01'));

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

    const dateStr = cert.dateObtained ? new Date(cert.dateObtained).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : '';

    card.innerHTML = `
        <div class="certificate-badge">${cert.badge}</div>
        ${dateStr ? `<p class="text-xs text-chrome-silver/50 mb-1 mt-4 font-montserrat tracking-wider">${dateStr}</p>` : ''}
        <h3 class="certificate-title ${dateStr ? 'mt-1' : ''}">${cert.title}</h3>
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
let currentCertIndex = 0;
let currentCertImageList = [];

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
            e.preventDefault();
            e.stopPropagation();

            // Get current pdf link from the button
            const pdfUrl = downloadBtn.getAttribute('href');
            const certTitle = document.getElementById('modal-title').textContent || 'Certificate';

            // Clean title for filename (remove invalid characters)
            const safeTitle = certTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            openOrDownloadFile(pdfUrl, `${safeTitle}.pdf`);
        });
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.cert-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
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

    // MAIN CERTIFICATE CAROUSEL CONTROLS
    const certPrevBtn = document.getElementById('cert-carousel-prev');
    const certNextBtn = document.getElementById('cert-carousel-next');

    if (certPrevBtn) {
        certPrevBtn.addEventListener('click', () => navigateCertCarousel(-1));
    }
    if (certNextBtn) {
        certNextBtn.addEventListener('click', () => navigateCertCarousel(1));
    }

    // SWIPE SUPPORT FOR CERTIFICATE CAROUSEL
    const certFrameWrapper = document.getElementById('cert-frame-wrapper');
    if (certFrameWrapper) {
        let touchstartX = 0;
        let touchendX = 0;

        certFrameWrapper.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        certFrameWrapper.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            const threshold = 50;
            if (touchendX < touchstartX - threshold) {
                navigateCertCarousel(1); // Swipe left = next
            } else if (touchendX > touchstartX + threshold) {
                navigateCertCarousel(-1); // Swipe right = prev
            }
        }, { passive: true });
    }
}

function navigateCertCarousel(direction) {
    if (!currentCertImageList || currentCertImageList.length <= 1) return;

    currentCertIndex = (currentCertIndex + direction + currentCertImageList.length) % currentCertImageList.length;
    updateCertCarouselDisplay();
}

function updateCertCarouselDisplay() {
    if (!currentCertImageList || currentCertImageList.length === 0) return;

    const certImage = document.getElementById('modal-cert-image');
    const indicators = document.querySelectorAll('#cert-carousel-indicators .carousel-indicator');

    certImage.style.opacity = 0;

    setTimeout(() => {
        // Use Blob URL to eliminate decoding lag
        const srcUrl = getBlobUrl(currentCertImageList[currentCertIndex]);
        certImage.src = srcUrl;

        certImage.onclick = (e) => {
            e.stopPropagation();
            openLightbox(srcUrl, currentCertImageList.map(img => getBlobUrl(img)));
        };

        setTimeout(() => {
            certImage.style.opacity = 1;
        }, 50);

        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === currentCertIndex);
        });
    }, 300);
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
        // Change image source efficiently via Blob
        evidenceImage.src = getBlobUrl(cert.evidenceImages[currentCarouselIndex]);

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

    // Handle case where certImage is an array
    const certImageSrcRaw = Array.isArray(cert.certImage) ? cert.certImage[0] : cert.certImage;
    const certImageList = Array.isArray(cert.certImage) ? cert.certImage : [cert.certImage];

    // Fast Blob Conversion
    const certImageSrc = getBlobUrl(certImageSrcRaw);

    currentCertIndex = 0;
    currentCertImageList = certImageList;

    certImage.src = certImageSrc;
    // Hardware acceleration for the modal image container
    certImage.style.willChange = 'transform, opacity';
    certImage.style.transform = 'translateZ(0)';
    certImage.style.backfaceVisibility = 'hidden';
    certImage.style.opacity = 1;
    certImage.onerror = () => certImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%231A1A1A"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23C0C0C0" font-size="14"%3E${cert.title}%3C/text%3E%3C/svg%3E`;

    // Attach lightbox to certificate image using onclick to avoid multiple event listeners
    certImage.style.cursor = 'zoom-in';
    certImage.onclick = (e) => {
        e.stopPropagation();
        openLightbox(certImageSrc, certImageList.map(img => getBlobUrl(img)));
    };

    // Main Certificate Navigation & Indicators UI update
    const certPrevBtn = document.getElementById('cert-carousel-prev');
    const certNextBtn = document.getElementById('cert-carousel-next');
    const certIndicators = document.getElementById('cert-carousel-indicators');

    if (certImageList.length > 1) {
        if (certPrevBtn) certPrevBtn.style.display = 'flex';
        if (certNextBtn) certNextBtn.style.display = 'flex';
        if (certIndicators) {
            certIndicators.style.display = 'flex';
            certIndicators.innerHTML = '';
            certImageList.forEach((_, idx) => {
                const ind = document.createElement('div');
                ind.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
                ind.onclick = () => {
                    currentCertIndex = idx;
                    updateCertCarouselDisplay();
                };
                certIndicators.appendChild(ind);
            });
        }
    } else {
        if (certPrevBtn) certPrevBtn.style.display = 'none';
        if (certNextBtn) certNextBtn.style.display = 'none';
        if (certIndicators) {
            certIndicators.style.display = 'none';
            certIndicators.innerHTML = '';
        }
    }

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
        downloadBtn.href = cert.pdfLink.startsWith('http') ? cert.pdfLink : getBlobUrl(cert.pdfLink);
        downloadBtn.target = '_blank';
        downloadBtn.removeAttribute('download');
    } else {
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.textContent = 'Download / View Paper';
        downloadBtn.href = cert.pdfLink.startsWith('http') ? cert.pdfLink : getBlobUrl(cert.pdfLink);
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
        // Initial setup for evidence
        evidenceImage.src = getBlobUrl(evidenceImages[0]);
        evidenceImage.style.willChange = 'transform, opacity';
        evidenceImage.style.transform = 'translateZ(0)';

        evidenceImage.onclick = (e) => {
            e.stopPropagation();
            openLightbox(getBlobUrl(evidenceImages[currentCarouselIndex]), evidenceImages.map(img => getBlobUrl(img)));
        };
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

        // SKIP PNEUMATICS - Handled by separate module
        if (category === 'pneumatics') return;

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
