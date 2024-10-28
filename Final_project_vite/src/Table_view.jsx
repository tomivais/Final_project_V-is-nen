
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




const Table_view = () => {
   
        return (
            <>
                <Navbar  expand="lg" className="custom-navbar white-text">
                    <Container>
                        <Navbar.Brand href="/">Your studies manager</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav " />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link href="/" className="custom-nav-link">Home</Nav.Link>
                            <Nav.Link href="/table_view" className="custom-nav-link">Table view</Nav.Link>
                            <Nav.Link href="#" className="custom-nav-link">*Bar view</Nav.Link>
                            <Nav.Link href="/login" className="custom-nav-link">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className="main-content" style={{ minHeight: '70vh', padding: '2rem 0' }}> {/* Lisätään padding ja minHeight */}
                    
                </div >

                <footer className="custom-footer">
                    <Container className="p-4">
                        <section className="mb-4">
                            <p></p>
                        </section>
                    </Container>

                    <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
                        © 2024 Tomi Väisänen
                    </div>
                </footer>
            </>
        );
    };
    export default Table_view;