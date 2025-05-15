import styled, { keyframes } from "styled-components";
import { Container, Row, Col, Card, Button, Image, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFutbol, FaUsers, FaArrowRight, FaPlus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #e9fbe7 100%);
  border: 1px solid #a4d4ae;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,128,0,0.15);
  }
`;

const GradientHeader = styled.div`
  height: 120px;
  background: linear-gradient(45deg, #43a047, #2e7d32);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #43a047, #2e7d32);
  border: none;
  transition: all 0.3s ease;
  color: white;
  font-weight: 600;
  &:hover {
    background: linear-gradient(45deg, #2e7d32, #43a047);
    transform: scale(1.05);
  }
`;

const BounceIcon = styled(FaFutbol)`
  animation: ${bounce} 2s infinite;
  color: #4caf50;
`;

const GradientText = styled.h1`
  background: linear-gradient(45deg, #2e7d32, #388e3c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
`;

const SectionContainer = styled.div`
  background-color: #f0fff4;
  padding: 40px 0;
  min-height: 100vh;
`;

const StyledSelect = styled(Form.Select)`
  height: auto;
  padding: 0.75rem;
  font-weight: 500;
  background-color: #ffffff;
  border: 2px solid #a5d6a7;
  border-radius: 10px;
  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
  }
`;

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEquipe, setNewEquipe] = useState({ name: '', logo: '', players: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/equipes")
      .then((res) => res.json())
      .then((data) => setEquipes(data));

    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    const token = document.cookie.split(";").find(c => c.trim().startsWith("authToken="));
    if (token) {
      try {
        const decoded = jwtDecode(token.split("=")[1]);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Token invalide", err);
      }
    }
  }, []);

  const handleCreateEquipe = async () => {
    if (!newEquipe.name || !userId) return Swal.fire("Erreur", "Remplis tous les champs.", "warning");
    if (newEquipe.players.length > 9) return Swal.fire("Erreur", "Max 10 joueurs.", "warning");

    const allPlayers = [...new Set([...newEquipe.players, userId])];

    try {
      const res = await fetch("http://localhost:5000/api/equipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEquipe, owner: userId, players: allPlayers })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Succès", "Équipe créée ✅", "success");
        setEquipes([...equipes, data]);
        setShowModal(false);
        setNewEquipe({ name: '', logo: '', players: [] });
      } else {
        Swal.fire("Erreur", data.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible de créer l'équipe.", "error");
    }
  };

  const handleJoinTeam = async (equipeId) => {
    const token = document.cookie.split(";").find(c => c.trim().startsWith("authToken="));
    if (!token) return Swal.fire("Erreur", "Vous devez être connecté.", "error");

    try {
      const decoded = jwtDecode(token.split("=")[1]);
      const res = await fetch(`http://localhost:5000/api/equipes/${equipeId}/add-player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: decoded.id })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Équipe Rejointe 🎉',
          html: `Bienvenue dans <strong>${data.equipe.name}</strong> !<br/>Propriétaire: ${data.equipe.owner.name}<br/>Joueurs: ${data.equipe.players.map(p => p.name).join(", ")}`,
          icon: 'success',
          confirmButtonText: 'Fermer'
        });
        setEquipes((prev) => prev.map(e => e._id === equipeId ? data.equipe : e));
      } else {
        Swal.fire("Erreur", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Erreur", "Impossible de rejoindre cette équipe.", "error");
    }
  };

  return (
    <SectionContainer>
      <Container>
        <GradientText className="mb-4 text-center fw-bold">
          <BounceIcon className="me-3" /> Équipes Disponibles <BounceIcon className="ms-3" />
        </GradientText>

        <div className="text-end mb-4">
          <StyledButton onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" />Créer une Équipe
          </StyledButton>
        </div>

        <Row className="g-4">
          {equipes.map((equipe) => (
            <Col key={equipe._id} md={6} lg={4} className="mb-4">
              <StyledCard className="border-0 rounded-4 overflow-hidden">
                <GradientHeader />
                <Card.Body className="p-4 text-center">
                  <div className="position-relative">
                    <Image
                      src={equipe.logo || "https://via.placeholder.com/150"}
                      roundedCircle
                      width={120}
                      height={120}
                      className="mb-3 border border-4 border-white shadow-sm"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        Swal.fire({
                          title: equipe.name,
                          html: `Propriétaire: <strong>${equipe.owner?.name || "Inconnu"}</strong><br/>Joueurs: ${equipe.players?.map(p => p.name).join(", ") || "Aucun joueur encore."}`,
                          imageUrl: equipe.logo || undefined,
                          imageWidth: 100,
                          imageHeight: 100,
                          confirmButtonText: 'Fermer',
                        });
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      background: '#ffffffdd',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontWeight: 600,
                      color: '#2e7d32',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                      <FaUsers className="me-2" />
                      {equipe.players?.length || 0}/10
                    </div>
                  </div>
                  <Card.Title className="fw-bold text-uppercase fs-4 mb-3 text-success">
                    {equipe.name}
                  </Card.Title>

                  <StyledButton
                    className="fw-bold px-4 py-2 rounded-pill"
                    onClick={() => handleJoinTeam(equipe._id)}
                  >
                    <span className="d-flex align-items-center">
                      Rejoindre l'équipe <FaArrowRight className="ms-2" />
                    </span>
                  </StyledButton>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title><FaUserPlus className="me-2" />Créer une Équipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom de l'équipe</Form.Label>
                <Form.Control
                  type="text"
                  value={newEquipe.name}
                  onChange={(e) => setNewEquipe({ ...newEquipe, name: e.target.value })}
                  placeholder="Ex: FC Casablanca"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Logo (URL)</Form.Label>
                <Form.Control
                  type="url"
                  value={newEquipe.logo}
                  onChange={(e) => setNewEquipe({ ...newEquipe, logo: e.target.value })}
                  placeholder="https://exemple.com/logo.png"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ajouter des joueurs</Form.Label>
                <StyledSelect
                  multiple
                  value={newEquipe.players}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, opt => opt.value);
                    setNewEquipe({ ...newEquipe, players: options });
                  }}
                >
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </StyledSelect>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Annuler</Button>
            <StyledButton onClick={handleCreateEquipe}>Créer</StyledButton>
          </Modal.Footer>
        </Modal>
      </Container>
    </SectionContainer>
  );
}