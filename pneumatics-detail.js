// Project data structure - tinggal isi dengan konten yang diperlukan
const projectsDetail = {
    'valve-assembly': {
        code: 'PN-01',
        title: 'Valve Assembly A-1',
        breadcrumb: 'Valve Assembly',
        type: 'Pure Pneumatic',
        tags: ['Pure Pneumatic', 'Air Logic', 'Industrial Grade'],
        mainImage: './asset/pneumatic/valve-assembly.jpg',
        mediaLabel: 'System Documentation',
        mediaTitle: 'Valve Assembly Operation',
        objective: 'Pure pneumatic airflow modulation system designed for heavy industrial applications. This valve assembly features non-electric regulation mechanisms optimized for continuous operation in demanding manufacturing environments with precise pressure control.',
        specs: [
            { label: 'Operating Pressure', value: '6.0 bar' },
            { label: 'Flow Rate', value: '120 L/min' }
        ],
        schematic: './asset/pneumatic/valve-schematic.jpg',
        schematicRev: 'REV 2.0',
        simulation: './asset/pneumatic/valve-simulation.jpg',
        problem: 'During initial assembly, pressure fluctuations caused inconsistent valve response times, leading to airflow instability in downstream components.',
        solution: 'Implemented a regulator module and installed check valves at each inlet port. This stabilized pressure variation to ±0.2 bar and improved response time by 40%.',
        metrics: [
            { label: 'Old Pressure Swing', value: '±0.8 bar', color: 'red' },
            { label: 'New Pressure Swing', value: '±0.2 bar', color: 'green' }
        ]
    },
    'solenoid-piston': {
        code: 'EP-02',
        title: 'Solenoid Piston',
        breadcrumb: 'Solenoid Piston',
        type: 'Electro-Pneumatic',
        tags: ['Electro-Pneumatic', 'Dual Action', 'Rapid Cycling'],
        mainImage: './asset/pneumatic/solenoid-piston.jpg',
        mediaLabel: 'Live Demonstration',
        mediaTitle: 'Dual-Action Cylinder Operation',
        objective: 'Dual-action cylinder mechanics driven by electro-pneumatic solenoids for rapid industrial cycling. This system enables precise electronic control of pneumatic cylinders with electromagnetic actuation at millisecond response times.',
        specs: [
            { label: 'Operating Pressure', value: '6.0 bar' },
            { label: 'Cycle Time', value: '2.8 sec' }
        ],
        schematic: './asset/pneumatic/solenoid-schematic.jpg',
        schematicRev: 'REV 1.5',
        simulation: './asset/pneumatic/solenoid-simulation.jpg',
        problem: 'Solenoid overheating during extended operation caused coil burnout after 8 hours of continuous use, reducing system availability.',
        solution: 'Upgraded to PWM-controlled duty cycle management and installed heat dissipation fins. Also added thermal monitoring circuit. Extended operational time to 48+ hours without failure.',
        metrics: [
            { label: 'Old MTBF', value: '8 hours', color: 'red' },
            { label: 'New MTBF', value: '48+ hours', color: 'green' }
        ]
    },
    'airflow-regulator': {
        code: 'PN-03',
        title: 'Airflow Regulator',
        breadcrumb: 'Airflow Regulator',
        type: 'Pure Pneumatic',
        tags: ['Pure Pneumatic', 'Micro Adjustment', 'Regulation'],
        mainImage: './asset/pneumatic/airflow-regulator.jpg',
        mediaLabel: 'Precision Control',
        mediaTitle: 'Airflow Adjustment Mechanism',
        objective: 'Mechanical micro-adjustment system for sensitive pure pneumatic environments. This regulator provides fine-grain control over airflow without electronic intervention, perfect for precision applications.',
        specs: [
            { label: 'Pressure Range', value: '0-10 bar' },
            { label: 'Adjustment Resolution', value: '0.1 bar' }
        ],
        schematic: './asset/pneumatic/regulator-schematic.jpg',
        schematicRev: 'REV 2.2',
        simulation: './asset/pneumatic/regulator-simulation.jpg',
        problem: 'Manual adjustment was imprecise, requiring constant recalibration due to pilot pressure variations in the main supply.',
        solution: 'Added pilot-operated relief valve and integrated compensator. Pressure variance reduced to ±0.05 bar with self-compensating design.',
        metrics: [
            { label: 'Old Variance', value: '±0.3 bar', color: 'red' },
            { label: 'New Variance', value: '±0.05 bar', color: 'green' }
        ]
    },
    'digital-compressor': {
        code: 'EP-04',
        title: 'Digital Compressor',
        breadcrumb: 'Digital Compressor',
        type: 'Electro-Pneumatic',
        tags: ['Electro-Pneumatic', 'IoT Integrated', 'Automated'],
        mainImage: './asset/pneumatic/digital-compressor.jpg',
        mediaLabel: 'System Monitoring',
        mediaTitle: 'Compressor Status Dashboard',
        objective: 'Electronically monitored compressor system for automated assembly lines with full IoT integration. Provides real-time monitoring, predictive maintenance alerts, and automated pressure management for continuous operation.',
        specs: [
            { label: 'Nominal Pressure', value: '8.0 bar' },
            { label: 'Flow Capacity', value: '250 L/min' }
        ],
        schematic: './asset/pneumatic/compressor-schematic.jpg',
        schematicRev: 'REV 1.8',
        simulation: './asset/pneumatic/compressor-simulation.jpg',
        problem: 'Unscheduled compressor downtime occurred due to inability to predict maintenance needs. Manual pressure monitoring was unreliable.',
        solution: 'Deployed IoT sensors for real-time monitoring and predictive algorithms. Automated pressure management reduces energy consumption by 18% and MTBF improved to 2000+ hours.',
        metrics: [
            { label: 'Old Energy Consumption', value: '+18%', color: 'red' },
            { label: 'New Energy Efficiency', value: '-18%', color: 'green' }
        ]
    },
    'control-circuit': {
        code: 'EP-05',
        title: 'Control Circuit',
        breadcrumb: 'Control Circuit',
        type: 'Electro-Pneumatic',
        tags: ['Electro-Pneumatic', 'PLC Logic', 'Sequential Control'],
        mainImage: './asset/pneumatic/control-circuit.jpg',
        mediaLabel: 'Logic Demonstration',
        mediaTitle: 'Valve Array Control Sequence',
        objective: 'Integrated logic control units for electro-pneumatic valve arrays with full PLC compatibility. Enables complex sequential valve coordination for advanced automated pneumatic systems with millisecond timing precision.',
        specs: [
            { label: 'Operating Voltage', value: '24 VDC' },
            { label: 'Response Time', value: '50 ms' }
        ],
        schematic: './asset/pneumatic/circuit-schematic.jpg',
        schematicRev: 'REV 3.0',
        simulation: './asset/pneumatic/circuit-simulation.jpg',
        problem: 'Ladder logic conflicts caused timing errors in sequence execution, with 3% failure rate in complex multi-valve operations.',
        solution: 'Implemented state machine architecture with conflict resolution algorithm. Failure rate reduced to 0.1% with improved synchronization timing.',
        metrics: [
            { label: 'Old Failure Rate', value: '3%', color: 'red' },
            { label: 'New Failure Rate', value: '0.1%', color: 'green' }
        ]
    },
    'air-distribution': {
        code: 'PN-06',
        title: 'Air Distribution',
        breadcrumb: 'Air Distribution',
        type: 'Pure Pneumatic',
        tags: ['Pure Pneumatic', 'Infrastructure', 'Multi-Zone'],
        mainImage: './asset/pneumatic/air-distribution.jpg',
        mediaLabel: 'Network Overview',
        mediaTitle: 'Distribution System Layout',
        objective: 'Pure pneumatic distribution infrastructure engineered for multi-story manufacturing facilities. Manages airflow across multiple zones with individual pressure regulation, leak detection, and modular maintenance design.',
        specs: [
            { label: 'Total Piping', value: '250 meters' },
            { label: 'Pressure Drop Max', value: '0.3 bar' }
        ],
        schematic: './asset/pneumatic/distribution-schematic.jpg',
        schematicRev: 'REV 2.5',
        simulation: './asset/pneumatic/distribution-simulation.jpg',
        problem: 'Compressed air leaks at joint connections resulted in 15% energy loss throughout the facility. Maintenance was difficult due to rigid piping.',
        solution: 'Replaced rigid piping with modular quick-connect system and installed ultrasonic leak detection. Reduced energy loss to 2% and maintenance time by 60%.',
        metrics: [
            { label: 'Old Energy Loss', value: '15%', color: 'red' },
            { label: 'New Energy Loss', value: '2%', color: 'green' }
        ]
    },
    'relay-control': {
        code: 'EP-07',
        title: 'Rangkaian A+B+B-A- 4 Relay dengan 3 Lampu',
        breadcrumb: 'Relay Control Circuit',
        type: 'Electro-Pneumatic',
        tags: ['Electro-Pneumatic', 'Relay Logic', 'Control Circuit'],
        mainImage: './asset/pneumatic/foto/wiring Rangkaian A+B+B-A- 4 relay dengan 3 lampu.jpeg',
        mediaVideo: './asset/pneumatic/video/wiring Rangkaian A+B+B-A- 4 relay dengan 3 lampu.mp4',
        mediaLabel: 'System Documentation',
        mediaTitle: 'Relay Control Schematic',
        objective: 'A sophisticated electro-pneumatic relay circuit implementing A+B+B-A- logic with 4 relay control units and 3 indicator lamps. This system demonstrates precise relay sequencing for advanced pneumatic control applications with integrated feedback mechanisms.',
        specs: [
            { label: 'Relay Channels', value: '4 Units' },
            { label: 'Control Lamps', value: '3 Indicators' }
        ],
        schematic: './asset/pneumatic/foto/schematic Rangkaian A+B+B-A- 4 relay dengan 3 lampu.png',
        schematicRev: 'REV 1.0',
        simulation: './asset/pneumatic/video/SImulasi Rangkaian A+B+B-A- 4 relay dengan 3 lampu.mp4',
        problem: 'Traditional sequential relay circuits suffered from timing conflicts and insufficient feedback integration, causing unreliable operational sequencing in multi-cylinder pneumatic systems.',
        solution: 'Implemented optimized A+B+B-A- relay logic with integrated lamp feedback and improved relay coordination. This ensures precise sequential operation with visual status indication for each control phase.',
        metrics: [
            { label: 'Old Reliability', value: '87%', color: 'red' },
            { label: 'New Reliability', value: '98%', color: 'green' }
        ]
    }
};

