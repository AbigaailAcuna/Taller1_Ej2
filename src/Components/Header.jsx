import { useState } from "react";

export const Header = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const onDeleteProduct = product => {
        const results = allProducts.filter(item => item.id !== product.id);
        const productsCount = results.reduce((total, item) => total + item.quantity, 0);

        setTotal(total - product.price * product.quantity);
        setCountProducts(productsCount); // Actualiza el contador con la cantidad total
        setAllProducts(results);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        const productsCount = 0;
        setCountProducts(productsCount);
    };

    return (
        <header>
            <h1>Jaguar Sport</h1>
            <div className='container-icon'>
                <div
                    className='container-cart-icon'
                    onClick={() => setActive(!active)}
                >
                    <img
                        src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
                        alt="carrito"
                        className="icon-cart" />
                    <div className='count-products'>
                        <span id='contador-productos'>
                            {allProducts.reduce((total, product) => total + product.quantity, 0)}
                        </span>
                    </div>
                </div>
                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'
                        }`}
                >
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product'
                                        key={product.id}>
                                        <div className='info-cart-product'>
                                            <p
                                                className='titulo-producto-carrito'>
                                                {product.title}
                                            </p>
                                            <span
                                                className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                            <img
                                                src={product.urlImage}
                                                alt={product.title}
                                                className='imagen-producto-carrito'
                                            />
                                        </div>

                                        <input className="cantidad"
                                            type="number"
                                            value={product.quantity}
                                            onChange={(event) => {
                                                const newQuantity = parseInt(event.target.value);
                                                if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                    const updatedProducts = allProducts.map((item) =>
                                                        item.id === product.id
                                                            ? { ...item, quantity: newQuantity }
                                                            : item
                                                    );

                                                    const newTotal = updatedProducts.reduce(
                                                        (acc, item) => acc + item.price * item.quantity,
                                                        0
                                                    );

                                                    setTotal(newTotal);
                                                    setAllProducts(updatedProducts);
                                                }
                                            }}
                                        />
                                        <img
                                            src="https://i.pinimg.com/564x/09/90/f8/0990f82b768e363f0dec55de307fdf4c.jpg"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                            <button className='btn-clear-all'
                                onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>);
};