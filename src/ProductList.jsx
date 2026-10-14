import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { categories, plants } from './data/plants';

export default function ProductList({ onOpenCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [activeCategory, setActiveCategory] = useState('All plants');
  const [search, setSearch] = useState('');

  const filteredPlants = useMemo(() => plants.filter((plant) => {
    const categoryMatch = activeCategory === 'All plants' || plant.category === activeCategory;
    const searchMatch = plant.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, search]);

  const quantityInCart = (id) => cartItems.find((item) => item.id === id)?.quantity || 0;

  return (
    <main className="shop-page">
      <section className="shop-intro">
        <p className="eyebrow">THE HOUSEPLANT EDIT</p>
        <h1>Find your <em>green</em> thing.</h1>
        <p>Meet the plants that make a house feel more like home.</p>
      </section>

      <section className="shop-toolbar" aria-label="Filter plants">
        <div className="category-tabs">
          {['All plants', ...categories].map((category) => (
            <button key={category}
              className={activeCategory === category ? 'category-tab selected' : 'category-tab'}
              onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <input className="search-input" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search plants…" aria-label="Search plants" />
      </section>

      <section className="product-section">
        <div className="section-heading">
          <div><p className="eyebrow">PICK YOUR PLANT</p><h2>Plants for every kind of space</h2></div>
          <span className="result-count">{filteredPlants.length} plants</span>
        </div>
        {filteredPlants.length === 0 ? (
          <div className="empty-state"><span>🌱</span><h3>No plants found</h3><p>Try another name or choose a different category.</p></div>
        ) : (
          <div className="product-grid">
            {filteredPlants.map((plant) => {
              const inCart = quantityInCart(plant.id);
              return (
                <article className="product-card" key={plant.id}>
                  <div className="product-image-wrap">
                    <img src={plant.image} alt={plant.name} className="product-image"
                      loading="lazy" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'; }} />
                    <span className="product-category">{plant.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="product-card-bottom">
                      <span className="product-price">${plant.price.toFixed(2)}</span>
                      <button className={inCart ? 'add-button added' : 'add-button'}
                        onClick={() => dispatch(addItem(plant))}
                        aria-label={`Add ${plant.name} to cart`}>
                        {inCart ? `Add another (${inCart})` : 'Add to cart'} <span>+</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <div className="floating-cart">
        <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} items in your bag</span>
        <button onClick={onOpenCart}>View cart →</button>
      </div>
    </main>
  );
}