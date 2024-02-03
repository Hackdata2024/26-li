import Card from "react-bootstrap/Card";

function Footer() {
    return (
        <Card
            style={{
                fontFamily: "Open Sans",
                color: "var(--sec)",
                alignItems: "center",
                borderStyle: "none",
                borderRadius: "0",
                width: "100%",
                position: "fixed",
                bottom: "0",
                backgroundColor: "rgba(227, 243, 246)",
                marginTop: "35px",
            }}
        >
            <Card.Body>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a className="text-dark" href="#">
                    CodeSphere
                </a>
            </Card.Body>
        </Card>
    );
}

export default Footer;
