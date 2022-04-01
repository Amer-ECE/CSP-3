import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
// import UserContext from "../UserContext";
// import { toast } from "react-toastify";
import AppNavbar from "../components/AppNavbar";
// import { useCart } from "react-use-cart";

const ProductDetails = () => {
  const { productId } = useParams();

  // const { user } = useContext(UserContext);
  // const { addItem } = useCart();
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

  // const [counter, setCounter] = useState(1);
  // const [isActive, setIsActive] = useState(false);

  // const addHandler = () => {
  //   if (counter < productData.quantity) {
  //     setCounter(counter + 1);
  //   }
  // };
  // const subtractHandler = () => {
  //   if (counter > 1) {
  //     setCounter(counter - 1);
  //   }
  // };

  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col lg="12">
            <section className="product-details-wrapper d-md-flex  align-items-center justify-content-between mt-5">
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

              {/* <div className="add-to-bag">
                <button className="plus-btn" onClick={addHandler}>
                  +
                </button>
                <input type="number" value={counter} />
                <button className="subtract-btn" onClick={subtractHandler}>
                  -
                </button>
                {user.id !== null ? (
                  <button className="d-block mt-3 add-to-bag-btn">
                    Add to bag
                  </button>
                ) : (
                  <Link className="btn d-block mt-3 add-to-bag-btn" to="/login">
                    Login
                  </Link>
                )}
              </div> */}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
