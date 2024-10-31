import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style_footer_navbar.css'


const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar white-text">
      <Container fluid>
        <Navbar.Brand href="/">Your studies manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link href="/table_view" className="custom-nav-link">Table view</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
            <Nav.Link href="/login" className="custom-nav-link">Logout</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
