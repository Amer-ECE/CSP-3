import { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: "-100px",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: 0.5,
    },
  },
};

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);

          fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUser({
                id: data._id,
                isAdmin: data.isAdmin,
              });
              toast.success("Login Successful", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              navigate("/home");
            });
        } else {
          toast.error("Incorrect email or password", {
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

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  if (user.id !== null) {
    return <Navigate to="/products" />;
  }

  return (
    <section className="register-login-section">
      <motion.div
        className="form-wrapper d-flex"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="login-light-col d-flex align-items-center justify-content-center flex-column">
          <h2 className="fw-bold">Login</h2>
          <Form className="form mt-3" onSubmit={(e) => loginUser(e)}>
            <Form.Group className="my-3" controlId="email">
              <Form.Label className="form-label">
                Email <MdEmail />
              </Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="password">
              <Form.Label className="form-label">
                Password <RiLockPasswordFill />
              </Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isActive ? (
              <button type="submit" className="btn login-btn" id="logInBtn">
                Login
              </button>
            ) : (
              <button className="btn login-btn disabled" id="logInBtn">
                Login
              </button>
            )}
          </Form>
        </div>

        <div className="login-dark-col text-white d-none d-lg-flex align-items-center justify-content-center flex-column">
          <h2>Welcome back!</h2>
          <p>
            Enter your personal details <br />
            to start shopping with us.
          </p>
          <span className="my-3">Create a new account?</span>
          <Link className="btn common-btn land-btn register-btn" to="/register">
            Register
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
