import React, { useEffect, useState } from "react";
import { Table, Spinner, Badge, Container } from "react-bootstrap";
import { FaClock, FaUser, FaFutbol } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
      });
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error("Erreur lors du chargement des réservations :", err);
      Swal.fire("Erreur", "Impossible de charger les réservations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <Container className="p-4" style={{ background: "#f3fef5", borderRadius: "12px" }}>
      <h2 className="fw-bold text-success text-center mb-4">
        <FaClock className="me-2" />
        Liste des Réservations
      </h2>

      <div className="table-responsive shadow-sm rounded">
        <Table striped bordered hover responsive className="align-middle">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Utilisateur</th>
              <th>Terrain</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={res._id || index}>
                <td>{index + 1}</td>
                <td>
                  <FaUser className="me-1 text-success" />
                  {res.user?.name || "Inconnu"}
                </td>
                <td>
                  <FaFutbol className="me-1 text-primary" />
                  {res.terrain?.name || "Inconnu"}
                </td>
                <td>{new Date(res.date).toLocaleDateString()}</td>
                <td>{res.time || "N/A"}</td>
                <td>
                  <Badge
                    bg={
                      res.status === "confirmée"
                        ? "success"
                        : res.status === "annulée"
                        ? "danger"
                        : "secondary"
                    }
                    className="px-3 py-1 rounded-pill text-uppercase"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {res.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
