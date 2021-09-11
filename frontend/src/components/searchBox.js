import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBox = ({ history, user, placeholder, product, order }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            if (product) {
                history.push(`/admin/productlist/search/${keyword}`);
                return;
            }
            if (order) {
                history.push(`/admin/orderlist/search/${keyword}`);
                return;
            }
            if (!user) {
                history.push(`/search/${keyword}`);
            } else {
                history.push(`/admin/userlist/search/${keyword}`);
            }
        }
    };

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <>
            <Form onSubmit={submitHandler}>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder={placeholder}
                        onChange={handleOnChange}
                    />
                    <Button className="p-2" type="submit">
                        <i className="fas fa-search" />
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};

export default SearchBox;

//
