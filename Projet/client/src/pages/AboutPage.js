import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Alert
} from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function AboutPage() {
  const [commentData, setCommentData] = useState({ name: '', email: '', message: '' });
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false });

    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ show: true, type: 'success', message: data.message });
        setCommentData({ name: '', email: '', message: '' });
      } else {
        setAlert({ show: true, type: 'danger', message: data.message || 'Erreur serveur.' });
      }
    } catch (error) {
      setAlert({ show: true, type: 'danger', message: "Erreur de connexion au serveur." });
    }
  };

  return (
    <div className="bg-light">
      {/* Bandeau image */}
      <div className="position-relative overflow-hidden" style={{ maxHeight: '600px' }}>
        <Image
          src="https://wallpapercave.com/wp/wp6145428.jpg"
          fluid
          className="w-100 object-fit-cover hero-image rounded-bottom shadow-lg border border-3 border-success"
          style={{
            maxHeight: '600px',
            objectPosition: 'center',
            filter: 'brightness(60%)',
            transition: 'transform 0.7s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          alt="About Us Background"
        />

        <div className="position-absolute top-0 w-100 h-100"
          style={{
            background: 'linear-gradient(120deg, rgba(0,0,0,0.7) 15%, rgba(0,128,0,0.5) 50%, rgba(0,0,0,0.7) 85%)',
            zIndex: 1,
          }}
        />

        <div className="position-absolute top-50 start-50 translate-middle text-light text-center p-4" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold" style={{ textShadow: '2px 2px 10px rgba(0, 255, 0, 0.8)', letterSpacing: '1px' }}>
            À Propos de FootReserve
          </h1>
          <p className="lead fs-5">
            Votre destination pour des matchs de football mémorables et des terrains de qualité.
          </p>
        </div>
      </div>

      <WaveDivider color="#fff" />

      {/* Section mission et localisation */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4 h-100"
              style={{ transition: 'transform 0.4s, box-shadow 0.4s' }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-4 mb-3">Notre Mission</Card.Title>
                <Card.Text>
                  Chez <strong>FootReserve</strong>, notre mission est de rendre la réservation de 
                  terrains de football simple et accessible. Que vous soyez un joueur amateur 
                  ou un professionnel, nous vous aidons à trouver et réserver le terrain idéal 
                  pour vos matchs.
                </Card.Text>
                <Card.Text>
                  Nous nous engageons à fournir des terrains de haute qualité et à offrir 
                  une expérience utilisateur intuitive pour tous les passionnés de football.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4 h-100"
              style={{ transition: 'transform 0.4s, box-shadow 0.4s' }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-4 mb-3">Localisation</Card.Title>
                <div className="rounded shadow-sm mb-3 overflow-hidden" style={{ height: '250px' }}>
                  <iframe
                    src="https://www.google.com/maps?q=3030+Rue+Hochelaga,+Montr%C3%A9al,+QC+H1W+1G2&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    title="FootReserve Location"
                  ></iframe>
                </div>
                <Card.Text className="mb-1">
                  <FaPhoneAlt className="text-success me-2" />
                  +1 514 000 0000
                </Card.Text>
                <Card.Text>
                  <FaEnvelope className="text-success me-2" />
                  contact@footreserve.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <WaveDivider color="#f8f9fa" flip />

      {/* Section formulaire commentaire */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg border-0 rounded-4"
              style={{ transition: 'transform 0.4s, box-shadow 0.4s' }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-4 mb-4 text-center">Laissez-nous un commentaire</Card.Title>

                {alert.show && (
                  <Alert
                    variant={alert.type}
                    onClose={() => setAlert({ show: false })}
                    dismissible
                    className="text-center"
                  >
                    {alert.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Entrez votre nom"
                      value={commentData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Entrez votre email"
                      value={commentData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Commentaire</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Votre message..."
                      value={commentData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="fw-bold w-100 py-2"
                    style={{ boxShadow: '0 0 15px rgba(0,255,0,0.3)' }}
                    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,0,0.5)')}
                    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,0,0.3)')}
                  >
                    Envoyer
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// Composant vague décorative
function WaveDivider({ color = '#fff', flip = false }) {
  return (
    <div style={{ marginBottom: flip ? '-1px' : 0, marginTop: !flip ? '-1px' : 0 }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '60px', transform: flip ? 'rotate(180deg)' : 'none' }}
      >
        <path
          fill={color}
          fillOpacity="1"
          d="M0,96L48,101.3C96,107,192,117,288,117.3C384,117,480,107,576,80C672,53,768,11,864,10.7C960,11,1056,53,1152,69.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>
  );
}
