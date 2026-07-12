async function hashPassphrase(passphrase) {
    const encoder = new TextEncoder();
    const data = encoder.encode(passphrase);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const SECURE_HASH = '82e5f94002be2e39ba3e86a7cc1dc4ca9bfad067d6734bb3eeed5c7291018216';

async function login() {
    const pin = document.getElementById('pin-input').value;
    const hashedInput = await hashPassphrase(pin);
    
    if (hashedInput === SECURE_HASH) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        switchTab('projects');
        
        // Auto-sync upon login if local magic server is active
        try {
            const projects = await getDB('projects');
            const certificates = await getDB('certificates');
            fetch('http://localhost:3000/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projects, certificates })
            }).then(() => console.log('Data securely synced on login!'))
              .catch(e => console.log('Magic server offline.'));
        } catch(e) {}

    } else {
        alert('Access Denied. Incorrect Passphrase.');
    }
}

function logout() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
    document.getElementById('pin-input').value = '';
}

function switchTab(tab) {
    document.getElementById('view-projects').classList.add('hidden');
    document.getElementById('view-certificates').classList.add('hidden');
    document.getElementById('view-' + tab).classList.remove('hidden');
    document.getElementById('page-title').innerText = 'Manage ' + tab.charAt(0).toUpperCase() + tab.slice(1);
    renderTable(tab);
}

const DB_NAME = 'mzr_portfolio_db';
const STORE_NAME = 'collections';

function getLocalDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            e.target.result.createObjectStore(STORE_NAME);
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

async function getVal(key) {
    try {
        const db = await getLocalDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        return null;
    }
}

