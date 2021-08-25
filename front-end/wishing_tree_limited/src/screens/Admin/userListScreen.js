import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { listUsers, deleteUser } from "../../actions/user";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, users, error } = userList;
    // userAuth
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    // userDelete
    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete, error: deleteError } = userDelete;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (userInfo.role !== "admin") {
                history.push("/");
            }
        }

        dispatch(listUsers());
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure")) {
            dispatch(deleteUser(id));
        }
    };
    return (
        <>
            {successDelete && (
                <Message variant="success">
                    {"User Deleted Successfully"}
                </Message>
            )}
            {deleteError && <Message variant="danger">{deleteError}</Message>}
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : users && userInfo ? (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Membership</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>
                                            {user.email}
                                        </a>
                                    </td>
                                    <td>{user.role}</td>
                                    <td>{user.memberShip}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/user/${user._id}/edit`}
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
                                        {userInfo._id !== user._id && (
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={(e) =>
                                                    deleteHandler(e, user._id)
                                                }
                                            >
                                                <i className="fas fa-trash" />
                                            </Button>
                                        )}
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

export default UserListScreen;