// Load project data on page load
document.addEventListener('DOMContentLoaded', function () {
    const projectId = new URLSearchParams(window.location.search).get('project') || 'valve-assembly';
    loadProjectDetail(projectId);
});

// Function to load and display project details
function loadProjectDetail(projectId) {
    const project = projectsDetail[projectId];

    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Update page title
    document.title = `${project.title} - Pneumatic Workshop`;
    document.getElementById('page-title').textContent = project.title;

    // Update header
    document.getElementById('project-code').textContent = project.code;
    document.getElementById('breadcrumb-title').textContent = project.breadcrumb;
    document.getElementById('project-title').textContent = project.title;

    // Update tags
    const tagsHtml = project.tags.map(tag => `
        <span class="flex items-center gap-1 bg-surface-light px-3 py-1 rounded border border-primary/10">
            <span class="material-symbols-outlined text-base">settings_ethernet</span> ${tag}
        </span>
    `).join('');
    document.getElementById('project-tags').innerHTML = tagsHtml;

    // Update media
    const mainMediaElement = document.getElementById('main-media');
    const playButton = document.querySelector('button[onclick="playVideo()"]');

    // Check if mainImage is a video
    if (project.mainImage.endsWith('.mp4') || project.mainImage.endsWith('.webm') || project.mainImage.endsWith('.mov') || project.mainImage.endsWith('.avi')) {
        // Set video path as data attribute
        playButton.dataset.videoPath = project.mainImage;
        mainMediaElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
    } else {
        // Regular image
        mainMediaElement.style.backgroundImage = `url('${project.mainImage}')`;

        // Check if explicit video is defined (e.g. for System Documentation)
        if (project.mediaVideo) {
            playButton.dataset.videoPath = project.mediaVideo;
        } else {
            playButton.dataset.videoPath = '';
        }
    }

    document.getElementById('media-label').textContent = project.mediaLabel;
    document.getElementById('media-title').textContent = project.mediaTitle;

    // Update objective and specs
    document.getElementById('project-objective').textContent = project.objective;

    const specsHtml = project.specs.map(spec => `
        <div class="bg-surface-light p-4 rounded-lg border border-primary/10">
            <div class="text-xs text-primary/50 uppercase font-mono mb-1">${spec.label}</div>
            <div class="text-xl font-bold text-white">${spec.value}</div>
        </div>
    `).join('');
    document.getElementById('project-specs').innerHTML = specsHtml;

    // Update schematic
    document.getElementById('schematic-image').style.backgroundImage = `url('${project.schematic}')`;
    document.getElementById('schematic-rev').textContent = project.schematicRev;

    // Update simulation
    const simulationImageElement = document.getElementById('simulation-image');
    if (project.simulation.endsWith('.mp4') || project.simulation.endsWith('.webm') || project.simulation.endsWith('.mov') || project.simulation.endsWith('.avi')) {
        // Create video element for simulation - full width
        simulationImageElement.innerHTML = `<video class="w-full h-auto" controls style="background: #2b2b2b; display: block;"><source src="${project.simulation}" type="video/mp4">Your browser does not support the video tag.</video>`;
        simulationImageElement.style.display = 'flex';
        simulationImageElement.style.alignItems = 'center';
        simulationImageElement.style.justifyContent = 'center';
    } else {
        // Regular image
        simulationImageElement.style.backgroundImage = `url('${project.simulation}')`;
        simulationImageElement.innerHTML = '';
    }

    // Update case study
    document.getElementById('problem-text').textContent = project.problem;
    document.getElementById('solution-text').textContent = project.solution;

    const metricsHtml = project.metrics.map(metric => `
        <div class="flex flex-col">
            <span class="text-[10px] uppercase text-gray-500 font-bold">${metric.label}</span>
            <span class="text-${metric.color}-400/80 font-mono text-sm">${metric.value}</span>
        </div>
        <div class="w-px bg-white/10 h-8"></div>
    `).join('');
    document.getElementById('metric-comparison').innerHTML = metricsHtml.slice(0, -29); // Remove last divider
}

