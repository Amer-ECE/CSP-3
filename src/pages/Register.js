import { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPhoneFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import UserContext from "../UserContext";

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
  // exit: {
  //   x: "-100vw",
  //   transition: { ease: "easeInOut" },
  // },
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("hide");

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.error("Email address already in use", {
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
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNum: phoneNum,
              password: password1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                toast.success("Your account has been successfully created", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                navigate("/login");
              } else {
                toast.error("Registration failed, please try again", {
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
        }
      });
  };

  // Form Validation
  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      phoneNum !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      phoneNum.length > 10 &&
      phoneNum.length < 16 &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, phoneNum, password1, password2]);

  // Password Validation
  useEffect(() => {
    if (password1 === "") {
      setPasswordMatch("hide");
    } else if (password1 !== password2) {
      setPasswordMatch("notMatch");
    } else {
      setPasswordMatch("match");
    }
  }, [password1, password2]);

  if (user.id !== null) {
    toast.error("You cannot visit this page", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return <Navigate to="/products" />;
  }

  return (
    <>
      <section className="register-login-section">
        <motion.div
          className="form-wrapper d-flex"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // exit="exit"
        >
          <div className="register-dark-col text-white d-none d-lg-flex align-items-center justify-content-center flex-column">
            <h2>Hello!</h2>
            <p>
              Please, fill out the form <br />
              to create new account.
            </p>
            <span className="my-3">Already have an account?</span>
            <Link className="btn login-btn land-btn" to="/login">
              Login
            </Link>
          </div>
          <div className="register-light-col d-flex align-items-center justify-content-center flex-column">
            <h2 className="fw-bold">Register</h2>
            <Form className="form mt-3" onSubmit={(e) => registerUser(e)}>
              <Form.Group className="my-3" controlId="firstName">
                <Form.Label className="form-label">
                  First Name <MdOutlineDriveFileRenameOutline />
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="lastName">
                <Form.Label className="form-label">
                  Last Name <MdOutlineDriveFileRenameOutline />
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

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

              <Form.Group className="my-3" controlId="phoneNum">
                <Form.Label className="form-label">
                  Phone Number <BsPhoneFill />
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="number"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="password1">
                <Form.Label className="form-label">
                  Password <RiLockPasswordFill />
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password2">
                <Form.Label className="form-label">
                  Confirm Password <RiLockPasswordFill />
                </Form.Label>
                <Form.Control
                  className="form-control"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </Form.Group>

              {passwordMatch === "hide" ? (
                <p></p>
              ) : passwordMatch === "notMatch" ? (
                <p className="password-not-match">Passwords do not match</p>
              ) : (
                <p className="password-match">Passwords match</p>
              )}

              {isActive ? (
                <button
                  type="submit"
                  id="submitBtn"
                  className="btn common-btn register-btn"
                >
                  Register
                </button>
              ) : (
                <button
                  id="submitBtn"
                  className="btn common-btn register-btn disabled"
                >
                  Register
                </button>
              )}
            </Form>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Register;
