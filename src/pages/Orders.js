import { useState, useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import { Container, Row, Col, Accordion } from "react-bootstrap";

const Orders = () => {
  const [ordersData, SetOrdersData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/myOrders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        SetOrdersData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="text-center mt-2">Orders History</h3>
        {ordersData.map((item) => {
          return (
            <Row>
              <Col key={item._id}>
                <Accordion defaultActiveKey="0" className="my-1">
                  <Accordion.Item>
                    <Accordion.Header>
                      <div className="order-history-wrapper d-md-flex justify-content-around align-items-center">
                        <p className="my-auto py-2">OrderId: {item._id}</p>
                        <span className="d-none d-md-block"></span>
                        <p className="my-auto py-2">Status: {item.status}</p>
                        <span className="d-none d-md-block"></span>
                        <p className="my-auto py-2">
                          Ordered On: {item.orderedOn}
                        </p>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div id="orderDetails">
                        {item.products.map((product) => {
                          return (
                            <div
                              key={product._id}
                              className="order-info d-md-flex align-items-center my-2"
                            >
                              <img
                                src={product.imageUrl}
                                style={{ height: "6rem" }}
                                alt="productImage"
                              />
                              <div className="order-text ms-3">
                                <p>Title: {product.title}</p>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          );
                        })}

                        <p>Total Amount: {item.totalAmount}</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
};

export default Orders;
