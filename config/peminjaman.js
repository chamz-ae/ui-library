// Simulasi data dari database
const products = [
    {
        id: 1,
        name: "GHAZZI AL MUHAMMBAH",
        image: "../image/image1.png"
    },
    {
        id: 2,
        name: "DAUN TERATAI",
        image: "../image/image2.png"
    },
    {
        id: 3,
        name: "TERELIYE",
        image: "../image/image3.png"
    },
    {
        id: 4,
        name: "SEMUA AKAN PERGI",
        image: "../image/image4.png"
    },
    {
        id: 5,
        name: "MALAIKAT",
        image: "../image/image2.png"
    },
    {
        id: 6,
        name: "PENCIPTA",
        image: "../image/image3.png"
    },
    {
        id: 7,
        name: "LOST ENERGI",
        image: "../image/image4.png"
    },
    {
        id: 8,
        name: "THE SUN",
        image: "../image/image2.png"
    },
    {
        id: 9,
        name: "LIKE ANGEL",
        image: "../image/image3.png"
    },
    {
        id: 10,
        name: "BACK TO HOME",
        image: "../image/image4.png"
    },
    {
        id: 11,
        name: "MANAGE TIME",
        image: "../image/image4.png"
    },
    {
        id: 12,
        name: "MONEY SAFE",
        image: "../image/image2.png"
    },
    {
        id: 13,
        name: "BE INTELEGENT",
        image: "../image/image3.png"
    },
    {
        id: 14,
        name: "SPEAKING",
        image: "../image/image4.png"
    }
];

let cart = [];
let transactions = [];
let selectedProductId = null;

// Function untuk membuat modal
function createModal() {
    // Cek apakah modal sudah ada
    if (document.getElementById('dateSelectionModal')) return;

    const modal = document.createElement('div');
    modal.id = 'dateSelectionModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    modal.innerHTML = `
        <div style="
            background-color: #ffffff; 
            border-radius: 12px; 
            width: 350px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
            max-width: 90%;
        ">
            <div style="
                background-color: #f0f0f0; 
                padding: 15px 20px;
                display: flex; 
                justify-content: space-between; 
                align-items: center;
                border-bottom: 1px solid #e0e0e0;
            ">
                <h3 style="
                    margin: 0; 
                    color: #333; 
                    font-size: 18px;
                ">Pilih Tanggal Sewa</h3>
                <button id="closeModal" style="
                    background: none; 
                    border: none; 
                    font-size: 24px; 
                    color: #888; 
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                ">&times;</button>
            </div>
            <div style="padding: 20px;">
                <label for="rentalDateInput" style="
                    display: block;
                    margin-bottom: 10px;
                    color: #555;
                    font-weight: bold;
                ">Tanggal Rental:</label>
                <input type="date" id="rentalDateInput" style="
                    width: 100%; 
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    margin-bottom: 20px;
                ">
                <div style="display: flex; justify-content: space-between;">
                    <button id="cancelModal" style="
                        background-color: #f0f0f0; 
                        color: #333; 
                        border: none; 
                        padding: 10px 20px; 
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        flex-grow: 1;
                        margin-right: 10px;
                    ">Batal</button>
                    <button id="confirmRentalDate" style="
                        background-color: #007bff; 
                        color: white; 
                        border: none; 
                        padding: 10px 20px; 
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        flex-grow: 1;
                    ">Konfirmasi</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Styling untuk hover dan active states
    const cancelButton = modal.querySelector('#cancelModal');
    const confirmButton = modal.querySelector('#confirmRentalDate');
    const closeButton = modal.querySelector('#closeModal');

    cancelButton.addEventListener('mouseenter', () => {
        cancelButton.style.backgroundColor = '#e0e0e0';
    });
    cancelButton.addEventListener('mouseleave', () => {
        cancelButton.style.backgroundColor = '#f0f0f0';
    });

    confirmButton.addEventListener('mouseenter', () => {
        confirmButton.style.backgroundColor = '#0056b3';
    });
    confirmButton.addEventListener('mouseleave', () => {
        confirmButton.style.backgroundColor = '#007bff';
    });

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.color = '#333';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.color = '#888';
    });

    // Event listener untuk menutup modal
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    confirmButton.addEventListener('click', confirmRentalDate);

    // Tambahkan event listener untuk menutup modal saat mengklik di luar modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Function untuk membuka modal
