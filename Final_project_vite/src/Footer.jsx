import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './Style_footer_navbar.css'

const Footer = () => {
  return (
    <footer className="custom-footer">
    <Container fluid className="p-4">
        <section className="mb-4">
            <p></p>
        </section>
    </Container>

    <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
        © 2024 Tomi Väisänen
    </div>
</footer>
  );
};

export default Footer;
