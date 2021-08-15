import React from "react";
import { ButtonGroup, Col, Row, Button } from "react-bootstrap";

const ColorButtons = ({
    product,
    language,

    color,
    buttonClick,
    selectedIndex,
}) => {
    const onTrigger = (s, i) => {
        buttonClick({ color: s, index: i });
    };

    return (
        <ButtonGroup>
            <Row>
                {product.size[selectedIndex].color_size.colors.map((s, i) => {
                    return (
                        <Col key={i} md={1} className="mx-2 my-1">
                            <Button
                                variant={
                                    s.color[language] === color
                                        ? "primary"
                                        : "secondary"
                                }
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: `${s.colorHex}`,
                                    padding: "6px 0px",
                                    borderRadius: "15px",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    lineHeight: "1.42857",
                                }}
                                onClick={onTrigger(s.color[language], i)}
                            >
                                {/* {s.color[language]} */}
                            </Button>
                        </Col>
                    );
                })}
            </Row>
        </ButtonGroup>
    );
};

export default ColorButtons;
