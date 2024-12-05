let libraryBooks = [
    {
        id: 1,
        borrowDate: "15 Mei 2024",
        institution: "Ahmad Dahlan",
        email: "15 Mei 2024",
        fullname: "15 Juni 2024",
        address : "Suka jadi",
        status: "late",
        returned: false
    },
    {
        id: 2,
        borrowDate: "15 Mei 2024",
        institution: "Siti Raham",
        email: "20 Mei 2024",
        fullname: "20 Juni 2024",
        address : "Suka jadi",
        status: "due-soon",
        returned: false
    },
    {
        id: 3,
        borrowDate: "15 Mei 2024",
        institution: "Budi Setawan",
        email: "01 Juni 2024",
        fullname: "01 Juli 2024",
        address : "Suka jadi",
        status: "in-progress",
        returned: false
    },
    {
        id: 4,
        borrowDate: "15 Mei 2024",
        institution: "Rina Marlina",
        email: "10 Juni 2024",
        fullname: "10 Juli 2024",
        address : "Suka jadi",
        status: "in-progress",
        returned: false
    },
    {
        id: 5,
        borrowDate: "15 Mei 2024",
        institution: "Joko Widodo",
        email: "05 Mei 2024",
        fullname: "05 Juni 2024",
        address : "Suka jadi",
        status: "late",
        returned: false
    },
    {
        id: 6,
        borrowDate: "15 Mei 2024",
        institution: "Joko Widoda",
        email: "07 Mei 2024",
        fullname: "09 Juni 2024",
        address : "Suka jadi",
        status: "in-progress",
        returned: false
    },
    {
        id: 7,
        borrowDate: "15 Mei 2024",
        institution: "Joko Pekik",
        email: "09 Mei 2024",
        fullname: "11 Juni 2024",
        address : "Suka jadi",
        status: "due-soon",
        returned: false
    },
    {
        id: 8,
        borrowDate: "15 Mei 2024",
        institution: "Joko Pekik",
        email: "09 Mei 2024",
        fullname: "11 Juni 2024",
        address : "Suka jadi",
        status: "late",
        returned: false
    }
];

let selectedBookId = null;

// Fungsi untuk memperbarui waktu saat ini
function updateCurrentTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    timeElement.textContent = now.toLocaleString('id-ID', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    });
}

// Fungsi untuk menampilkan buku (updated)
function renderBooks() {
    const tableBody = document.getElementById('bookTableBody');
    tableBody.innerHTML = ''; // Bersihkan isi tabel

    libraryBooks.forEach(book => {
        if (!book.returned) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.borrowDate}</td>
                <td>${book.institution}</td>
                <td>${book.email}</td>
                <td>${book.fullname}</td>
                <td>${book.address}</td>
                <td>
                    <span class="status-badge ${book.status}">
                        ${book.status === 'late' ? 'Late' : 
                           book.status === 'due-soon' ? 'Due Soon' : 
                           'Borrowed'}
                    </span>
                </td>
                <td>
                    <button onclick="showDetailModal(${book.id})" class="detail-btn">
                        Detail
                    </button>
                    <button onclick="showReturnModal(${book.id})" class="return-btn">
                        Return
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Update statistik
    const activebooks = libraryBooks.filter(book => !book.returned);
    document.getElementById('totalBooksCount').textContent = activebooks.length;
    document.getElementById('lateBooksCount').textContent = 
        activebooks.filter(book => book.status === 'late').length;
    document.getElementById('dueSoonBooksCount').textContent = 
        activebooks.filter(book => book.status === 'due-soon').length;
}

// Fungsi untuk menampilkan modal konfirmasi
function showReturnModal(bookId) {
    const book = libraryBooks.find(b => b.id === bookId);
    selectedBookId = bookId;
    
    document.getElementById('modalBookTitle').textContent = `Apakah "${book.fullname}" sudah mengembalikan buku??`;
    document.getElementById('returnModal').style.display = 'flex';
}

// Fungsi untuk menampilkan modal detail
function showDetailModal(bookId) {
    const book = libraryBooks.find(b => b.id === bookId);
    
    // Membuat konten detail buku
    const detailContent = `
        <h2>Book Loan Details</h2>
        <div class="detail-grid">
            <div class="detail-label">Loan Date:</div>
            <div class="detail-value">${book.borrowDate}</div>
            
            <div class="detail-label">Institution:</div>
            <div class="detail-value">${book.institution}</div>
            
            <div class="detail-label">Email:</div>
            <div class="detail-value">${book.email}</div>
            
            <div class="detail-label">Full Name:</div>
            <div class="detail-value">${book.fullname}</div>
            
            <div class="detail-label">Address:</div>
            <div class="detail-value">${book.address}</div>
            
            <div class="detail-label">Status:</div>
            <div class="detail-value">
                <span class="status-badge ${book.status}">
                    ${book.status === 'late' ? 'Late' : 
                       book.status === 'due-soon' ? 'Due Soon' : 
                       'Borrowed'}
                </span>
            </div>
        </div>
    `;
    
    // Tampilkan modal detail
    const detailModal = document.getElementById('detailModal');
    const detailModalContent = document.getElementById('detailModalContent');
    detailModalContent.innerHTML = detailContent;
    detailModal.style.display = 'flex';
}

// Fungsi untuk menutup modal
function closeModal() {
    document.getElementById('returnModal').style.display = 'none';
    selectedBookId = null;
}

// Fungsi untuk menutup modal detail
function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Fungsi konfirmasi pengembalian buku
function confirmReturn() {
    if (selectedBookId) {
        // Tandai buku sebagai dikembalikan
        const bookIndex = libraryBooks.findIndex(b => b.id === selectedBookId);
        libraryBooks[bookIndex].returned = true;
        
        // Perbarui tampilan
        renderBooks();
        
        // Tutup modal
        closeModal();

        // Tampilkan notifikasi
        // alert(`Buku "${libraryBooks[bookIndex].borrowDate}" berhasil dikembalikan!`);
    }
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    renderBooks();

    // Update waktu setiap detik
    setInterval(updateCurrentTime, 1000);
});