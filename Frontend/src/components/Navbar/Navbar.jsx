import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return (
        <Navbar expand="lg" className="" fixed="top" style={{ backgroundColor: "rgba(227, 243, 246)" }}>
            <Container 
            style={{
                maxWidth: "100%" }}>
                <Navbar.Brand href="#" 
                style={{ 
                    fontSize: "2rem",
                    fontFamily: "Fira Code",
                    color: "var(--sec)",}}>
                    CodeSphere
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;
