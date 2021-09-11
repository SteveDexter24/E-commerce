import { Card } from "react-bootstrap";

const CardComponent = ({ title, text }) => {
    return (
        <Card className="text-white" border="light">
            <Card.Img
                src="/images/hk.jpeg"
                alt="Image"
                height={400}
                style={{ objectFit: "cover" }}
            />
            <Card.ImgOverlay>
                <Card.Body style={{ height: "80%" }}>
                    <Card.Title
                        as="h1"
                        style={{
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            position: "relative",
                            top: "50%",
                        }}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {title}
                    </Card.Title>
                    <Card.Text
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            fontSize: "1.4rem",
                            fontWeight: "bold",
                            position: "relative",
                            top: "50%",
                        }}
                    >
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card.ImgOverlay>
        </Card>
    );
};

export default CardComponent;
