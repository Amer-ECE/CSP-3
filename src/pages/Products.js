import { useState, useEffect, useContext } from "react";
import AppNavbar from "../components/AppNavbar";
import UserView from "../components/UserView";
import { Container, Row } from "react-bootstrap";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
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

const Products = () => {
  const { user } = useContext(UserContext);

  let [productsData, setProductsData] = useState([]);

  const [search, setSearch] = useState("");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  if (search.length > 0) {
    productsData = productsData.filter((i) => {
      return i.title.toLowerCase().match(search);
    });
  }
  return (
    <>
      <AppNavbar />
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            className="mt-1 search-bar"
            type="text"
            placeholder="Search product by name"
            onChange={handleSearch}
            value={search}
          />
          {/* <button>Men</button> */}
          {user.isAdmin === true ? (
            <Row className="mt-1 g-4">
              <AdminView productsProp={productsData} fetchData={fetchData} />
            </Row>
          ) : (
            <Row className="mt-1 g-4">
              <UserView productsProp={productsData} />
            </Row>
          )}
        </motion.div>
      </Container>
    </>
  );
};

export default Products;
