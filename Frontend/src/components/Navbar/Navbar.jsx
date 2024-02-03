import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return (
        <Navbar
            expand="lg"
            className=""
            fixed="top"
            style={{
                backgroundColor: "var(--bg1)",
                // position: "fixed",
                // top: "0",
            }}
        >
            <Container
                style={{
                    maxWidth: "100%",
                }}
            >
                <Navbar.Brand
                    href="#"
                    style={{
                        fontSize: "2rem",
                        fontFamily: "Fira Code",
                        color: "var(--lighter)",
                    }}
                >
                    CodeSphere
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;
