import React, { useEffect, useState } from "react";
import EditProfileNavbar from "../../components/editProfileNavbar";
import FormContainer from "../../components/formContainer";
import { setLang } from "../../Utils/setlang";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateLanguage, getUserInfo } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";

const Settings = ({ history }) => {
    const [language, setLanguage] = useState("");

    const dispatch = useDispatch();

    // User Details
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    // Update User
    const updateUserLanguage = useSelector((state) => state.updateUserLanguage);
    const { loadingLanguage, successLanguage, errorLanguage } =
        updateUserLanguage;

    // User Authentication
    const userAuth = useSelector((state) => state.userAuth);
    const { userInfo } = userAuth;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user) {
                dispatch(getUserInfo(userInfo._id));
            } else {
                setLanguage(user.language ? user.language : "");
            }
        }
    }, [dispatch, history, error, userInfo, user]);

    const submitHandler = (e) => {
        // change password button
        e.preventDefault();
        dispatch(updateLanguage(language));
    };

    return (
        <>
            <EditProfileNavbar />
            <FormContainer>
                <h1>SETTINGS</h1>
                {errorLanguage && (
                    <Message variant="danger">{errorLanguage}</Message>
                )}
                {successLanguage && (
                    <Message variant="success">{"Language Updated"}</Message>
                )}
                {loadingLanguage && <Loader />}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} autoComplete="on">
                    <Form.Group controlId={"radio"} className="py-2">
                        <Form.Label>Select preferred langauge: </Form.Label>
                        <Row>
                            {setLang.map((l) => {
                                return (
                                    <Col md={4} key={`${l.lang}-radio`}>
                                        <Form.Check
                                            id={l.lang}
                                            type="radio"
                                            label={l.label}
                                            value={l.lang}
                                            checked={l.lang === language}
                                            onChange={(e) =>
                                                setLanguage(e.target.value)
                                            }
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Form.Group>
                    <div className="py-3">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={language === ""}
                        >
                            Update Language
                        </Button>
                    </div>
                </Form>
            </FormContainer>
        </>
    );
};

export default Settings;
