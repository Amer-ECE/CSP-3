import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { useCart } from "react-use-cart";
import { Row, Col, Container, Table } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
// import { total, list, get } from "cart-localstorage";
// import BagView from "../components/BagView";
import { toast } from "react-toastify";

const Bag = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  // const [productId, setProductId] = useState("");
  // let productId;

  const token = localStorage.getItem("token");

  const { user } = useContext(UserContext);

  console.log(items);

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
    emptyCart();
  };

  return (
    <>
      <AppNavbar />
      <Container>
        {isEmpty ? (
          <h3>Your Bag is Empty</h3>
        ) : (
          <Row className="justify-content-center">
            <Col>
              <h5>
                Bag {totalUniqueItems} - Total Items {totalItems}
              </h5>
              <Table light hover>
                <tbody>
                  {items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.img}
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
