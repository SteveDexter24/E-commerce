import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { fetchAllProducts } from "../../actions/product";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    // User Auth
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    // User Settings
    const settings = useSelector((state) => state.settings);
    const { language, country, currency } = settings;

    // Product List
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (userInfo.role !== "admin") {
                history.push("/");
            }
            dispatch(fetchAllProducts());
        }
    }, [dispatch, history, userInfo]);

    const deleteHandler = (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure")) {
            // dispatch(deleteUser(id));
        }
    };
    const createProductHandler = () => {
        console.log("create product");
    };
    return (
        <>
            {/* {successDelete && (
                <Message variant="success">
                    {"User Deleted Successfully"}
                </Message>
            )}
            {deleteError && <Message variant="danger">{deleteError}</Message>} */}
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <div className="d-flex justify-content-end">
                        <Button
                            className="my-3 align-items-right"
                            onClick={createProductHandler}
                        >
                            <i className="fas fa-plus" />
                            {` Create Product`}
                        </Button>
                    </div>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : products ? (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Gender</th>
                            <th>Style</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.productName[language]}</td>
                                    <td>
                                        {currency === "hkd" ? "$ " : "¥ "}
                                        {product.price[currency]}
                                    </td>
                                    <td>{product.category[language]}</td>
                                    <td>{product.gender}</td>
                                    <td>{product.style[language]}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/user/${product._id}/edit`}
                                        >
                                            <span className="gap-2 px-2">
                                                <Button
                                                    type="button"
                                                    className="btn-sm"
                                                >
                                                    <i className="fas fa-edit" />
                                                </Button>
                                            </span>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={(e) =>
                                                deleteHandler(e, product._id)
                                            }
                                        >
                                            <i className="fas fa-trash" />
                                        </Button>
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

export default ProductListScreen;
