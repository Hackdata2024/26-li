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
        backgroundColor: "rgba(227, 243, 246)",
        padding: "20px",
    };
    return (
        <Card className="text-center" style={cardStyle}>
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content}</Card.Text>
                <Link to={btnLink}>
                <Button variant="primary" style={{ 
                        font: "Fira Code",
                        paddingLeft: "20px", 
                        paddingRight: "20px",
                        color: "var(--sec)",
                        backgroundColor: "var(--light)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.3s ease-in-out",                        
                    }}
                        onMouseOver={(e) => {
                            e.target.style.boxShadow = "0 0 10px rgba(134, 184, 193, 1)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.boxShadow = "0 0 10px rgba(134, 184, 193, 0.3)";
                          }}
                        >
                        {btntext}                   </Button>
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    );
};

export default LandingPageCard;
