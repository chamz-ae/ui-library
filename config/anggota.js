const modalOverlay = document.getElementById('modalOverlay');
        const openModalBtn = document.getElementById('openModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const anggotaForm = document.getElementById('anggotaForm');
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        const namaInput = document.getElementById('nama');
        const emailInput = document.getElementById('email');
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
            const nama = row.cells[0].textContent;
            const email = row.cells[1].textContent;

            namaInput.value = nama;
            emailInput.value = email;
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

            if (rowToEdit) {
                rowToEdit.cells[0].textContent = nama;
                rowToEdit.cells[1].textContent = email;
            } else {
                const newRow = anggotaTable.insertRow();
                newRow.innerHTML = `
                    <td>${nama}</td>
                    <td>${email}</td>
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