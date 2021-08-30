import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { listAllOrders, deleteOrder } from "../../actions/order";
import { ORDER_DELETE_RESET } from "../../actions/types";

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    // User Auth
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    // Order List
    const listOrders = useSelector((state) => state.listOrders);
    const { loading, orders, error } = listOrders;

    // Product Delete
    const orderDelete = useSelector((state) => state.orderDelete);
    const { loadingDelete, error: errorDelete, message } = orderDelete;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (userInfo.role !== "admin") {
                history.push("/");
            }
            dispatch(listAllOrders());
        }
        if (message) {
            setTimeout(() => {
                dispatch({ type: ORDER_DELETE_RESET });
            }, 500);
        }
    }, [dispatch, history, userInfo, message]);

    const deleteHandler = (e, id) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete order #${id} ?`)) {
            dispatch(deleteOrder(id));
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>
            {loadingDelete && <Message variant="danger">Deleting...</Message>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {message && <Message variant="success">{message}</Message>}

            {loading && !message ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : orders ? (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>ORDER ITEMS</th>
                            <th>PRICE</th>
                            <th>DATE</th>
                            <th>PAYMENT METHOD</th>
                            <th>PAID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>#{order._id}</td>
                                    <td>{`${order.user.name} ${order.user.surname}`}</td>
                                    <td>
                                        {order.orderItems &&
                                            order.orderItems.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        {`${item.name} x ${item.qty}`}
                                                    </li>
                                                );
                                            })}
                                    </td>
                                    <td>
                                        {order.currency === "hkd"
                                            ? `HKD $ ${order.totalPrice}`
                                            : `JPY ¥ ${order.totalPrice}`}
                                    </td>
                                    <td>{order.paidAt.substring(0, 10)}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        {order.isPaid ? "Paid" : "Not paid"}
                                    </td>
                                    <td>
                                        <ButtonGroup className="d-flex justify-content-center">
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button
                                                    type="button"
                                                    className="m-1 btn-sm"
                                                    variant="info"
                                                >
                                                    Order Details
                                                </Button>
                                            </LinkContainer>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <></>
            )}
        </>
    );
};

export default OrderListScreen;
