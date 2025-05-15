import React from "react";
import { Card, Badge, ListGroup, Carousel } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export function TerrainCard({ terrain }) {
  const toggleStatus = async () => {
    const newStatus = terrain.status === "available" ? "unavailable" : "available";

    try {
      const res = await fetch(`http://localhost:5000/api/terrains/${terrain._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...terrain, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      window.location.reload(); // Pour voir le changement immédiatement
    } catch (err) {
      console.error("Échec de la mise à jour du statut :", err);
      alert("Impossible de changer le statut du terrain.");
    }
  };

  return (
    <Card
      className="border-0 shadow-sm rounded-4 h-100 glass-effect"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      {terrain.images?.length > 0 && (
        <Carousel indicators={false} controls={terrain.images.length > 1} interval={3000}>
          {terrain.images.map((img, i) => (
            <Carousel.Item key={i}>
              <div
                style={{
                  height: "200px",
                  background: `url(${img}) center/cover`,
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Card.Body>
        <Card.Title className="fw-bold text-success fs-4 mb-2">{terrain.name}</Card.Title>

        <p className="mb-1 text-muted">
          <FaMapMarkerAlt className="me-2 text-success" />
          {terrain.location}
        </p>

        <p className="mb-1">
          <FaMoneyBillWave className="me-2 text-success" />
          <strong>{terrain.price} CAD</strong> / heure
        </p>

        {terrain.description && (
          <p className="text-muted small mb-2">{terrain.description}</p>
        )}

        <p className="mb-1">
          <FaCalendarAlt className="me-2 text-success" />
          <small>Ajouté le {new Date(terrain.createdAt).toLocaleDateString()}</small>
        </p>

        <div className="mb-3">
          <span className="fw-semibold">Disponibilité :</span>
          {terrain.availability.length > 0 ? (
            <ListGroup variant="flush">
              {terrain.availability.map((time, i) => (
                <ListGroup.Item key={i} className="px-0 py-1 border-0">
                  <FaClock className="me-2 text-success" />
                  {time}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted small">Non spécifiée</p>
          )}
        </div>

        <Badge
          bg={terrain.status === "available" ? "success" : "secondary"}
          className="py-2 px-3 rounded-pill"
        >
          {terrain.status === "available" ? (
            <>
              <FaCheckCircle className="me-1" />
              Disponible
            </>
          ) : (
            <>
              <FaTimesCircle className="me-1" />
              Indisponible
            </>
          )}
        </Badge>

        <button
          onClick={toggleStatus}
          className="btn btn-outline-primary btn-sm mt-3 d-block"
        >
          {terrain.status === "available"
            ? "Marquer comme indisponible"
            : "Marquer comme disponible"}
        </button>
      </Card.Body>
    </Card>
  );
}
