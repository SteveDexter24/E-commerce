import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { listUsers, deleteUser } from "../../actions/user";
import SearchBox from "../../components/searchBox";
import { PaginateUsers } from "../../components/paginate";

const UserListScreen = ({ history, match }) => {
    // Route Params
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, users, error, page, pages } = userList;
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

        dispatch(listUsers(keyword, pageNumber));
    }, [dispatch, history, userInfo, successDelete, keyword, pageNumber]);

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
            <Route
                render={({ history }) => (
                    <SearchBox
                        history={history}
                        user
                        placeholder="Search Users by username, roles, or membership"
                    />
                )}
            />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : users && userInfo ? (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
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
                                            <ButtonGroup className="d-flex justify-content-center">
                                                <LinkContainer
                                                    to={`/admin/user/${user._id}/edit`}
                                                >
                                                    <Button
                                                        type="button"
                                                        className="m-1 btn-sm"
                                                    >
                                                        <i className="fas fa-edit" />
                                                    </Button>
                                                </LinkContainer>
                                                {userInfo._id !== user._id && (
                                                    <Button
                                                        variant="danger"
                                                        className="m-1 btn-sm"
                                                        onClick={(e) =>
                                                            deleteHandler(
                                                                e,
                                                                user._id
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash" />
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <PaginateUsers
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserListScreen;
