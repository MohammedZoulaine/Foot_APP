import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { TerrainCard } from "../Components_admin/TerrainCard.jsx";
import { FaFutbol } from "react-icons/fa";

export default function Terrains() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTerrains = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/terrains");
      const data = await res.json();
      setTerrains(data);
    } catch (err) {
      console.error("Erreur lors du chargement des terrains :", err);
      Swal.fire("Erreur", "Impossible de charger les terrains", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Container className="py-4" style={{ background: "#f3fef5", borderRadius: "12px" }}>
      <h2 className="text-success fw-bold text-center mb-4">
        <FaFutbol className="me-2" />
        Gestion des Terrains
      </h2>

      <Row className="g-4">
        {terrains.map((terrain) => (
          <Col md={6} lg={4} key={terrain._id}>
            <TerrainCard terrain={terrain} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
