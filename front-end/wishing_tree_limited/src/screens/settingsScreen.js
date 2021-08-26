import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SETTINGS_RESET } from "../actions/types";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import Loader from "../components/loader";
import { setLang } from "../Utils/setlang";
import Message from "../components/message";
import { countrySettings, currencySettings } from "../Utils/settings";
import { changeSettings } from "../actions/settings";

const SettingsScreen = () => {
    const settings = useSelector((state) => state.settings);

    const [language, setLanguage] = useState(settings.language);
    const [currency, setCurrency] = useState(settings.currency);
    const [country, setCountry] = useState(settings.country);
    const dispatch = useDispatch();

    const submitHandler = () => {
        console.log("change language");
        console.log(language, country, currency);
        dispatch(changeSettings(language, country, currency));

        // after update, reset the success state
        dispatch({ type: UPDATE_SETTINGS_RESET });
    };

    return (
        <>
            <FormContainer>
                <h1>SETTINGS</h1>

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
                    <Form.Group controlId={"radio"} className="py-3">
                        <Form.Label>Select preferred currency: </Form.Label>
                        <Row>
                            {currencySettings.map((c) => {
                                return (
                                    <Col md={4} key={`${c.label}-radio`}>
                                        <Form.Check
                                            id={c.label}
                                            type="radio"
                                            label={c.label}
                                            value={c.value}
                                            checked={c.value === currency}
                                            onChange={(e) =>
                                                setCurrency(e.target.value)
                                            }
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={"radio"} className="py-3">
                        <Form.Label>
                            Select preferred country/region:{" "}
                        </Form.Label>
                        <Row>
                            {countrySettings.map((c) => {
                                return (
                                    <Col md={4} key={`${c.label}-radio`}>
                                        <Form.Check
                                            id={c.label}
                                            type="radio"
                                            label={c.label}
                                            value={c.value}
                                            checked={c.value === country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Form.Group>
                    <div className="py-3">
                        <Button type="submit" variant="primary">
                            Change Settings
                        </Button>
                    </div>
                </Form>
            </FormContainer>
        </>
    );
};

export default SettingsScreen;
