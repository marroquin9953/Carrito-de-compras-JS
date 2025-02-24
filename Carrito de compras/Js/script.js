// Cart state
let cart = [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Products data
const products = [
    { id: 1, name: 'iMac', price: 2599.99, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1' },
    { id: 2, name: 'iPhone 16 Pro', price: 999.99, image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a' },
    { id: 3, name: 'MacBook Pro', price: 1999.99, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0' }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupEventListeners();
    updateCartUI();
});

function setupEventListeners() {
    // Cart modal
    cartIcon.addEventListener('click', toggleCart);
    closeBtn.addEventListener('click', toggleCart);
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) toggleCart();
    });

    // Product quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', handleQuantityChange);
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    // Cart buttons
    continueShoppingBtn.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Cart Functions
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function handleQuantityChange(e) {
    const input = e.target.parentElement.querySelector('.quantity-input');
    const value = parseInt(input.value);
    
    if (e.target.classList.contains('plus')) {
        input.value = value + 1;
    } else if (e.target.classList.contains('minus') && value > 1) {
        input.value = value - 1;
    }
}

function handleAddToCart(e) {
    const productCard = e.target.closest('.product-card');
    const productId = parseInt(productCard.dataset.id);
    const quantity = parseInt(productCard.querySelector('.quantity-input').value);
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        saveCart();
        updateCartUI();
        toggleCart();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">×</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Save cart to localStorage for checkout page
    localStorage.setItem('checkout_cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// Local Storage Functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}