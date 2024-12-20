const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const anggotaForm = document.getElementById('anggotaForm');
const modalTitle = document.getElementById('modalTitle');
const submitBtn = document.getElementById('submitBtn');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const fullnameInput = document.getElementById('FullName');
const addressInput = document.getElementById('Address');
const jobInput = document.getElementById('Job');
const statusInput = document.getElementById('Status');
const religionInput = document.getElementById('Religion');
const genderInput = document.getElementById('Gender');
const anggotaTable = document.getElementById('anggotaTable').getElementsByTagName('tbody')[0];
let rowToEdit = null;

function openModal(isEdit = false) {
    modalOverlay.classList.add('active');
    modalTitle.textContent = isEdit ? 'Edit Anggota' : 'Tambah Anggota';
    submitBtn.textContent = isEdit ? 'Perbarui' : 'Simpan';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    anggotaForm.reset();
    rowToEdit = null;
}

openModalBtn.addEventListener('click', () => openModal(false));
cancelBtn.addEventListener('click', closeModal);

function editAnggota(button) {
    const row = button.closest('tr');
    const nama = row.cells[1].textContent;
    const email = row.cells[2].textContent;
    const fullname = row.cells[3].textContent;
    const address = row.cells[4].textContent;
    const job = row.cells[5].textContent;
    const status = row.cells[6].textContent;
    const religion = row.cells[7].textContent;
    const gender = row.cells[8].textContent;

    namaInput.value = nama;
    emailInput.value = email;
    fullnameInput.value = fullname;
    addressInput.value = address;
    jobInput.value = job;
    statusInput.value = status;
    religionInput.value = religion;
    genderInput.value = gender;
    rowToEdit = row;

    openModal(true);
}

function hapusAnggota(button) {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
        button.closest('tr').remove();
    }
}

anggotaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = namaInput.value;
    const email = emailInput.value;
    const fullname = fullnameInput.value;
    const address = addressInput.value;
    const job = jobInput.value;
    const status = statusInput.value;
    const religion = religionInput.value;
    const gender = genderInput.value;

    if (rowToEdit) {
        rowToEdit.cells[1].textContent = nama;
        rowToEdit.cells[2].textContent = email;
        rowToEdit.cells[3].textContent = fullname;
        rowToEdit.cells[4].textContent = address;
        rowToEdit.cells[5].textContent = job;
        rowToEdit.cells[6].textContent = status;
        rowToEdit.cells[7].textContent = religion;
        rowToEdit.cells[8].textContent = gender;
    } else {
        const newRow = anggotaTable.insertRow();
        newRow.innerHTML = `
            <td>${3}</td>
            <td>${nama}</td>
            <td>${email}</td>
            <td>${fullname}</td>
            <td>${address}</td>
            <td>${job}</td>
            <td>${status}</td>
            <td>${religion}</td>
            <td>${gender}</td>
            <td class="action-buttons">
                <button onclick="editAnggota(this)" class="btn-edit"><i class="fas fa-edit"></i> Edit</button>
                <button onclick="hapusAnggota(this)" class="btn-delete"><i class="fas fa-trash"></i> Hapus</button>
            </td>
        `;
    }

    alert('Data anggota berhasil ' + (rowToEdit ? 'diperbarui!' : 'disimpan!'));
    closeModal();
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});


// MODALL FILTER

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("flter");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}