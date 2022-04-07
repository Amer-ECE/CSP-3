import { useContext } from "react";
import UserContext from "../UserContext";
import { useCart } from "react-use-cart";
import { Row, Col, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import { toast } from "react-toastify";
import emptyBag from "../images/empty-bag.png";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      yoyo: Infinity,
    },
  },
};

const Bag = () => {
  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const token = localStorage.getItem("token");

  const { user } = useContext(UserContext);

  const checkOut = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.id,
        products: items,
        totalAmount: cartTotal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Order successfully created", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          emptyCart();
        } else {
          toast.error("Something went wrong, please try again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  return (
    <>
      <AppNavbar />
      <Container>
        {isEmpty ? (
          <motion.div
            className="d-flex flex-column align-items-center justify-content-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <img src={emptyBag} alt="emptyBag" className="empty-bag-img mt-1" />
            <h3 className="fw-bold my-3">Your Bag is Empty</h3>
            <Link to="/products">
              <motion.button
                className="empty-bag-btn btn"
                variants={buttonVariants}
                whileHover="hover"
              >
                Show Products
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <Row className="justify-content-center">
            <Col>
              <h5 className="text-center my-2">
                Total Items: <span className="total-items">{totalItems}</span>
              </h5>
              <Table light hover>
                <tbody>
                  {items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.imageUrl}
                            style={{ height: "6rem" }}
                            alt="img"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>Quantity {item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-info ms-2"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <button
                            className="btn btn-info ms-2"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove Item
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <h5>Total Amount: {cartTotal}</h5>
              <button onClick={(e) => checkOut(e)} className="btn btn-success">
                Check Out
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Bag;
