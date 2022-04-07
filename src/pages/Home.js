import AppNavbar from "../components/AppNavbar";
import NewArrivals from "../components/NewArrivals";
import { Container, Row } from "react-bootstrap";
import logo from "../images/logo-dark.png";
import { motion } from "framer-motion";

const banner = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: 0.5,
    },
  },
};

const products = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1, duration: 0.5 },
  },
};

const Home = () => {
  return (
    <>
      <AppNavbar />
      <motion.div
        className="banner d-flex align-items-center justify-content-around mb-2"
        variants={banner}
        initial="hidden"
        animate="visible"
      >
        <h1>Giorgio Armani</h1>
        <img src={logo} alt="logo" className="home-logo" />
        <h1>Design The future</h1>
      </motion.div>
      <Container>
        <motion.h2
          className="text-center mb-3"
          variants={products}
          initial="hidden"
          animate="visible"
        >
          New Arrivals
        </motion.h2>

        <motion.div variants={products} initial="hidden" animate="visible">
          <Row>
            <NewArrivals />
          </Row>
        </motion.div>
      </Container>
    </>
  );
};

export default Home;
