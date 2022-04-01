import { useState, useEffect } from "react";
import AppNavbar from "../components/AppNavbar";
import { Container, Row, Col, Table } from "react-bootstrap";

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

  // console.log(ordersData);
  // let orders = ordersData.map((item) => item.products);
  // console.log(orders);

  return (
    <>
      <AppNavbar />
      <Container>
        <h3 className="text-center mt-2">Orders History</h3>
      </Container>
    </>
  );
};

export default Orders;
{
  /* <UserOrders ordersProp={ordersData} /> */
}
