import React from "react";
import { Table, Button } from "react-bootstrap";

export function UserTable({ users, onBan, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button size="sm" variant="warning" onClick={() => onBan(user._id)}>Bannir</Button>{" "}
              <Button size="sm" variant="danger" onClick={() => onDelete(user._id)}>Supprimer</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}