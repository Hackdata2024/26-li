import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPageCard = ({ width, marginTop, title, content, btntext, btnLink }) => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 550);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 550);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const cardStyle = {
        width: isWideScreen ? width : "90%",
        marginTop: marginTop,
    };
    return (
        <Card className="text-center" style={cardStyle}>
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content}</Card.Text>
                <Link to={btnLink}>
                    <Button style={{ padding: "8px 40px", border: "none", borderRadius: "4px" }} variant="primary">
                        {btntext}
                    </Button>
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    );
};

export default LandingPageCard;
