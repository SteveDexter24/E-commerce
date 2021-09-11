import React, { useEffect, useState } from "react";
import EditProfileNavbar from "../../components/editProfileNavbar";
import FormComponent from "../../components/formComponent";
import FormContainer from "../../components/formContainer";
import { Form, Button } from "react-bootstrap";
import { updatePassword } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";

const ChangePassword = ({ history }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    // Update User
    const updateUserPassword = useSelector((state) => state.updateUserPassword);
    const { success, loading, error } = updateUserPassword;

    // User Authentication
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        if (error) {
            setPassword("");
            setConfirmPassword("");
            setValidPassword(false);
            setValidConfirmPassword(false);
        }
    }, [dispatch, history, success, error, userInfo]);

    const newPasswordConfirmOnChangeHandler = (e) => {
        const cPassword = e.target.value;
        setConfirmPassword(cPassword);
        if (password !== cPassword) {
            setPasswordMessage("Passwords does not match");
            setValidConfirmPassword(false);
        } else if (cPassword.length < 8 && currentPassword !== "") {
            setPasswordMessage(
                "Password length must be greater than 8 character"
            );
            setValidConfirmPassword(false);
        } else {
            setPasswordMessage(null);
            setValidConfirmPassword(true);
        }
    };

    const passwordOnChangeHandler = (e) => {
        setCurrentPassword(e.target.value);
    };
    const newPasswordOnChangeHandler = (e) => {
        let p = e.target.value;
        setPassword(p);
        if (p.length < 8) {
            setPasswordErrorMessage(
                "Password length must be greater than 8 character"
            );
            setValidPassword(false);
        } else {
            setPasswordErrorMessage(null);
            setValidPassword(true);
        }
    };

    const submitHandler = (e) => {
        // change password button
        e.preventDefault();
        dispatch(updatePassword(currentPassword, password));
    };

    return (
        <>
            <EditProfileNavbar />
            <FormContainer>
                <h1>CHANGE PASSWORD</h1>
                {error && <Message variant="danger">{error}</Message>}
                {success && (
                    <Message variant="success">{"Password Updated"}</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} autoComplete="on">
                    <FormComponent
                        label="Old Password"
                        type="password"
                        value={currentPassword}
                        required={false}
                        onChange={passwordOnChangeHandler}
                    />
                    <FormComponent
                        label="New Password"
                        type="password"
                        value={password}
                        errorMessage={passwordErrorMessage}
                        valid={validPassword}
                        required={false}
                        onChange={newPasswordOnChangeHandler}
                    />
                    <FormComponent
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        errorMessage={passwordMessage}
                        valid={validConfirmPassword}
                        required={false}
                        onChange={newPasswordConfirmOnChangeHandler}
                    />
                    <div className="py-3">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={
                                password === "" ||
                                confirmPassword === "" ||
                                currentPassword === ""
                            }
                        >
                            Update Password
                        </Button>
                    </div>
                </Form>
            </FormContainer>
        </>
    );
};

export default ChangePassword;