function openModal(productId) {
    selectedProductId = productId;
    const modal = document.getElementById('dateSelectionModal');
    modal.style.display = 'flex';
    const dateInput = document.getElementById('rentalDateInput');
    dateInput.value = '';
    
    // Set minimum tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Function untuk menutup modal
function closeModal() {
    const modal = document.getElementById('dateSelectionModal');
    modal.style.display = 'none';
    selectedProductId = null;
}

// Function untuk mengonfirmasi rental
function confirmRentalDate() {
    const rentalDateInput = document.getElementById('rentalDateInput');
    const rentalDate = rentalDateInput.value;

    // Validasi input tanggal
    if (!rentalDate) {
        alert('Silakan pilih tanggal rental');
        rentalDateInput.focus();
        return;
    }

    // Validasi tanggal minimal hari ini
    const today = new Date().toISOString().split('T')[0];
    if (rentalDate < today) {
        alert('Tanggal rental tidak boleh kurang dari hari ini');
        rentalDateInput.focus();
        return;
    }

    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === selectedProductId);

    if (existingItem) {
        alert('Produk sudah ada di keranjang');
        closeModal();
        return;
    }

    // Tambahkan ke keranjang
    cart.push({ 
        id: selectedProductId, 
        rentalDate: rentalDate 
    });

    // Render ulang keranjang
    renderCart();

    // Tutup modal
    closeModal();
}

// Function untuk merender produk
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4 mb-4';
        productElement.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" 
                     class="card-img-top select-product" 
                     alt="${product.name}" 
                     data-id="${product.id}" 
                     style="cursor: pointer;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

// Function untuk merender keranjang
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'd-flex justify-content-between align-items-center mb-3 border-bottom pb-2';
        cartItemElement.innerHTML = `
            <div>
                <h4 style="margin-bottom: 4px;" class="mb-0">${product.name}</h4>
                <medium class="text-muted">Rental Date: ${item.rentalDate}</medium>
            </div>
            <div style="margin-bottom: 15px;" class="d-flex padding align-items-center">
                <button style="width: 24px; margin-left: 13px;" class="btn btn-sm btn-danger ms-3 remove-from-cart" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    // Update total count
    const totalItems = cart.length;
    document.getElementById('cartTotal').textContent = totalItems;
}

// Event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Buat modal
    createModal();

    // Render produk
    renderProducts();

    // Event delegasi untuk memilih produk
    document.getElementById('productList').addEventListener('click', function(e) {
        const productElement = e.target.closest('.select-product');
        if (productElement) {
            const productId = parseInt(productElement.getAttribute('data-id'));
            openModal(productId);
        }
    });

    // Event delegasi untuk menghapus dari keranjang
    document.getElementById('cartItems').addEventListener('click', function(e) {
        const removeButton = e.target.closest('.remove-from-cart');
        if (removeButton) {
            const productId = parseInt(removeButton.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            renderCart();
        }
    });

    // Checkout
    document.getElementById('checkoutButton').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Keranjang belanja kosong!');
            return;
        }

        // Simulasi data pesanan
        const orderData = {
            items: cart.map(item => {
                const product = products.find(p => p.id === item.id);
                return {
                    ...item,
                    productName: product.name
                };
            }),
            orderDate: new Date().toISOString(),
            customerName: 'Nama Pelanggan'
        };

        // Simpan transaksi
        const transaction = {
            no: transactions.length + 1,
            name: orderData.customerName,
            product: orderData.items.map(item => `${item.productName} (${item.rentalDate})`).join(', '),
            date: new Date().toLocaleDateString(),
            status: "Selesai"
        };

        transactions.push(transaction);

        // Tampilkan notifikasi
        alert('Terima kasih atas pemesanan Anda! Order sedang diproses.');

        // Reset keranjang
        cart = [];
        renderCart();
    });
});