import { useState, useEffect } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Col,
  Card,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminView = (props) => {
  const { productsProp, fetchData } = props;

  const [productsArr, setProductsArr] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [productId, setProductId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);
  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductId(data._id);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setQuantity(data.quantity);
        setCategory(data.category);
        setImageUrl(data.imageUrl);
      });
    setShowEdit(true);
  };
  const closeEdit = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setCategory("");
    setImageUrl("");
    setShowEdit(false);
  };

  const disableTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Disable
    </Tooltip>
  );
  const enableTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Enable
    </Tooltip>
  );
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );

  const token = localStorage.getItem("token");

  // Enable and Disable Product
  const archiveToggle = (productId, isActive) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isActive: !isActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let bool;
          isActive ? (bool = "Disabled") : (bool = "Enabled");

          fetchData();
          toast.success(`Product successfully ${bool}.`, {
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
          fetchData();
          toast.error("Something went wrong, please try again.", {
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

  const addProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        category: category,
        imageUrl: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("New product has been successfully created.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          fetchData();
          closeAdd();

          setTitle("");
          setDescription("");
          setPrice(0);
          setQuantity(0);
          setCategory("");
          setImageUrl("");
        } else {
          toast.error("Something went wrong, please try again.", {
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

  const editProduct = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        category: category,
        imageUrl: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Product successfully Edited.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          fetchData();
          closeEdit();

          setTitle("");
          setDescription("");
          setPrice(0);
          setQuantity(0);
          setCategory("");
          setImageUrl("");
        } else {
          toast.error("Something went wrong, please try again.", {
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
    const products = productsProp.map((product) => {
      return (
        <Col lg="3" md="6" key={product._id}>
          <Card className="product-card border-2">
            <Card.Img
              variant="top"
              src={product.imageUrl}
              className="admin-product-img"
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              {product.isActive ? (
                <Card.Text className="status-available">
                  Status: Available <AiOutlineCheckCircle />
                </Card.Text>
              ) : (
                <Card.Text>
                  Status: Unavailable <AiOutlineCloseCircle />
                </Card.Text>
              )}
              <Link className="btn details-btn" to={`/products/${product._id}`}>
                <BsFillInfoCircleFill className="mb-1" /> Details
              </Link>
            </Card.Body>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={editTooltip}
            >
              <button
                className="btn edit-btn"
                onClick={() => openEdit(product._id)}
              >
                <BiEdit />
              </button>
            </OverlayTrigger>
            {product.isActive ? (
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={disableTooltip}
              >
                <button
                  className="btn disable-btn"
                  onClick={() => archiveToggle(product._id, product.isActive)}
                >
                  <AiOutlineCloseCircle />
                </button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={enableTooltip}
              >
                <button
                  className="btn enable-btn"
                  onClick={() => archiveToggle(product._id, product.isActive)}
                >
                  <AiOutlineCheckCircle />
                </button>
              </OverlayTrigger>
            )}
          </Card>
        </Col>
      );
    });
    setProductsArr(products);
  }, [productsProp]);

  return (
    <>
      <div className="admin-view text-center mt-3">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <button className="add-product-btn" onClick={openAdd}>
          Add New Product
        </button>
      </div>
      {productsArr}

      {/* Add new product modal */}
      <Modal show={showAdd} onHide={closeAdd}>
        <Form className="admin-form" onSubmit={(e) => addProduct(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="my-3" controlId="title">
              <Form.Label className="form-label">Title</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="description">
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                className="form-control description-input"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="price">
              <Form.Label className="form-label">Price</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="quantity">
              <Form.Label className="form-label">Quantity</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="category">
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="imageUrl">
              <Form.Label className="form-label">Image URL</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="danger" onClick={closeAdd}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>

      {/* Edit product modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form className="admin-form" onSubmit={(e) => editProduct(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="my-3" controlId="title">
              <Form.Label className="form-label">Title</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="description">
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                className="form-control description-input"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="price">
              <Form.Label className="form-label">Price</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="quantity">
              <Form.Label className="form-label">Quantity</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="category">
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="imageUrl">
              <Form.Label className="form-label">Image URL</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="danger" onClick={closeEdit}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default AdminView;
