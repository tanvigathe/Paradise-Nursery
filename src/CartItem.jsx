import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? (subtotal >= 60 ? 0 : 4.99) : 0;
  const total = subtotal + delivery;

  return (
    <main className="cart-page">
      <div className="cart-page-heading">
        <div><p className="eyebrow">YOUR LITTLE JUNGLE</p><h1>Shopping <em>cart.</em></h1>
          <p className="muted">{totalItems} {totalItems === 1 ? 'plant' : 'plants'} ready for a new home</p></div>
        <button className="outline-button" onClick={onContinueShopping}>← Continue shopping</button>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon">🪴</div>
          <h2>Your cart is taking a little breather.</h2>
          <p>It looks like you haven't added any plants yet.</p>
          <button className="primary-button dark-button" onClick={onContinueShopping}>Explore plants →</button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-list">
            <div className="cart-list-header"><span>PLANT</span><span>QUANTITY</span><span>TOTAL</span></div>
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <div className="cart-product">
                  <img src={item.image} alt={item.name}
                    onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80'; }} />
                  <div><h3>{item.name}</h3><p>{item.category}</p><span>${item.price.toFixed(2)} each</span>
                    <button className="remove-link" onClick={() => dispatch(removeItem(item.id))}>Remove</button></div>
                </div>
                <div className="quantity-control">
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
            <button className="clear-cart-link" onClick={() => dispatch(clearCart())}>Clear entire cart</button>
          </section>
          <aside className="order-summary">
            <p className="eyebrow">THE DETAILS</p><h2>Order summary</h2>
            <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span></div>
            {subtotal > 0 && subtotal < 60 && <p className="shipping-note">Add ${(60 - subtotal).toFixed(2)} more for free delivery.</p>}
            <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
            <button className="checkout-button" onClick={() => window.alert('Thank you! Checkout is a demo for this course project.')}>Continue to checkout ↗</button>
            <p className="secure-note">♡ Carefully packed, ready to grow.</p>
          </aside>
        </div>
      )}
    </main>
  );
}