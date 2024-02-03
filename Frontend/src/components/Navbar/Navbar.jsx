import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container style={{ maxWidth: "98%" }}>
                <Navbar.Brand href="#" style={{ fontSize: "1.6rem" }}>
                    CodeSphere
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;
