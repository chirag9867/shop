class Product {
    // title = 'default';
    // imageURL;
    // description;
    // price;

    constructor(title, image, desc, price){
        this.title = title;
        this.imageURL = image;
        this.description = desc;
        this.price = price;

    }
}

class ProductItem {
    constructor(product){
        this.product = product;
    }

    addToCart(){
        App.addProductToCart(this.product);
        console.log(`${this.product.title} is added to the cart for ${this.product.price}`);

    }

    render(){
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src = "${this.product.imageURL}" alt = "${this.product.title}">
                <div class = "product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>Rs. ${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </ div>
        `;
        const addToCartButton = prodEl.querySelector('button');
        addToCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
    
}
class ElementAttributr{
    constructor(attrName, attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId){
        this.hookId = renderHookId;
    }
    createRootElement(tag, cssClasses, attributes){
        const rootElement = document.createElement(tag);
        if(cssClasses){
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;

    }
}

class ShopCart extends Component{
    items = [];

    set cartItems(value){
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total Amount: Rs ${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, currItem) => {
            return prevValue + currItem.price;
        }, 0);
        return sum
    }

    constructor(renderHookId) {
        super(renderHookId); //
    }

    addProduct(product){
        //this.items.push(product);

        const updatedItems = [...this.items]
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render(){
        //const cartEl = document.createElement('section');
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total Amount: Rs ${0}</h2>
        <button>Order Now</button>
        `;
        //cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2');

    }
}

class ProductList {
    product = [
        new Product(
            "Robot", 
            "./assets/scripts/robot.jpg",
            'Robot',
             5000),

        new Product(
            'Pillow',
            'https://skylark-owl.ca/products/refined-pillow-canada?srsltid=AfmBOoqXbeixnEbjOSvM4BGZLbgIFtfDxYwSwgC3iJ6OwIQ9r1G6k3u0',
            'A soft Pillow',
             200),

        new Product(
            'Carpet', 
            'https://rugroom.in/products/green-plus-woolen-hand-tufted-handmade-carpet?srsltid=AfmBOorg8VnDOkTERmyouXTM7QBm3bd5QNKfN849Rz-NIiCUFLXqommT', 
            'A soft carpet', 
             2000 )
    ];


    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for(const prod of this.product){
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;

    }

}

class Shop{
    render(){
        const renderHook = document.getElementById('app');
        
        this.cart = new ShopCart('app');
        //const cartEl = this.cart.render();
        this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();

        //renderHook.append(cartEl);
        renderHook.append(prodListEl);

    }
}


class App {
    static cart;

    static init(){
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product); 
    }


}

App.init();

