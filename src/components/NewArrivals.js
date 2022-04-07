import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";

const NewArrivals = () => {
  const [productData, setProductData] = useState([]);
  const { user } = useContext(UserContext);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/newAdded`)
      .then((res) => res.json())
      .then((data) => setProductData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {productData.map((product) => {
        return (
          <Col lg="3" md="6" key={product._id}>
            <Card className="product-card border-2">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                className="product-img"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Link
                  className="btn details-btn"
                  to={`/products/${product._id}`}
                >
                  <BsFillInfoCircleFill className="mb-1" /> Details
                </Link>
              </Card.Body>

              <button className="new-btn">
                <AiFillFire />
              </button>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

export default NewArrivals;
