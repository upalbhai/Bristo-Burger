import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { GiArmoredBoomerang } from 'react-icons/gi';
import { getAdminOrders, processOrder } from '../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader';
import toast from 'react-hot-toast';
import '../../styles/table.scss';

export default function Orders() {
  const dispatch = useDispatch();
  const { loading, orders, message, error } = useSelector(state => state.admin);
  const processOrderHandler = (id) => {
    dispatch(processOrder(id));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAdminOrders());
  }, [dispatch, error, message]);

  console.log('Orders:', orders);

  return (
    <section className="tableClass">
      {loading === false ? (
        <main>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Item Quantity</th>
                <th>Amount</th>
                <th>User</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      {order.orderItems.cheeseBurger.quantity +
                        order.orderItems.vegCheeseBurger.quantity +
                        order.orderItems.burgerWithFries.quantity}
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.user.name}</td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <AiOutlineEye />
                      </Link>
                      <button onClick={() => processOrderHandler(order._id)}>
                        <GiArmoredBoomerang />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
}
