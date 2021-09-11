import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/formContainer";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { setMemberShipRadio } from "../../Utils/memberShip";
import { setUserRole } from "../../Utils/setAdmin";
import FormComponent from "../../components/formComponent";
import { getUserInfo, adminUpdateUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { USER_EDIT_RESET } from "../../actions/types";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [memberShip, setMemberShip] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userEdit = useSelector((state) => state.userEdit);
    const {
        loading: editLoading,
        success: successEdit,
        error: errorEdit,
    } = userEdit;

    useEffect(() => {
        if (!user) {
            dispatch(getUserInfo(userId));
        } else {
            if (user._id !== userId) {
                dispatch(getUserInfo(userId));
            }
            if (successEdit) {
                dispatch({ type: USER_EDIT_RESET });
                dispatch(getUserInfo(userId));
            }
            setUsername(user.username ? user.username : "");
            setRole(user.role ? user.role : "");
            setEmail(user.email ? user.email : "");
            setMemberShip(user.memberShip ? user.memberShip : "");
        }
    }, [dispatch, history, user, match, userId, successEdit]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            adminUpdateUser(userId, { username, email, role, memberShip })
        );
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>EDIT USER</h1>
                {error && <Message variant="danger">{error}</Message>}
                {(editLoading || loading) && <Loader />}
                {errorEdit && <Message variant="danger">{errorEdit}</Message>}
                {user ? (
                    <Form onSubmit={submitHandler} autoComplete="on">
                        <FormComponent
                            label="Username"
                            type="text"
                            value={username}
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormComponent
                            label="Email address"
                            type="email"
                            value={email}
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Label className="py-2">
                            Change User Role
                        </Form.Label>
                        <Form.Group controlId={"radio"} className="py-2">
                            {setUserRole.map((r) => {
                                return (
                                    <Form.Check
                                        id={r.label}
                                        key={r.label}
                                        type="radio"
                                        label={r.label}
                                        value={r.value}
                                        checked={role === r.value}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    />
                                );
                            })}
                        </Form.Group>
                        <Form.Label className="py-2">
                            Change User Membership
                        </Form.Label>
                        <Form.Group controlId={"radio"} className="py-2">
                            {setMemberShipRadio.map((m) => {
                                return (
                                    <Form.Check
                                        id={m.label}
                                        key={m.label}
                                        type="radio"
                                        label={m.label}
                                        value={m.memberType}
                                        checked={memberShip === m.memberType}
                                        onChange={(e) =>
                                            setMemberShip(e.target.value)
                                        }
                                    />
                                );
                            })}
                        </Form.Group>
                        <div className="py-3">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={username === "" || email === ""}
                            >
                                EDIT USER
                            </Button>
                        </div>
                    </Form>
                ) : loading ? (
                    <></>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <></>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
