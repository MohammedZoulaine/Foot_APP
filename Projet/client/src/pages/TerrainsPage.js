import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  ListGroup,
  Carousel,
} from 'react-bootstrap';
import {
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default function TerrainsPage() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTerrains = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/terrains');
      const data = await res.json();
      setTerrains(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des terrains :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  const getAuthToken = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('authToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const handleReservation = async (terrainId, hour) => {
    const token = getAuthToken();
    if (!token) {
      return Swal.fire('Erreur', 'Veuillez vous connecter pour réserver.', 'warning');
    }

    const user = jwtDecode(token);
    const today = new Date().toISOString().split('T')[0];

    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user.id,
          terrain: terrainId,
          date: today,
          hour
        })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Réservation réussie !', data.message, 'success');
      } else {
        Swal.fire('Erreur', data.message || 'Impossible de réserver.', 'error');
      }
    } catch (error) {
      Swal.fire('Erreur', 'Connexion au serveur échouée.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light-green">
        <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  return (
    <div className="py-5" style={{ 
      background: 'linear-gradient(145deg, #f8fff9 0%, #e6f7ec 100%)',
      minHeight: '100vh'
    }}>
      <Container>
        <h2 className="text-center mb-5 display-4 fw-bold" style={{
          fontFamily: 'Poppins, sans-serif',
          color: '#1a3e23',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          paddingBottom: '1rem'
        }}>
          Nos Terrains Disponibles
          <div style={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '4px',
            background: '#4CAF50',
            borderRadius: '2px'
          }}></div>
        </h2>

        <Row className="g-4">
          {terrains.map((terrain) => (
            <Col key={terrain._id} md={6} lg={4}>
              <Card
                className="shadow-lg border-0 h-100 overflow-hidden"
                style={{
                  borderRadius: '15px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderTop: '5px solid #4CAF50',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {terrain.status === 'available' && terrain.images?.length > 0 && (
                  <Carousel
                    indicators={terrain.images.length > 1}
                    controls={terrain.images.length > 1}
                    interval={3000}
                    fade
                  >
                    {terrain.images.map((img, index) => (
                      <Carousel.Item key={index}>
                        <div style={{
                          height: '250px',
                          background: `url(${img}) center/cover`,
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                          }}></div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}

                <Card.Body className="d-flex flex-column pt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title className="fw-bold" style={{ fontSize: '1.5rem', color: '#1a3e23', fontFamily: 'Poppins, sans-serif' }}>
                      {terrain.name}
                    </Card.Title>
                    <Badge 
                      pill 
                      style={{
                        background: terrain.status === 'available' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : '#6c757d',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      {terrain.status === 'available' ? (
                        <>
                          <FaCheckCircle className="me-1" /> Disponible
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="me-1" /> Indisponible
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt className="me-2" style={{ color: '#4CAF50' }} />
                    <span style={{ color: '#5e5e5e', fontWeight: '500' }}>{terrain.location}</span>
                  </div>

                  <Card.Text className="mb-4" style={{ color: '#6c757d', lineHeight: '1.6', flexGrow: 1, position: 'relative', paddingLeft: '1.5rem' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '3px', background: '#4CAF50', borderRadius: '2px' }}></div>
                    {terrain.description || 'Aucune description disponible.'}
                  </Card.Text>

                  <h6 className="fw-bold mb-3" style={{ color: '#1a3e23', fontSize: '1.1rem' }}>Horaires disponibles :</h6>

                  {terrain.availability.length > 0 ? (
                    <ListGroup variant="flush" className="mb-4">
                      {terrain.availability.map((heure, index) => (
                        <ListGroup.Item
                          key={index}
                          className="d-flex align-items-center px-0 py-2"
                          style={{ background: 'transparent', cursor: terrain.status === 'available' ? 'pointer' : 'not-allowed', opacity: terrain.status === 'available' ? 1 : 0.5 }}
                          onClick={() => terrain.status === 'available' && handleReservation(terrain._id, heure)}
                        >
                          <FaClock className="me-3" style={{ color: '#4CAF50', minWidth: '20px' }} />
                          <span style={{ fontWeight: '500', color: '#5e5e5e' }}>{heure}</span>
                          <div className="ms-auto badge bg-light text-success fw-bold">Réserver</div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Aucun horaire disponible.</p>
                  )}

                  <div className="mt-auto pt-3" style={{ borderTop: '2px solid rgba(76, 175, 80, 0.2)', paddingTop: '1rem' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="h4 fw-bold text-success mb-0">{terrain.price} CAD</span>
                        <span className="text-muted d-block" style={{ fontSize: '0.9rem' }}>par heure</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}