import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Test Product 1",
    description: "This is a first product - amazing!",
    price: 6,
  },
  {
    id: "p2",
    title: "Test Product 2",
    description: "This is a second product - amazing!",
    price: 5,
  },
  {
    id: "p3",
    title: "Test Product 3",
    description: "This is a third product - amazing!",
    price: 7,
  },
  {
    id: "p4",
    title: "Test Product 4",
    description: "This is a fourth product - amazing!",
    price: 8,
  },
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            title={product.title}
            description={product.description}
            price={product.price}
            key={product.id}
            id={product.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
