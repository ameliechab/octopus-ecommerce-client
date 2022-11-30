import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";

const Cart = ({ creations }) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    apiHandler.getOrder().then((res) => {
      console.log(res);
      setOrder(res);
    });
  }, []);

  console.log("tatita", order);

  if (!order.length) {
    return <div className="loading">Loading...</div>;
  }

  console.log(order[0].creations);
  const creationOfOrder = order[0].creations;

  return (
    <div>
      <div>
        <ul>
          {creationOfOrder.map((element) => {
            return (
              <>
                <li>
                  {
                    creations.find(
                      (creation) => creation._id === element.productId
                    ).title
                  }

                  <h3>Quantity: {element.quantity}</h3>
                  <h3>Id: {element.productId}</h3>
                  {/* <Link to={`${element._id}`}>{element.name}</Link> */}
                  {/* <h3>{element.name}</h3>
          <div>{element.description}</div> */}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
