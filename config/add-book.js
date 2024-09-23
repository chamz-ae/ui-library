// tambah_buku.js
document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('addBookForm');

    addBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mengambil nilai dari form
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const isbn = document.getElementById('bookISBN').value;
        const publishYear = document.getElementById('bookPublishYear').value;

        // Di sini Anda bisa menambahkan logika untuk menyimpan data buku ke server
        // Untuk contoh ini, kita hanya akan menampilkan alert dengan informasi buku
        alert(`Buku baru ditambahkan:\nJudul: ${title}\nPenulis: ${author}\nISBN: ${isbn}\nTahun Terbit: ${publishYear}`);

        // Mereset form
        addBookForm.reset();

        // Redirect ke dashboard setelah 2 detik
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});