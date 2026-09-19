```javascript
// =========================
// LOGIN
// =========================

function loginUser() {

    const name = prompt("Enter your name:");

    if (name) {

        alert(
            "Welcome to NL BRANDS, " +
            name +
            "! 👋"
        );

    }

}


// =========================
// SHOPPING CART
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("nlBrandsCart")
    ) || [];


// =========================
// ADD TO CART
// =========================

function addToCart(productName, price) {

    const existingProduct =
        cart.find(
            product =>
                product.name === productName
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,

            price: price,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(
        productName +
        " has been added to your cart! 🛒"
    );

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "nlBrandsCart",
        JSON.stringify(cart)
    );

}


// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(product => {

        totalItems +=
            product.quantity;

        totalPrice +=
            product.price *
            product.quantity;

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        "₹" +
        totalPrice.toLocaleString(
            "en-IN"
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(
        (product, index) => {

            const productTotal =
                product.price *
                product.quantity;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-product">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                        each
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <div class="cart-price">

                    <strong>
                        ₹${productTotal.toLocaleString("en-IN")}
                    </strong>

                </div>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    🗑️

                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );

}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    updateCart();

}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// =========================
// REMOVE PRODUCT
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


// =========================
// CLEAR CART
// =========================

function clearCart() {

    if (cart.length === 0) {

        alert(
            "Your cart is already empty."
        );

        return;

    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (confirmClear) {

        cart = [];

        saveCart();

        updateCart();

    }

}


// =========================
// OPEN CART
// =========================

function openCart() {

    document
        .getElementById("cart-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =========================
// WHATSAPP ORDER
// =========================

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    let message =
        "Hello NL BRANDS! 👋%0A%0A" +
        "I would like to order:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        const productTotal =
            product.price *
            product.quantity;


        total += productTotal;


        message +=
            "👕 " +
            product.name +
            " × " +
            product.quantity +
            " = ₹" +
            productTotal +
            "%0A";

    });


    message +=
        "%0A💰 Total: ₹" +
        total.toLocaleString(
            "en-IN"
        );


    /*
       IMPORTANT:
       Replace this number with
       your WhatsApp business number.

       Example:
       919876543210
    */

    const phoneNumber =
        "91XXXXXXXXXX";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}


// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.getElementById(
        "contact-form"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been received. ✅"
        );


        contactForm.reset();

    }
);


// =========================
// LOAD CART
// =========================

updateCart();
```
