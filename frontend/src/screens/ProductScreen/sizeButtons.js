import React from "react";
import {
    ButtonGroup,
    Col,
    Row,
    Button,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { sizeTypeToInfo } from "../../Utils/size";

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
                            <Col
                                key={i}
                                xs={1}
                                md={1}
                                lg={1}
                                className="mx-2 my-1"
                            >
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="button-tooltip">
                                            {sizeTypeToInfo(s.sizeType)}
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        variant={
                                            s.sizeType === selectedSize
                                                ? "primary"
                                                : "light"
                                        }
                                        style={styles.btn_circle}
                                        onClick={() => onTrigger(s.sizeType, i)}
                                    >
                                        {s.sizeType}
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                        );
                    })}
                </Row>
            </ButtonGroup>
        </div>
    );
};

export default SizeButtons;
