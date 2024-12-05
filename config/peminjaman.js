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

// Global variables
let cart = [];
let selectedProductId = null;

// Function untuk merender produk
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" 
                 class="select-product" 
                 alt="${product.name}" 
                 data-id="${product.id}" 
                 style="cursor: pointer;">
            <h5>${product.name}</h5>
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
                <medium class="text-muted">Tanggal Pinjam: ${item.rentalDate}</medium>
            </div>
            <div style="margin-bottom: 15px;" class="d-flex padding align-items-center">
                <button class="remove-from-cart" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    // Update total count
    document.getElementById('cartTotal').textContent = cart.length;
}

// Function untuk menampilkan modal
function showModal(productId) {
    selectedProductId = productId;
    const modal = document.getElementById('dateSelectionModal');
    const dateInput = document.getElementById('rentalDate');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    
    modal.style.display = 'flex';
}

// Function untuk menutup modal
function closeModal() {
    const modal = document.getElementById('dateSelectionModal');
    modal.style.display = 'none';
    selectedProductId = null;
}

// Function untuk mencari produk
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" 
                 class="select-product" 
                 alt="${product.name}" 
                 data-id="${product.id}" 
                 style="cursor: pointer;">
            <h5>${product.name}</h5>
        `;
        productList.appendChild(productElement);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Render initial products
    renderProducts();

    // Event listener untuk search
    const searchInput = document.querySelector('.search input');
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    // Event listener untuk modal close button
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelModal').addEventListener('click', closeModal);

    // Event listener untuk konfirmasi peminjaman
    document.getElementById('confirmRentalDate').addEventListener('click', function() {
        const rentalDate = document.getElementById('rentalDate').value;
        
        if (!rentalDate) {
            alert('Silakan pilih tanggal peminjaman');
            return;
        }

        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === selectedProductId);
        if (existingItem) {
            alert('Buku ini sudah ada di keranjang!');
            closeModal();
            return;
        }

        // Add to cart
        cart.push({
            id: selectedProductId,
            rentalDate: rentalDate
        });

        // Update cart display
        renderCart();
        
        // Close modal
        closeModal();
    });

    // Event listener untuk pemilihan produk dan remove dari cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('select-product')) {
            const productId = parseInt(e.target.dataset.id);
            showModal(productId);
        }
        
        if (e.target.classList.contains('remove-from-cart') || 
            e.target.parentElement.classList.contains('remove-from-cart')) {
            const button = e.target.classList.contains('remove-from-cart') ? 
                          e.target : 
                          e.target.parentElement;
            const productId = parseInt(button.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            renderCart();
        }
    });

    // Event listener untuk checkout
    document.getElementById('checkoutButton').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Keranjang kosong! Silakan pilih buku terlebih dahulu.');
            return;
        }
        
        // Implementasi checkout bisa ditambahkan di sini
        alert('Proses checkout akan diimplementasikan di sini');
        // Reset cart setelah checkout
        cart = [];
        renderCart();
    });

    // Click outside modal to close
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('dateSelectionModal');
        if (e.target === modal) {
            closeModal();
        }
    });
});