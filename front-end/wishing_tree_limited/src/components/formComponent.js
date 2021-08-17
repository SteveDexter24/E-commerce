import React from "react";
import { Form } from "react-bootstrap";
const FormComponent = ({
    label,
    type,
    onChange,
    value,
    placeholder,
    errorMessage,
    valid,
}) => {
    return (
        <Form.Group controlId={placeholder} className="py-2">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                isInvalid={errorMessage}
                isValid={valid}
                type={type}
                placeholder={placeholder}
                autoComplete="on"
                onChange={onChange}
                value={value}
            />
            {errorMessage ? (
                <Form.Control.Feedback type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
            ) : (
                <Form.Control.Feedback type="valid">
                    Looks good!
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

export default FormComponent;
