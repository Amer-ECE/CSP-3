import errorImg from "../images/404.png";
import { Link } from "react-router-dom";
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

const Error = () => {
  return (
    <motion.div
      className="d-flex flex-column align-items-center justify-content-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <img src={errorImg} alt="ErrorImg" className="error-img" />
      <Link to="/home">
        <motion.button
          className="empty-bag-btn btn"
          variants={buttonVariants}
          whileHover="hover"
        >
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Error;
