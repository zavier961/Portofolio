function login() {
    if (document.getElementById('pin-input').value === '1234') {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        switchTab('projects');
    } else {
        alert('PIN salah. Silakan coba 1234');
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

function getDB(type) {
    return JSON.parse(localStorage.getItem('db_' + type) || '[]');
}

function saveDB(type, data) {
    localStorage.setItem('db_' + type, JSON.stringify(data));
    renderTable(type);
}

function renderTable(type) {
    const data = getDB(type);
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
                <td class="p-3 text-gray-600">${item.category}</td>
                <td class="p-3">
                    <button onclick="editItem('${type}', ${item.id})" class="text-blue-500 hover:text-blue-700 mr-3 font-medium">Edit</button>
                    <button onclick="deleteItem('${type}', ${item.id})" class="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openModal(type, id = null) {
    document.getElementById('crud-modal').classList.remove('hidden');
    document.getElementById('crud-modal').classList.add('flex');
    document.getElementById('item-type').value = type + 's';
    
    if (id) {
        document.getElementById('modal-title').innerText = 'Edit Data ' + type;
        const data = getDB(type + 's').find(i => i.id === id);
        document.getElementById('item-id').value = data.id;
        document.getElementById('item-title').value = data.title;
        document.getElementById('item-category').value = data.category;
        document.getElementById('item-desc').value = data.desc;
        document.getElementById('item-image').value = data.image || '';
    } else {
        document.getElementById('modal-title').innerText = 'Add New ' + type;
        document.getElementById('crud-form').reset();
        document.getElementById('item-id').value = '';
    }
}

function closeModal() {
    document.getElementById('crud-modal').classList.add('hidden');
    document.getElementById('crud-modal').classList.remove('flex');
}

function saveData(e) {
    e.preventDefault();
    const type = document.getElementById('item-type').value;
    const id = document.getElementById('item-id').value;
    let data = getDB(type);
    
    const item = {
        id: id ? parseInt(id) : Date.now(),
        title: document.getElementById('item-title').value,
        category: document.getElementById('item-category').value,
        desc: document.getElementById('item-desc').value,
        image: document.getElementById('item-image').value
    };

    if (id) {
        const idx = data.findIndex(i => i.id === parseInt(id));
        data[idx] = item;
    } else {
        data.push(item);
    }
    saveDB(type, data);
    closeModal();
}

function deleteItem(type, id) {
    if (confirm('Anda yakin ingin menghapus item ini?')) {
        let data = getDB(type);
        data = data.filter(i => i.id !== id);
        saveDB(type, data);
    }
}

function editItem(type, id) {
    openModal(type.slice(0, -1), id);
}
