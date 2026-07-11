// Admin Database System Logic using LocalStorage (Standalone Client Database)

// Initial Data Structure for demonstration if empty
const initialData = {
    projects: [
        { id: 1, title: 'Smart Sorting Machine', category: 'Mechatronics', desc: 'PLC based sorting using pneumatic logic.', image: './asset/sorting.jpg' },
        { id: 2, title: 'IoT Weather Station', category: 'Internet of Things', desc: 'ESP32 powered remote weather monitoring.', image: './asset/iot.jpg' }
    ],
    certificates: [
        { id: 1, title: 'LKS Mechatronics 2025', category: 'Competition', desc: 'National level robotics competition.', image: './asset/cert1.jpg' }
    ]
};

// Initialize DB safely
function initDB() {
    if (!localStorage.getItem('mzr_db_projects')) {
        localStorage.setItem('mzr_db_projects', JSON.stringify(initialData.projects));
    }
    if (!localStorage.getItem('mzr_db_certificates')) {
        localStorage.setItem('mzr_db_certificates', JSON.stringify(initialData.certificates));
    }
}

// Authentication Logic
function login() {
    const pin = document.getElementById('admin-pin').value;
    // Default PIN: 1234
    if (pin === '1234') { 
        document.getElementById('auth-overlay').classList.add('opacity-0');
        setTimeout(() => {
            document.getElementById('auth-overlay').style.display = 'none';
        }, 300);
        
        initDB();
        renderDashboard();
        
        // Initial tab load
        switchTab('dashboard');
    } else {
        const pinInput = document.getElementById('admin-pin');
        pinInput.classList.add('border-red-500');
        setTimeout(() => pinInput.classList.remove('border-red-500'), 500);
    }
}

function logout() {
    const overlay = document.getElementById('auth-overlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
    }, 10);
    document.getElementById('admin-pin').value = '';
}

// Check for Enter key on login
document.getElementById('admin-pin').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') login();
});

// View Routing System
function switchTab(tabId) {
    // Nav active states
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');

    // Section visibility
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('animate-fade-in');
    });
    
    const activeSection = document.getElementById(`view-${tabId}`);
    activeSection.classList.remove('hidden');
    // Force reflow
    void activeSection.offsetWidth;
    activeSection.classList.add('animate-fade-in'); // Need CSS for this if desired, or just show

    // Title updates
    const titles = {
        'dashboard': 'System Overview',
        'projects': 'Projects Database',
        'certificates': 'Certificates Database'
    };
    document.getElementById('page-title').innerText = titles[tabId];

    renderData(tabId);
}

// Data Handling Core
function getDB(type) {
    return JSON.parse(localStorage.getItem(`mzr_db_${type}`) || '[]');
}

function saveDB(type, data) {
    localStorage.setItem(`mzr_db_${type}`, JSON.stringify(data));
    renderDashboard();
    renderData(type);
}

// Render Stats
function renderDashboard() {
    const projects = getDB('projects');
    const certs = getDB('certificates');
    document.getElementById('stat-projects').innerText = projects.length;
    document.getElementById('stat-certs').innerText = certs.length;
}

// Render Tables
function renderData(type) {
    if(type === 'dashboard') return;
    
    const data = getDB(type);
    const tbody = document.getElementById(`${type}-table-body`);
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-gray-500 italic">No records found in the database.</td></tr>`;
        return;
    }

    data.reverse().forEach(item => {
        tbody.innerHTML += `
            <tr class="hover:bg-white/5 transition border-b border-white/5 last:border-0 group">
                <td class="p-5 text-white font-medium">${item.title}</td>
                <td class="p-5">
                    <span class="px-3 py-1 rounded-full bg-white/10 text-xs tracking-wider uppercase text-gray-300 border border-white/5">${item.category}</span>
                </td>
                <td class="p-5 text-gray-400 text-sm truncate max-w-xs">${item.desc}</td>
                <td class="p-5 text-right opacity-50 group-hover:opacity-100 transition">
                    <button onclick="editItem('${type}', ${item.id})" class="px-3 py-1.5 text-xs rounded bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition mr-2">Edit</button>
                    <button onclick="deleteItem('${type}', ${item.id})" class="px-3 py-1.5 text-xs rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition">Del</button>
                </td>
            </tr>
        `;
    });
}

// CRUD: Create & Update
function openModal(type, id = null) {
    const modal = document.getElementById('crud-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Convert singular button click to plural collection name
    const collectionType = type + 's';
    document.getElementById('item-type').value = collectionType;
    
    if (id) {
        document.getElementById('modal-title').innerText = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)} Record`;
        const data = getDB(collectionType).find(i => i.id === id);
        document.getElementById('item-id').value = data.id;
        document.getElementById('item-title').value = data.title;
        document.getElementById('item-category').value = data.category;
        document.getElementById('item-desc').value = data.desc;
        document.getElementById('item-image').value = data.image || '';
    } else {
        document.getElementById('modal-title').innerText = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Record`;
        document.getElementById('crud-form').reset();
        document.getElementById('item-id').value = '';
    }
}

function closeModal() {
    const modal = document.getElementById('crud-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function saveData(e) {
    e.preventDefault();
    const type = document.getElementById('item-type').value; // 'projects' or 'certificates'
    const id = document.getElementById('item-id').value;
    
    const newItem = {
        id: id ? parseInt(id) : Date.now(), // Generate unique ID based on timestamp
        title: document.getElementById('item-title').value,
        category: document.getElementById('item-category').value,
        desc: document.getElementById('item-desc').value,
        image: document.getElementById('item-image').value
    };

    let data = getDB(type);
    
    if (id) {
        const index = data.findIndex(i => i.id === parseInt(id));
        if (index > -1) data[index] = newItem;
    } else {
        data.push(newItem);
    }

    saveDB(type, data);
    closeModal();
}

// CRUD: Delete
function deleteItem(type, id) {
    if (confirm('CRITICAL ACTION: Are you sure you want to permanently delete this record from the database?')) {
        let data = getDB(type);
        data = data.filter(i => i.id !== id);
        saveDB(type, data);
    }
}

// Helper to open edit from inline onclick
function editItem(type, id) {
    openModal(type.slice(0, -1), id); // slice 's' off for singular modal logic
}
