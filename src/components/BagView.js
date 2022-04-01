// import { useState, useEffect, useContext } from "react";
// import { Row, Col, Table, Container } from "react-bootstrap";
// // import { list, quantity, remove, total } from "cart-localstorage";
// import UserContext from "../UserContext";
// // import Products from "../pages/Products";
// import { useCart } from "react-use-cart";
// // import AppNavbar from "./AppNavbar";

// const BagView = (props) => {
//   // const increaseQuantity = () => {
//   //   quantity(props.id, +1);
//   // };

//   const {
//     items,
//     isEmpty,
//     totalUniqueItems,
//     totalItems,
//     cartTotal,
//     updateItemQuantity,
//     removeItem,
//     emptyCart,
//   } = useCart();

//   // const [productId, setProductId] = useState("")
//   // const [quantity, setQuantity] = useState(0)

//   const productId = props.id;
//   const quantity = props.quantity;

//   // console.log(props.quantity);

//   const { user } = useContext(UserContext);
//   // const { fetchData } = props;

//   const token = localStorage.getItem("token");

//   const checkOut = (e) => {
//     e.preventDefault();

//     fetch(`${process.env.REACT_APP_API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         userId: user.id,
//         Products: {
//           productId: productId,
//           quantity: quantity,
//         },
//         totalAmount: cartTotal,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           console.log(data);
//         }
//       });
//   };

//   if (isEmpty) return <h1>Your Bag is Empty</h1>;

//   return (
//     <>
//       <Row className="justify-content-center mt-2">
//         <Col>
//           <h5>
//             Bag {totalUniqueItems} - Total Items {totalItems}
//           </h5>
//           <Table light hover>
//             <tbody>
//               <tr key={items.id}>
//                 <td>
//                   <img src={items.img} style={{ height: "6rem" }} alt="img" />
//                 </td>
//                 <td>{items.title}</td>
//                 <td>{items.price}</td>
//                 <td>Quantity {items.quantity}</td>
//                 <td>
//                   <button
//                     className="btn btn-info ms-2"
//                     onClick={() =>
//                       updateItemQuantity(items.id, items.quantity - 1)
//                     }
//                   >
//                     -
//                   </button>
//                   <button
//                     className="btn btn-info ms-2"
//                     onClick={() =>
//                       updateItemQuantity(items.id, items.quantity + 1)
//                     }
//                   >
//                     +
//                   </button>
//                   <button
//                     className="btn btn-danger ms-2"
//                     onClick={() => removeItem(items.id)}
//                   >
//                     Remove Item
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//       <div>
//         <h5>Total Amount: {cartTotal}</h5>
//         <button>Check Out</button>
//       </div>
//       {/* <Row className="justify-content-center">
//         <Col>
//           <Table light hover>
//             <tbody>
//               <tr key={props.id}>
//                 <td>
//                   <img src={props.img} style={{ height: "6rem" }} alt="img" />
//                 </td>
//                 <td>{props.title}</td>
//                 <td>{props.price}</td>
//                 <td>Quantity {props.quantity}</td>
//                 <td>
//                   <button
//                     className="btn btn-info ms-2"
//                     onClick={() =>
//                       updateItemQuantity(props.id, props.quantity - 1)
//                     }
//                   >
//                     -
//                   </button>
//                   <button
//                     className="btn btn-info ms-2"
//                     onClick={() =>
//                       updateItemQuantity(props.id, props.quantity + 1)
//                     }
//                   >
//                     +
//                   </button>
//                   <button
//                     className="btn btn-danger ms-2"
//                     onClick={() => removeItem(props.id)}
//                   >
//                     Remove Item
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//       <h5>Total Amount: {cartTotal}</h5>
//       <button onClick={(e) => checkOut(e)}>Check Out</button> */}
//     </>
//   );
// };

// export default BagView;

// const { items } = useCart();

// const bag = items.map((item) => {
//   return <BagView key={item.id} {...item} />;
// });

// console.log(props);

// const bag = list().map((item) => {
//   return <BagView key={item.id} {...item} />;
// });
// const {
//   isEmpty,
//   totalUniqueItems,
//   items,
//   totalItems,
//   cartTotal,
//   updateItemQuantity,
//   removeItem,
//   emptyCart,
// } = useCart();

// const { user } = useContext(UserContext);

// const token = localStorage.getItem("token");
// let cart = localStorage.getItem("__cart");
// console.log(products);

// const addOrder = (e) => {
//   e.preventDefault();

//   fetch(`${process.env.REACT_APP_API_URL}/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       userId: user.id,
//       products: {
//         productId: "623e7ccf20ca43a476c5d2b4",
//         quantity: 2,
//       },

//       // totalAmount: cartTotal,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data) {
//         console.log(data);
//       } else {
//         return false;
//       }
//     });
// };
