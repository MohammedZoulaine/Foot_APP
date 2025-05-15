import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    adresse: '',
    phoneNumber: '',
    position: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        navigate('/profile');
      } catch (err) {
        console.error('Token invalide');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url =
      authMode === 'login'
        ? 'http://localhost:5000/api/users/login'
        : 'http://localhost:5000/api/users/register';

        if (formData.email === 'admin@admin.com' && formData.password === 'admin') {
          document.cookie = `isAdmin=true; path=/; max-age=${7 * 24 * 60 * 60}`;
          navigate('/admin/users');
          return;
        } 

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user?.banned) {
          setMessage("Votre compte a été banni. Veuillez contacter l'administration.");
          return;
        }
        setMessage(data.message || 'Succès');

        if (authMode === 'login' && data.token) {
          document.cookie = `authToken=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
          const decoded = jwtDecode(data.token);
          setCurrentUser(decoded);
          navigate('/profile'); 
        }
      } else {
        setMessage(data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur.');
    }
  };

  const logout = () => {
    document.cookie = 'authToken=; path=/; max-age=0';
    setCurrentUser(null);
    setMessage('Déconnexion réussie.');
  };

  return (
    <div className="position-relative bg-light min-vh-100 d-flex flex-column">
      <Container className="my-5 flex-grow-1 d-flex align-items-center">
        <Row className="justify-content-center w-100">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <h2 className="fw-bold text-center mb-4">
                  {authMode === 'login' ? 'Connexion' : 'Inscription'}
                </h2>

                {message && <p className="text-center text-danger">{message}</p>}

                {currentUser && (
                  <p className="text-center text-success">
                    Connecté en tant que : <strong>{currentUser.email}</strong>
                  </p>
                )}

                <ToggleButtonGroup
                  type="radio"
                  name="authMode"
                  value={authMode}
                  onChange={setAuthMode}
                  className="d-flex justify-content-center mb-4"
                >
                  <ToggleButton id="login-toggle" variant="outline-success" value="login">
                    Connexion
                  </ToggleButton>
                  <ToggleButton id="register-toggle" variant="outline-success" value="register">
                    Inscription
                  </ToggleButton>
                </ToggleButtonGroup>

                <Form onSubmit={handleSubmit}>
                  {authMode === 'register' && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Entrez votre nom"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Select
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                        >
                          <option value="">Choisissez votre position</option>
                          <option value="Gardien">Gardien</option>
                          <option value="Défenseur">Défenseur</option>
                          <option value="Milieu">Milieu</option>
                          <option value="Attaquant">Attaquant</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="success">
                      {authMode === 'login' ? 'Connexion' : 'Inscription'}
                    </Button>
                  </div>
                </Form>

                {currentUser && (
                  <div className="d-grid mt-3">
                    <Button variant="outline-danger" onClick={logout}>
                      Déconnexion
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
