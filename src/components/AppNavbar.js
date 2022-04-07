import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import navLogo from "../images/logo-white.png";
import { MdShoppingBag } from "react-icons/md";
import UserContext from "../UserContext";
import { useContext } from "react";

const AppNavbar = () => {
  const { user, unsetUser } = useContext(UserContext);

  const logout = () => {
    unsetUser();
  };

  const rightNav = !user.id ? (
    <>
      <Link className="btn common-btn px-3 me-3 register-btn" to="/register">
        Register
      </Link>
      <Link className="btn common-btn px-3  login-btn" to="/login">
        Login
      </Link>
    </>
  ) : (
    <>
      {user.isAdmin ? (
        <Link className="nav-link text-white" to="/allOrders">
          Users Orders
        </Link>
      ) : (
        <Link className="nav-link text-white" to="/orders">
          Orders
        </Link>
      )}

      <Link className="nav-link text-white" to="/bag">
        <MdShoppingBag /> Bag
      </Link>

      <Link
        className="btn btn-danger common-btn px-3  login-btn"
        onClick={logout}
        to="/login"
      >
        Logout
      </Link>
    </>
  );

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container className="nav-container d-flex align-items-center justify-content-between">
          <Navbar.Brand>
            <Link to="/home">
              <img src={navLogo} alt="navLogo" className="nav-logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </Nav>
            <Nav className="right-nav">{rightNav}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
