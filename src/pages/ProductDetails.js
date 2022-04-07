import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
import AppNavbar from "../components/AppNavbar";
import { useCart } from "react-use-cart";

const ProductDetails = () => {
  const { productId } = useParams();

  const { user } = useContext(UserContext);
  const [productData, setProductData] = useState({});

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [counter, setCounter] = useState(1);

  const addHandler = () => {
    if (counter < productData.quantity) {
      setCounter(counter + 1);
    }
  };
  const subtractHandler = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const newItem = {
    id: productData._id,
    productId: productData._id,
    imageUrl: productData.imageUrl,
    title: productData.title,
    price: productData.price,
    quantity: productData.quantity,
  };
  const { addItem } = useCart();
  const addToBag = () => {
    addItem(newItem, counter);
    toast.success("Item Added to Bag", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const adminLimit = () => {
    toast.info("Admin is not allowed to process this action", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col lg="12">
            <section className="product-details-wrapper d-lg-flex  align-items-center justify-content-between mt-5">
              <img
                src={productData.imageUrl}
                alt="productImage"
                className="product-img me-4"
              />
              <div className="details me-5">
                <h5 className="fw-bold">{productData.title}</h5>
                <h6>
                  <span>Description:</span> <br />
                  {productData.description}
                </h6>
                <h6>Price: ${productData.price}</h6>
              </div>

              <div className="add-to-bag">
                <button className="plus-btn" onClick={addHandler}>
                  +
                </button>
                <input type="number" value={counter} />
                <button className="subtract-btn" onClick={subtractHandler}>
                  -
                </button>
                {user.id !== null ? (
                  user.isAdmin ? (
                    <button
                      onClick={adminLimit}
                      className="d-block mt-3 add-to-bag-btn"
                    >
                      Add to bag
                    </button>
                  ) : (
                    <button
                      onClick={addToBag}
                      className="d-block mt-3 add-to-bag-btn"
                    >
                      Add to bag
                    </button>
                  )
                ) : (
                  <Link className="btn d-block mt-3 add-to-bag-btn" to="/login">
                    Login
                  </Link>
                )}
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
