// Project data structure - tinggal isi dengan konten yang diperlukan
const projectsDetail = {
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
    const projectId = new URLSearchParams(window.location.search).get('project') || 'relay-control';
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
    const project = projectsDetail[new URLSearchParams(window.location.search).get('project') || 'relay-control'];
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
    const project = projectsDetail[new URLSearchParams(window.location.search).get('project') || 'relay-control'];
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
