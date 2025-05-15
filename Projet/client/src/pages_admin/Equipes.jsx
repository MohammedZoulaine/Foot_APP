import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Spinner,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaUser,
  FaCrown,
  FaUsers,
  FaTrashAlt,
  FaUserFriends,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function Equipes() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/equipes");
      const data = await res.json();
      console.log("Équipes récupérées :", data);
      setEquipes(data);
    } catch (err) {
      console.error("Erreur lors du chargement des équipes :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Supprimer cette équipe ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "btn btn-danger mx-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/equipes/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setEquipes(equipes.filter((e) => e._id !== id));
          Swal.fire("Supprimée !", "L'équipe a été supprimée.", "success");
        } else {
          Swal.fire("Erreur", "Impossible de supprimer l'équipe.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Erreur", "Échec de la suppression.", "error");
      }
    }
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div
      className="p-4"
      style={{
        background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
        minHeight: "100vh",
      }}
    >
      <h2
        className="fw-bold text-center mb-5"
        style={{
          color: "#2e7d32",
          fontSize: "2.5rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <FaUserFriends className="me-2" />
        Gestion des Équipes
      </h2>

      <Row className="g-4">
        {equipes.map((e) => (
          <Col key={e._id} md={6} lg={4}>
            <Card
              className="border-0 shadow-lg rounded-4 glass-effect position-relative"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Card.Img
                variant="top"
                src={e.logo || "https://via.placeholder.com/300x150?text=Logo+Equipe"}
                style={{
                  height: "150px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />

              <Card.Body>
                <Card.Title className="fw-bold d-flex align-items-center gap-2 mb-3" style={{ fontSize: "1.5rem", color: "#2e7d32" }}>
                  <FaUsers /> {e.name}
                </Card.Title>

                <p className="mb-2 text-muted">
                  <FaCrown className="me-2 text-warning" />
                  <strong>Propriétaire:</strong> {e.owner?.name || "Inconnu"}
                </p>

                <div className="mb-3">
                  <p className="mb-1">
                    <FaUser className="me-2 text-success" />
                    <strong>Joueurs:</strong>
                  </p>
                  {e.players?.length > 0 ? (
                    <div className="d-flex flex-wrap gap-1">
                      {e.players.map((p, i) => (
                        <Badge
                          key={i}
                          bg="success"
                          pill
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.35rem 0.65rem",
                            background: "linear-gradient(135deg, #43a047, #66bb6a)",
                          }}
                        >
                          {p.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted">Aucun joueur</span>
                  )}
                </div>

                <p className="text-muted mb-0">
                  🕒 <strong>Créée le:</strong>{" "}
                  {new Date(e.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Supprimer l'équipe</Tooltip>}
                >
                  <Button
                    variant="danger"
                    className="position-absolute top-0 end-0 m-2"
                    style={{
                      borderRadius: "50%",
                      padding: "0.4rem 0.5rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                    onClick={() => handleDelete(e._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </OverlayTrigger>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
