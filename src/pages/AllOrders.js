import { useState, useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import { Container, Accordion, Row, Col } from "react-bootstrap";

const AllOrders = () => {
  const [ordersData, SetOrdersData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/allOrders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        SetOrdersData(data);
      });
  };

  const fetchUser = () => {
    ordersData.map((item) => {
      fetch(`${process.env.REACT_APP_API_URL}/users/${item.userId}`)
        .then((res) => res.json())
        .then((data) => setUsersData(data));
    });
  };

  useEffect(() => {
    fetchUser();
  }, [ordersData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="text-center mt-2">Users Orders</h3>
        {ordersData.map((item) => {
          return (
            <Row>
              <Col>
                <Accordion defaultActiveKey="0" className="my-1">
                  <Accordion.Item key={item._id}>
                    <Accordion.Header>
                      <div className="order-history-wrapper d-md-flex justify-content-around align-items-center">
                        <p className="my-auto py-2">
                          Ordered By: {usersData.email} <br />
                          Phone Number: {usersData.phoneNum}
                        </p>
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

export default AllOrders;
