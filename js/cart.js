let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];


document.addEventListener(
"click",
function(e){

    const button =
    e.target.closest(
    ".add-cart"
    );

    if(!button) return;


    const product = {

        name:
        button.getAttribute(
        "data-name"
        ),

        price:
        Number(
        button.getAttribute(
        "data-price"
        )),

        img:
        button.getAttribute(
        "data-img"
        ),

        quantity: 1
    };


    const existingProduct =
    cart.find(function(item){

        return item.name
        === product.name;

    });


    if(existingProduct){

        existingProduct.quantity++;

    }else{

        cart.push(product);
    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    showNotification(
    "Added to Bag"
    );

});


const cartItems =
document.getElementById(
"cart-items"
);



function showCart(){

    if(!cartItems)
    return;


    cartItems.innerHTML =
    "";

    let total = 0;


    const emptyMessage =
    document.getElementById(
    "empty-message"
    );


    if(emptyMessage){

        if(cart.length === 0){

            emptyMessage
            .style.display =
            "block";

        }else{

            emptyMessage
            .style.display =
            "none";
        }
    }



    cart.forEach(function(
    item, index){

        total +=
        item.price *
        item.quantity;


        cartItems.innerHTML +=
        `

        <div class="cart-item">

            <img
            src="${item.img}"
            alt="${item.name}">


            <div class="cart-info">

                <h3>
                ${item.name}
                </h3>

                <p>
                Nike Product
                </p>

                <p>
                $${item.price}
                </p>

                <p>
                Quantity:
                ${item.quantity}
                </p>


                <button
                class="remove-btn"
                onclick=
                "removeItem(${index})">

                Remove

                </button>

            </div>

        </div>

        `;
    });



    const subtotal =
    document.getElementById(
    "cart-subtotal"
    );


    const totalBox =
    document.getElementById(
    "cart-total"
    );



    if(subtotal){

        subtotal.textContent =
        total.toFixed(2);
    }


    if(totalBox){

        totalBox.textContent =
        total.toFixed(2);
    }

}




function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showCart();
}




function showNotification(
message
){

    const oldNotification =
    document.querySelector(
    ".bag-notification"
    );


    if(oldNotification){

        oldNotification
        .remove();
    }


    const notification =
    document.createElement(
    "div"
    );


    notification.className =
    "bag-notification";


    notification.textContent =
    message;


    document.body
    .appendChild(
    notification
    );


    setTimeout(function(){

        notification.remove();

    }, 2000);

}



showCart();