// Function to update main media when thumbnail is clicked
function updateMainMedia(imageSrc, label) {
    document.getElementById('main-media').style.backgroundImage = `url('${imageSrc}')`;
    document.getElementById('media-title').textContent = label;
}

// Function to navigate to detail page from pneumatics.html
function navigateToDetail(projectId) {
    window.location.href = `pneumatics-detail.html?project=${projectId}`;
}

// Placeholder video function
function playVideo() {
    const playButton = event.target.closest('button');
    const project = projectsDetail[new URLSearchParams(window.location.search).get('project') || 'valve-assembly'];
    const mediaTitle = document.getElementById('media-title').textContent;

    // Check if there's a video path in data attribute (main media video)
    let videoPath = playButton.dataset.videoPath;

    // If no data attribute, use simulation video
    if (!videoPath) {
        videoPath = project.simulation;
    }

    // Check if it's a video file
    if (videoPath.endsWith('.mp4') || videoPath.endsWith('.webm') || videoPath.endsWith('.mov') || videoPath.endsWith('.avi')) {
        // Create modal for video
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4';
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };

        const videoContainer = document.createElement('div');
        videoContainer.className = 'w-full max-w-4xl relative';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10';
        closeBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
        closeBtn.onclick = () => modal.remove();

        const video = document.createElement('video');
        video.src = videoPath;
        video.controls = true;
        video.autoplay = true;
        video.className = 'w-full rounded-lg border border-primary/30 bg-black';

        videoContainer.appendChild(closeBtn);
        videoContainer.appendChild(video);
        modal.appendChild(videoContainer);
        document.body.appendChild(modal);
    } else {
        // Fallback for image or other media
        alert('Opening: ' + mediaTitle);
    }
}

// Function to view schematic in fullscreen modal
function viewSchematicFull() {
    const project = projectsDetail[new URLSearchParams(window.location.search).get('project') || 'valve-assembly'];
    const schematicSrc = project.schematic;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };

    const container = document.createElement('div');
    container.className = 'w-full max-w-6xl relative';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10';
    closeBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
    closeBtn.onclick = () => modal.remove();

    const img = document.createElement('img');
    img.src = schematicSrc;
    img.className = 'w-full h-auto max-h-[80vh] object-contain rounded-lg border border-primary/30';

    container.appendChild(closeBtn);
    container.appendChild(img);
    modal.appendChild(container);
    document.body.appendChild(modal);
}
