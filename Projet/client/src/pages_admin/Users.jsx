import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Button, Badge } from "react-bootstrap";
import { FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Bannir cet utilisateur ?",
      text: "Il ne pourra plus accéder à l'application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, bannir",
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "btn btn-danger mx-2",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}/ban`, {
          method: "PUT",
        });
        if (res.ok) {
          fetchUsers();
          Swal.fire("Banni !", "L'utilisateur a été banni.", "success");
        } else {
          Swal.fire("Erreur", "Impossible de bannir l'utilisateur.", "error");
        }
      } catch (err) {
        Swal.fire("Erreur", "Une erreur est survenue.", "error");
      }
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Supprimer cet utilisateur ?",
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
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          setUsers(users.filter((u) => u._id !== id));
          Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
        } else {
          Swal.fire("Erreur", "Impossible de supprimer l'utilisateur.", "error");
        }
      } catch (err) {
        Swal.fire("Erreur", "Une erreur est survenue.", "error");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
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
        <FaUser className="me-2" />
        Gestion des Utilisateurs
      </h2>

      <div className="table-responsive shadow-sm rounded">
        <Table bordered hover className="align-middle">
          <thead className="table-success text-center">
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="text-center">
                  <Badge
                    bg={u.role === "admin" ? "dark" : "success"}
                    className="px-3 py-2 text-uppercase"
                  >
                    {u.role}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    className="me-2"
                    onClick={() => deleteUser(u._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                  {u.role !== "admin" && (
                    <Button
                      variant="outline-warning"
                      onClick={() => banUser(u._id)}
                    >
                      <FaUserShield />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
