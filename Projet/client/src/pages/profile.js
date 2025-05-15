import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Spinner,
  Tab,
  Tabs,
  Button
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// ✅ Composant PayPal sécurisé (anti-duplication)
function PayPalButton({ amount, reservationId, onSuccess }) {
  const containerId = `paypal-button-${reservationId}`;

  useEffect(() => {
    if (!window.paypal) return;

    const container = document.getElementById(containerId);
    if (!container || container.hasChildNodes()) return; // ✅ évite les doublons

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: amount.toString() }
          }]
        });
      },
      onApprove: async (data, actions) => {
        await actions.order.capture();
        onSuccess();
      },
      onError: (err) => {
        console.error("Erreur PayPal :", err);
        alert("Le paiement a échoué.");
      }
    }).render(`#${containerId}`);
  }, [amount, reservationId, onSuccess]);

  return <div id={containerId} />;
}

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [equipes, setEquipes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getToken = () => {
    const cookies = document.cookie.split(';');
    const token = cookies.find(c => c.trim().startsWith('authToken='));
    return token ? token.split('=')[1] : null;
  };

  const fetchData = async (userId) => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const [userRes, equipesRes, reservationsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/users/${userId}`, { headers }),
        fetch(`http://localhost:5000/api/equipes`, { headers }),
        fetch(`http://localhost:5000/api/reservations`, { headers }),
      ]);

      const [userData, allEquipes, allReservations] = await Promise.all([
        userRes.json(),
        equipesRes.json(),
        reservationsRes.json(),
      ]);

      const userEquipes = allEquipes.filter(
        (e) =>
          e.owner?._id === userId ||
          e.players?.some((p) => p._id === userId)
      );

      const userReservations = allReservations.filter(
        (r) => r.user?._id === userId
      );

      setUserData(userData);
      setEquipes(userEquipes);
      setReservations(userReservations);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      fetchData(decoded.id);
    } catch (err) {
      console.error('Token invalide');
      setLoading(false);
    }
  }, []);

  const logout = () => {
    document.cookie = 'authToken=; path=/; max-age=0';
    navigate('/auth');
  };

  const handlePayment = async (reservationId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'payée' })
      });

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r._id === reservationId ? { ...r, status: 'payée' } : r))
        );
        Swal.fire('Paiement confirmé !', 'Votre réservation est maintenant payée.', 'success');
      } else {
        Swal.fire('Erreur', 'Impossible de traiter le paiement.', 'error');
      }
    } catch (error) {
      Swal.fire('Erreur', 'Une erreur est survenue côté serveur.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!userData) {
    return (
      <Container className="mt-5">
        <h4>Utilisateur non trouvé.</h4>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-lg rounded-4">
        <Row>
          <Col md={4}>
            <h4 className="mb-3">Informations personnelles</h4>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Nom:</strong> {userData.name}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {userData.email}</ListGroup.Item>
              <ListGroup.Item><strong>Téléphone:</strong> {userData.phoneNumber || 'Non renseigné'}</ListGroup.Item>
              <ListGroup.Item><strong>Adresse:</strong> {userData.adresse || 'Non renseignée'}</ListGroup.Item>
              <ListGroup.Item><strong>Poste:</strong> <Badge bg="info">{userData.position || 'N/A'}</Badge></ListGroup.Item>
              <ListGroup.Item><strong>Rôle:</strong> <Badge bg="secondary">{userData.role}</Badge></ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={8}>
            <Tabs defaultActiveKey="equipes" className="mb-3">
              <Tab eventKey="equipes" title="Mes Équipes">
                {equipes.length === 0 ? (
                  <p className="text-muted">Aucune équipe trouvée.</p>
                ) : (
                  equipes.map((equipe, i) => (
                    <Card key={i} className="mb-2 shadow-sm">
                      <Card.Body>
                        <Card.Title>{equipe.name}</Card.Title>
                        <Card.Text>
                          <strong>Propriétaire :</strong> {equipe.owner?.name || 'Inconnu'} <br />
                          <strong>Joueurs :</strong> {equipe.players.map(p => p.name).join(', ') || 'Aucun'}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Tab>

              <Tab eventKey="reservations" title="Mes Réservations">
                {reservations.length === 0 ? (
                  <p className="text-muted">Aucune réservation trouvée.</p>
                ) : (
                  reservations.map((res, i) => (
                    <Card key={i} className="mb-2 shadow-sm">
                      <Card.Body>
                        <Card.Title>Terrain : {res.terrain?.name || 'Inconnu'}</Card.Title>
                        <Card.Text>
                          <strong>Date :</strong> {new Date(res.date).toLocaleDateString()} <br />
                          <strong>Heure :</strong> {res.hour} <br />
                          <strong>Statut :</strong>{' '}
                          <Badge bg={res.status === 'payée' ? 'success' : 'warning'}>
                            {res.status}
                          </Badge>
                        </Card.Text>

                        {res.status !== 'payée' && (
                          <PayPalButton
                            amount={res.terrain?.price || 10}
                            reservationId={res._id}
                            onSuccess={() => handlePayment(res._id)}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Tab>
            </Tabs>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="outline-danger" onClick={logout}>
                Déconnexion
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
