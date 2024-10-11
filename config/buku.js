const itemsPerPage = 5;
    let currentPage = 1;

    function initializePagination() {
        document.querySelectorAll('.tab-content').forEach(tabContent => {
            const tabId = tabContent.id;
            const table = tabContent.querySelector('table');
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => row.style.display = 'none');
            
            for (let i = 0; i < itemsPerPage && i < rows.length; i++) {
                rows[i].style.display = '';
            }
            
            updatePagination(tabId, rows.length);
        });
    }

    function updatePagination(tabId, totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pagination = document.querySelector(`#${tabId} .pagination`);
        let html = '';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button onclick="changePage(${i}, '${tabId}')" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
        }
        pagination.innerHTML = html;
    }

    function changePage(page, tabId) {
        console.log(`Changing to page ${page} for ${tabId} table`);
        currentPage = page;
        const table = document.querySelector(`#${tabId} table`);
        const rows = table.querySelectorAll('tbody tr');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });

        updatePagination(tabId, rows.length);
    }

    function openTab(evt, tabName) {
        const tabContents = document.getElementsByClassName("tab-content");
        const tabLinks = document.getElementsByClassName("tab");

        Array.from(tabContents).forEach(content => content.style.display = "none");
        Array.from(tabLinks).forEach(link => link.className = link.className.replace(" active", ""));

        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";

        currentPage = 1;
        changePage(1, tabName);
    }

    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    function editItem(tableId, id) {
        console.log(`Editing item ${id} in ${tableId}`);
        openModal(`${tableId.replace('Table', '')}Modal`);
    }

    function deleteItem(tableId, id) {
        console.log(`Deleting item ${id} from ${tableId}`);
    }

    document.addEventListener('DOMContentLoaded', () => {
        initializePagination();
        
        // Aktifkan tab pertama secara default
        document.querySelector('.tab').click();

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function(event) {
                openTab(event, this.textContent.toLowerCase());
            });
        });

        ['book', 'author', 'publisher'].forEach(formType => {
            document.getElementById(`${formType}Form`).addEventListener('submit', function(e) {
                e.preventDefault();
                console.log(`${formType} form submitted`);
                // Implement form submission logic here
                closeModal(`${formType}Modal`);
            });
        });

        window.onclick = function(event) {
            if (event.target.className === 'modal') {
                event.target.style.display = "none";
            }
        };

        document.getElementById('logoutBtn').addEventListener('click', logOut);
    });

// BEDA
// DELETE ITEM

function deleteItem(tableId, id) {
    console.log(`Deleting item ${id} from ${tableId}`);
    
    // Konfirmasi penghapusan
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        return;
    }

    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    // Cari dan hapus baris yang sesuai
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].textContent === id.toString()) {
            tbody.removeChild(rows[i]);
            break;
        }
    }

    // Hitung jumlah item yang tersisa
    const remainingItems = tbody.querySelectorAll('tr').length;

    // Perbarui pagination
    updatePagination(tableId.replace('Table', ''), remainingItems);

    // Jika halaman saat ini kosong, pindah ke halaman sebelumnya
    const itemsOnCurrentPage = tbody.querySelectorAll('tr:not([style*="display: none"])').length;
    if (itemsOnCurrentPage === 0 && currentPage > 1) {
        changePage(currentPage - 1, tableId.replace('Table', ''));
    } else {
        // Jika masih ada item di halaman ini, perbarui tampilan
        changePage(currentPage, tableId.replace('Table', ''));
    }

    console.log(`Item deleted. Remaining items: ${remainingItems}`);
}

document.addEventListener('DOMContentLoaded', () => {

    // Tambahkan event listener untuk tombol delete
    document.querySelectorAll('.action-button').forEach(button => {
        if (button.textContent === 'Delete') {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const id = row.cells[0].textContent;
                const tableId = this.closest('table').id;
                deleteItem(tableId, id);
            });
        }
    });

});