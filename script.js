// 1. MENÚ RESPONSIVE EN MÓVILES
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. FILTRO DE PRODUCTOS POR CATEGORÍA
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-filter');

        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 3. CARRITO DE COMPRAS INTERACTIVO
let carrito = [];
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

openCartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    
    openCartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => openCartBtn.style.transform = 'scale(1)', 200);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    cartCount.textContent = carrito.length;
    cartItemsContainer.innerHTML = '';

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
        cartTotal.textContent = 'S/ 0.00';
        return;
    }

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div>
                <strong>${item.nombre}</strong>
                <p style="font-size: 0.85rem; color: #64748b;">S/ ${item.precio.toFixed(2)}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `S/ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Agrega al menos un producto antes de finalizar.');
        return;
    }
    alert('¡Gracias por tu compra en Dilan TECH! Tu pedido ha sido procesado.');
    carrito = [];
    actualizarCarrito();
    cartModal.classList.remove('active');
}

// 4. BOTÓN FLOTANTE DE INFORMACIÓN
const floatingInfoBtn = document.getElementById('floatingInfoBtn');
const infoPopup = document.getElementById('infoPopup');
const closePopupBtn = document.getElementById('closePopupBtn');

floatingInfoBtn.addEventListener('click', () => {
    infoPopup.classList.toggle('show');
});

closePopupBtn.addEventListener('click', () => {
    infoPopup.classList.remove('show');
});