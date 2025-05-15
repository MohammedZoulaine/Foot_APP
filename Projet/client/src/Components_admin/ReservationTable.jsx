import React from "react";
import { Table } from "react-bootstrap";

export function ReservationTable({ reservations }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Terrain</th>
          <th>Utilisateur</th>
          <th>Date</th>
          <th>Heure</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((res) => (
          <tr key={res._id}>
            <td>{res.terrain?.name}</td>
            <td>{res.user?.name}</td>
            <td>{new Date(res.date).toLocaleDateString()}</td>
            <td>{res.time}</td>
            <td>{res.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}