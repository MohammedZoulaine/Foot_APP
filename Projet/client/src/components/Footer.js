import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-success text-light mt-2 pt-5 pb-3 shadow-lg rounded-top position-relative overflow-hidden">
      <Container>
        <Row>
          <Col md={4} className="mb-4 text-center text-md-start">
            <h5 className="fw-bold mb-3">FootReserve</h5>
            <p className="text-light-50">Réservez vos terrains et organisez vos matchs en toute simplicité. Vivez l'expérience du football comme jamais auparavant.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h6 className="fw-bold">Navigation</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Accueil</Link></li>
              <li><Link to="/reserver" className="footer-link">Réserver</Link></li>
              <li><Link to="/equipes" className="footer-link">Équipes</Link></li>
              <li><Link to="/about" className="footer-link">À Propos</Link></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h6 className="fw-bold">Contact</h6>
            <p><FaEnvelope /> contact@footreserve.com</p>
            <p><FaPhoneAlt /> +1 514 123 4567</p>
            <p><FaMapMarkerAlt /> 3030 Rue Hochelaga, Montréal, QC H1W 1G2</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-3">
              <FaFacebookF className="footer-icon" />
              <FaInstagram className="footer-icon" />
              <FaTwitter className="footer-icon" />
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <small className="text-light-50">&copy; 2025 FootReserve. Tous droits réservés.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}