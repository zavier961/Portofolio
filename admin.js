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

function generateFormFields(type, data = null) {
    const fieldsContainer = document.getElementById('form-fields');
    fieldsContainer.innerHTML = '';
    
    const createInput = (id, label, type='text', isRequired=false, defaultValue='') => {
        const value = data ? (data[id] !== undefined ? data[id] : defaultValue) : defaultValue;
        
        if (type === 'textarea') {
            return `
                <div>
                    <label class="block text-sm font-medium mb-1">${label}</label>
                    <textarea id="item-${id}" class="w-full p-2.5 border rounded focus:border-blue-500 focus:outline-none" rows="3" ${isRequired?'required':''}>${value}</textarea>
                </div>
            `;
        }
        if (type === 'file' || type === 'file-multiple') {
            const isMultiple = type === 'file-multiple';
            const valString = Array.isArray(value) ? JSON.stringify(value) : (value ? JSON.stringify([value]) : '[]');
            const countText = Array.isArray(value) ? value.length : (value ? 1 : 0);
            
            return `
                <div>
                    <label class="block text-sm font-medium mb-1">${label}</label>
                    <input type="file" id="item-${id}" accept="image/*" class="w-full p-2 border rounded focus:border-blue-500 focus:outline-none" ${isMultiple ? 'multiple' : ''}>
                    ${countText > 0 ? `<p class="text-xs text-green-600 mt-1">${countText} image(s) currently saved. Uploading new will replace them.</p>` : ''}
                    <input type="hidden" id="item-${id}-hidden" value='${valString}'>
                </div>
            `;
        }
        return `
            <div>
                <label class="block text-sm font-medium mb-1">${label}</label>
                <input type="text" id="item-${id}" value="${value}" class="w-full p-2.5 border rounded focus:border-blue-500 focus:outline-none" ${isRequired?'required':''}>
            </div>
        `;
    };

    if (type === 'projects') {
        fieldsContainer.innerHTML = `
            ${createInput('title', 'Project Title', 'text', true)}
            ${createInput('category', 'Category')}
            ${createInput('desc', 'Description', 'textarea', true)}
            ${createInput('tags', 'Tags (comma separated)')}
            ${createInput('image', 'Project Photo', 'file')}
        `;
    } else if (type === 'certificates') {
        fieldsContainer.innerHTML = `
            ${createInput('title', 'Certificate Title', 'text', true)}
            <div class="grid grid-cols-2 gap-4">
                ${createInput('category', 'Filter Category (e.g., robotics, science)')}
                ${createInput('badge', 'Badge Name')}
            </div>
            ${createInput('description', 'Short Description', 'textarea')}
            
            <div class="p-4 bg-blue-50 rounded border border-blue-100 my-2 space-y-4">
                <h4 class="font-bold text-blue-800 text-sm">Media & Documentation</h4>
                ${createInput('certImage', 'Main Certificate Image(s)', 'file-multiple')}
                ${createInput('evidenceImages', 'Documentation/Evidence Photos', 'file-multiple')}
                ${createInput('videoEmbed', 'YouTube Embed Link (Optional)')}
            </div>

            ${createInput('theoryText', 'Theory Text', 'textarea')}
            ${createInput('toolText', 'Tools Used', 'textarea')}
            ${createInput('story', 'Story / Journey', 'textarea')}
            ${createInput('documentation', 'Documentation Text Detail', 'textarea')}
            ${createInput('pdfLink', 'PDF Document URL or Name', 'text')}
        `;
    }
}

async function openModal(type, id = null) {
    document.getElementById('crud-modal').classList.remove('hidden');
    document.getElementById('crud-modal').classList.add('flex');
    const tableType = type + 's';
    document.getElementById('item-type').value = tableType;
    
    if (id) {
        document.getElementById('modal-title').innerText = 'Edit ' + type;
        const dbData = await getDB(tableType);
        const data = dbData.find(i => i.id === id);
        document.getElementById('item-id').value = data.id;
        generateFormFields(tableType, data);
    } else {
        document.getElementById('modal-title').innerText = 'Add New ' + type;
        document.getElementById('item-id').value = '';
        generateFormFields(tableType, null);
    }
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
        
        const fileInput = document.getElementById('item-image');
        if (fileInput.files.length > 0) {
            item.image = await getBase64(fileInput.files[0]);
        } else if (!id) {
            item.image = "";
        }
    } else if (type === 'certificates') {
        item.title = document.getElementById('item-title').value;
        item.category = document.getElementById('item-category').value;
        item.badge = document.getElementById('item-badge').value;
        item.description = document.getElementById('item-description').value;
        item.theoryText = document.getElementById('item-theoryText').value;
        item.toolText = document.getElementById('item-toolText').value;
        item.story = document.getElementById('item-story').value;
        item.documentation = document.getElementById('item-documentation').value;
        item.pdfLink = document.getElementById('item-pdfLink').value;
        item.videoEmbed = document.getElementById('item-videoEmbed').value;
        
        // Handle Cert Image(s)
        const certInput = document.getElementById('item-certImage');
        if (certInput.files.length > 0) {
            const b64s = await getMultipleBase64(certInput.files);
            item.certImage = b64s.length === 1 ? b64s[0] : b64s;
        } else {
            const hiddenVal = document.getElementById('item-certImage-hidden').value;
            const parsed = JSON.parse(hiddenVal || '[]');
            item.certImage = parsed.length === 1 ? parsed[0] : parsed;
        }

        // Handle Evidence Images
        const evidenceInput = document.getElementById('item-evidenceImages');
        if (evidenceInput.files.length > 0) {
            item.evidenceImages = await getMultipleBase64(evidenceInput.files);
        } else {
            item.evidenceImages = JSON.parse(document.getElementById('item-evidenceImages-hidden').value || '[]');
        }
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
