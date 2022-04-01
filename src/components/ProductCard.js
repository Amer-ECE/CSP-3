import { useContext } from "react";
import { Col, Card } from "react-bootstrap";
// import test from "../images/test.webp";
import { Link } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import UserContext from "../UserContext";

const ProductCard = ({ productProp }) => {
  const { _id, imageUrl, title, description, price, category, quantity } =
    productProp;

  const { addItem } = useCart();
  const newItem = {
    id: productProp._id,
    productId: productProp._id,
    img: productProp.imageUrl,
    title: productProp.title,
    price: productProp.price,
    quantity: productProp.quantity,
  };

  const { user } = useContext(UserContext);

  const addTOBag = () => {
    addItem(newItem);
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

  // console.log(newItem.id);

  return (
    <Col lg="3" md="6">
      <Card className="product-card border-2">
        <Card.Img variant="top" src={imageUrl} className="product-img" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Price: ${price}</Card.Text>
          <Link className="btn details-btn" to={`/products/${_id}`}>
            <BsFillInfoCircleFill className="mb-1" /> Details
          </Link>
        </Card.Body>
        {!user.id ? (
          <Link to="/login">
            <button className="btn bag-btn">
              <BiLogInCircle />
            </button>
          </Link>
        ) : (
          <button className="btn bag-btn" onClick={addTOBag}>
            <MdShoppingBag />
          </button>
        )}
      </Card>
    </Col>
  );
};

export default ProductCard;