async function setVal(key, val) {
    const db = await getLocalDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(val, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

async function getDB(type) {
    const data = await getVal('db_' + type);
    return data || [];
}

async function saveDB(type, data) {
    await setVal('db_' + type, data);
    await renderTable(type);
    
    // MAGICAL AUTO-SYNC TO GITHUB
    try {
        const projects = await getDB('projects');
        const certificates = await getDB('certificates');
        
        await fetch('http://localhost:3000/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projects, certificates })
        });
        console.log('✅ Auto-synced securely to main website!');
    } catch (e) {
        console.log('Sync server not active. Running in local mode only.');
    }
}

async function renderTable(type) {
    const data = await getDB(type);
    const tbody = document.getElementById(type + '-table-body');
    tbody.innerHTML = '';
    
    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-gray-500">Belum ada data. Silakan tambahkan.</td></tr>`;
        return;
    }

    data.forEach(item => {
        tbody.innerHTML += `
            <tr class="border-b hover:bg-gray-50 transition">
                <td class="p-3 font-medium">${item.title}</td>
                <td class="p-3 text-gray-600">${item.category || item.badge || '-'}</td>
                <td class="p-3">
                    <button onclick="editItem('${type}', ${item.id})" class="text-blue-500 hover:text-blue-700 mr-3 font-medium">Edit</button>
                    <button onclick="deleteItem('${type}', ${item.id})" class="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Global state for unlimited image uploads in the modal
let currentModalImages = {};

function generateFormFields(type, data = null) {
    const fieldsContainer = document.getElementById('form-fields');
    fieldsContainer.innerHTML = '';
    
    const createInput = (id, label, inputType='text', isRequired=false, defaultValue='') => {
        const value = data ? (data[id] !== undefined ? data[id] : defaultValue) : defaultValue;
        
        if (inputType === 'textarea') {
            return `
                <div>
                    <label class="block text-sm font-medium mb-1">${label}</label>
                    <textarea id="item-${id}" class="w-full p-2.5 border rounded focus:border-blue-500 focus:outline-none" rows="3" ${isRequired?'required':''}>${value}</textarea>
                </div>
            `;
        }
        if (inputType === 'file' || inputType === 'file-multiple' || inputType === 'file-pdf') {
            const isMultiple = inputType === 'file-multiple';
            const acceptType = inputType === 'file-pdf' ? '.pdf' : 'image/*';
            const isGallery = inputType !== 'file-pdf' && inputType !== 'file';
            
            if (isGallery) {
                return `
                    <div>
                        <label class="block text-sm font-medium mb-1">${label}</label>
                        <div class="flex gap-2 mb-2">
                            <input type="file" id="item-${id}" accept="${acceptType}" class="w-full p-2 border rounded focus:border-blue-500 focus:outline-none bg-gray-50" ${isMultiple ? 'multiple' : ''} onchange="handleImageUpload(this, '${id}')">
                        </div>
                        <p class="text-xs text-blue-600 mb-2">Pilih file untuk menambah foto. Anda bisa menambah foto sebanyak apapun tanpa batasan.</p>
                        <div id="gallery-${id}" class="flex flex-wrap gap-3 mt-2"></div>
                    </div>
                `;
            } else {
                return `
                    <div>
                        <label class="block text-sm font-medium mb-1">${label}</label>
                        <input type="file" id="item-${id}" accept="${acceptType}" class="w-full p-2 border rounded focus:border-blue-500 focus:outline-none bg-gray-50">
                        ${value ? `<p class="text-xs text-green-600 mt-1">File saat ini sudah tersimpan. Upload baru untuk mengganti.</p>` : ''}
                        <input type="hidden" id="item-${id}-hidden" value="${value}">
                    </div>
                `;
            }
        }
        return `
            <div>
                <label class="block text-sm font-medium mb-1">${label}</label>
                <input type="${inputType}" id="item-${id}" value="${value}" class="w-full p-2.5 border rounded focus:border-blue-500 focus:outline-none" ${isRequired?'required':''}>
            </div>
        `;
    };

    if (type === 'projects') {
        fieldsContainer.innerHTML = `
            ${createInput('title', 'Project Title', 'text', true)}
            ${createInput('category', 'Category')}
            ${createInput('desc', 'Description', 'textarea', true)}
            ${createInput('tags', 'Tags (comma separated)')}
            ${createInput('dateObtained', 'Tanggal Selesai / Dibuat', 'date', true)}
            ${createInput('image', 'Project Photo', 'file')}
        `;
    } else if (type === 'certificates') {
        fieldsContainer.innerHTML = `
            ${createInput('title', 'Certificate Title', 'text', true)}
            <div class="grid grid-cols-2 gap-4">
                ${createInput('category', 'Filter Category (e.g., robotics, science)')}
                ${createInput('badge', 'Badge Name')}
            </div>
            ${createInput('dateObtained', 'Tanggal Sertifikat / Menang', 'date', true)}
            ${createInput('description', 'Short Description', 'textarea')}
            
            <div class="p-4 bg-blue-50 rounded border border-blue-100 my-2 space-y-4">
                <h4 class="font-bold text-blue-800 text-sm">Media & Documentation</h4>
                ${createInput('certImage', 'Main Certificate Image(s)', 'file-multiple')}
                ${createInput('evidenceImages', 'Documentation/Evidence Photos', 'file-multiple')}
                ${createInput('videoEmbed', 'YouTube Embed Link (Optional)')}
                ${createInput('pdfLink', 'Upload File PDF (Opsional)', 'file-pdf')}
            </div>

            ${createInput('theoryText', 'Theory Text', 'textarea')}
            ${createInput('toolText', 'Tools Used', 'textarea')}
            ${createInput('story', 'Story / Journey', 'textarea')}
            ${createInput('documentation', 'Documentation Text Detail', 'textarea')}
        `;
    }
}

async function handleImageUpload(input, id) {
    if (!input.files || input.files.length === 0) return;
    
    const b64s = await getMultipleBase64(input.files);
    
    // Add to global state
    if (!currentModalImages[id]) currentModalImages[id] = [];
    currentModalImages[id] = [...currentModalImages[id], ...b64s];
    
    // Clear input so they can upload the same file again if they want
    input.value = '';
    
    // Update gallery UI
    renderGallery(id);
}

function removeGalleryImage(id, index) {
    currentModalImages[id].splice(index, 1);
    renderGallery(id);
}

function renderGallery(id) {
    const gallery = document.getElementById('gallery-' + id);
    if (!gallery) return;
    gallery.innerHTML = '';
    
    const images = currentModalImages[id] || [];
    images.forEach((img, index) => {
        gallery.innerHTML += `
            <div class="relative w-20 h-20 border rounded shadow-sm bg-gray-100 overflow-hidden group">
                <img src="${img}" class="w-full h-full object-cover">
                <button type="button" onclick="removeGalleryImage('${id}', ${index})" class="absolute inset-0 bg-red-600/80 text-white font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">X</button>
            </div>
        `;
    });
}

async function openModal(type, id = null) {
    document.getElementById('crud-modal').classList.remove('hidden');
    document.getElementById('crud-modal').classList.add('flex');
    const tableType = type + 's';
    document.getElementById('item-type').value = tableType;
    
    // Reset global state
    currentModalImages = {};

    if (id) {
        document.getElementById('modal-title').innerText = 'Edit ' + type;
        const dbData = await getDB(tableType);
        const data = dbData.find(i => i.id === id);
        document.getElementById('item-id').value = data.id;
        
        // Initialize images into global state
        if (tableType === 'certificates') {
            currentModalImages['certImage'] = Array.isArray(data.certImage) ? [...data.certImage] : (data.certImage ? [data.certImage] : []);
            currentModalImages['evidenceImages'] = Array.isArray(data.evidenceImages) ? [...data.evidenceImages] : (data.evidenceImages ? [data.evidenceImages] : []);
        } else {
            currentModalImages['image'] = data.image ? [data.image] : [];
        }

        generateFormFields(tableType, data);
    } else {
        document.getElementById('modal-title').innerText = 'Add New ' + type;
        document.getElementById('item-id').value = '';
        generateFormFields(tableType, null);
    }
    
    // Render galleries after fields are injected
    Object.keys(currentModalImages).forEach(key => renderGallery(key));
}

function closeModal() {
    document.getElementById('crud-modal').classList.add('hidden');
    document.getElementById('crud-modal').classList.remove('flex');
}

// Convert File to Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function getMultipleBase64(files) {
    const promises = Array.from(files).map(file => getBase64(file));
    return Promise.all(promises);
}

async function saveData(e) {
    e.preventDefault();
    const type = document.getElementById('item-type').value;
    const id = document.getElementById('item-id').value;
    let data = await getDB(type);
    
    // Preserve old item fully if editing, so we don't lose fields not in form
    let item = id ? { ...data.find(i => i.id === parseInt(id)) } : { id: Date.now() };

    if (type === 'projects') {
        item.title = document.getElementById('item-title').value;
        item.category = document.getElementById('item-category').value;
        item.desc = document.getElementById('item-desc').value;
        item.tags = document.getElementById('item-tags').value;
        item.dateObtained = document.getElementById('item-dateObtained').value;
        
        const fileInput = document.getElementById('item-image');
        if (fileInput.files.length > 0) {
            item.image = await getBase64(fileInput.files[0]);
        } else if (!id) {
            item.image = "";
        } else {
            item.image = document.getElementById('item-image-hidden').value;
        }
    } else if (type === 'certificates') {
        item.title = document.getElementById('item-title').value;
        item.category = document.getElementById('item-category').value;
        item.badge = document.getElementById('item-badge').value;
        item.dateObtained = document.getElementById('item-dateObtained').value;
        item.description = document.getElementById('item-description').value;
        item.theoryText = document.getElementById('item-theoryText').value;
        item.toolText = document.getElementById('item-toolText').value;
        item.story = document.getElementById('item-story').value;
        item.documentation = document.getElementById('item-documentation').value;
        item.videoEmbed = document.getElementById('item-videoEmbed').value;
        
        const pdfInput = document.getElementById('item-pdfLink');
        if (pdfInput.files.length > 0) {
            item.pdfLink = await getBase64(pdfInput.files[0]);
        } else {
            item.pdfLink = document.getElementById('item-pdfLink-hidden').value;
        }

        // Handle Cert Image(s) from global state
        const certs = currentModalImages['certImage'] || [];
        item.certImage = certs.length === 1 ? certs[0] : certs;

        // Handle Evidence Images from global state
        item.evidenceImages = currentModalImages['evidenceImages'] || [];
    }

    if (id) {
        const idx = data.findIndex(i => i.id === parseInt(id));
        data[idx] = item;
    } else {
        data.push(item);
    }
    await saveDB(type, data);
    closeModal();
}

async function deleteItem(type, id) {
    if (confirm('Anda yakin ingin menghapus item ini?')) {
        let data = await getDB(type);
        data = data.filter(i => i.id !== id);
        await saveDB(type, data);
    }
}

function editItem(type, id) {
    openModal(type.slice(0, -1), id);
}

async function resetDefaults() {
    if (confirm('PERINGATAN: Apakah Anda yakin ingin MERESET SELURUH DATA kembali ke pengaturan pabrik? Semua Sertifikat dan Proyek yang Anda tambahkan sendiri akan hilang permanen!')) {
        const db = await getLocalDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.clear();
            req.onsuccess = () => {
                alert('Database berhasil di-reset! Silakan kembali ke Web.');
                window.location.reload();
            };
            req.onerror = () => {
                alert('Gagal mereset database.');
                reject(req.error);
            };
        });
    }
}

async function exportToWeb() {
    try {
        const projects = await getDB('projects');
        const certificates = await getDB('certificates');
        const exportData = JSON.stringify({ projects, certificates }, null, 4);
        
        await navigator.clipboard.writeText(exportData);
        
        const alertBox = document.getElementById('sync-alert');
        if (alertBox) {
            alertBox.classList.remove('hidden');
            setTimeout(() => {
                alertBox.classList.add('hidden');
            }, 3000);
        } else {
            alert("✅ Data JSON berhasil di-copy ke Clipboard! Silakan paste di file data.txt.");
        }
    } catch (e) {
        console.error(e);
        alert("Gagal menyalin data. Silakan coba lagi.");
    }
}
