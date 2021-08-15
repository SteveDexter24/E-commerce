import React from "react";
import { ButtonGroup, Col, Row, Button } from "react-bootstrap";

const SizeButtons = ({ product, styles, buttonClick, selectedSize }) => {
    const onTrigger = (s, i) => {
        buttonClick({ size: s, index: i });
    };

    return (
        <div>
            <ButtonGroup>
                <Row>
                    {product.size.map((s, i) => {
                        return (
                            <Col key={i} md={1} className="mx-2 my-1">
                                <Button
                                    variant={
                                        s.sizeType === selectedSize
                                            ? "primary"
                                            : "secondary"
                                    }
                                    style={styles.btn_circle}
                                    onClick={() => onTrigger(s.sizeType, i)}
                                >
                                    {s.sizeType}
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </ButtonGroup>
        </div>
    );
};

export default SizeButtons;
