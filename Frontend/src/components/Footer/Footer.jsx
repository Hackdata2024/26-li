import Card from "react-bootstrap/Card";

function Footer() {
    return (
        <Card
            style={{
                alignItems: "center",
                borderRadius: "0",
                width: "100%",
                position: "fixed",
                bottom: "0",
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
