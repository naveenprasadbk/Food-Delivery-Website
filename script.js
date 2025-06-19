const btncart=document.querySelector(".cart-link");
const cart=document.querySelector(".cart");

btncart.addEventListener('click',()=>{
    cart.classList.add("cart-active");
    loadCartFromStorage();
});

function updateTotal(){
    const cartItems=document.querySelectorAll(".cart-box");
    const totalValue=document.querySelector(".total-Price");

    let total=0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector(".cart-price");
        let price=parseFloat(priceElement.innerHTML.replace("₹",""));
        let qty=product.querySelector(".cart-quantity").value;
        total=total+(price*qty);
        product.querySelector(".cart-amt").innerText="₹"+price*qty;
    });
    totalValue.innerHTML="₹"+total;
}

document.addEventListener("DOMContentLoaded",loadFood);

function loadFood(){
    loadContent();
    loadCartFromStorage();
}

function loadContent(){
    //Quantity
    let qtyElements=document.querySelectorAll(".cart-quantity");
    
    qtyElements.forEach((input)=>{
        input.addEventListener("change",changeQty);
    });

    //Add to cart
    let cartbtns=document.querySelectorAll(".order");
    cartbtns.forEach((btn)=>{
        btn.addEventListener("click",addCart);
    });

    updateTotal();
}

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}

let itemList=[];

function addCart(){
   let food=this.parentElement.parentElement;
   let title=food.querySelector("h4").innerHTML;
   let price=food.querySelector("h5").innerHTML;
   let imgsrc=food.querySelector("img").src;
   //console.log(title,price,imgsrc);

   let newProduct={title,price,imgsrc};

   //Check if product is already available in cart
   if(itemList.find((el)=>el.title==newProduct.title))
   {
    alert("Product already added to cart");
    return;
   }
   else{
    itemList.push(newProduct);
   }
   saveCartToStorage();
   let newProductElement=createcartproduct(title,price,imgsrc);
   let element=document.createElement("div");
   element.innerHTML=newProductElement
   let cartBasket=document.querySelector(".cart-content");
   cartBasket.append(element);
   loadContent();
}

function createcartproduct(title,price,imgsrc){
    return `
                <div class="cart-box">
                    <img src="${imgsrc}">
                    <div class="detail-box">
                        <div class="cart-food-title">${title}</div>
                        <div class="cart-price">${price}</div>
                    </div> 
                    <div class="price-box">
                        <div class="cart-amt">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>                
                 </div>
            `;
}

function saveCartToStorage() {
    localStorage.setItem("cartItems", JSON.stringify(itemList));
}


function loadCartFromStorage() {
    const storedItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedItems) {
        itemList = storedItems;
        let cartBasket = document.querySelector(".cart-content");
        cartBasket.innerHTML = "";
        itemList.forEach(item => {
            let newProductElement = createcartproduct(item.title, item.price, item.imgsrc);
            let element = document.createElement("div");
            element.innerHTML = newProductElement;
            cartBasket.append(element);
        });
        loadContent();
    }

    function clearCart() {
        localStorage.removeItem("cartItems");
        itemList = [];
        document.querySelector(".cart-content").innerHTML = "";
        updateTotal();
    }
    

    const reload=document.querySelector(".btn-buy");
    reload.addEventListener("click",()=>{
        alert("Order placed successfully")
        clearCart();
        location.reload();
    });
}
function placed(){
    alert("Item Ordered");
}

    