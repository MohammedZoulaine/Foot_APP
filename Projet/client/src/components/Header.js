import { Navbar, Nav, Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFutbol } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = () => {
    const cookies = document.cookie.split(';');
    const token = cookies.find(c => c.trim().startsWith('authToken='));
    return token ? token.split('=')[1] : null;
  };

  const token = getToken();
  let isAuthenticated = false;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      isAuthenticated = !!decoded?.id;
    }
  } catch (err) {
    isAuthenticated = false;
  }

  const handleAuthNavigate = () => {
    if (isAuthenticated) {
      return navigate('/profile');
    }
    navigate('/auth');
  };

  return (
    <div className="position-relative">
      <Navbar
        expand="lg"
        variant="dark"
        style={{
          background: 'linear-gradient(120deg, rgba(0,0,0,0.9) 20%, rgba(0,128,0,0.5) 80%)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        }}
        className="py-3 rounded-bottom z-3"
      >
        <Container style={{ position: 'relative', zIndex: 10 }}>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-4 d-flex align-items-center gap-2 text-light"
            style={{ transition: 'transform 0.4s' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
          >
            <FaFutbol size={32} className="text-light brand-icon" />
            FootReserve
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            <Nav className="gap-4">
              {[ 
                { path: '/', label: 'Accueil' },
                { path: '/about', label: 'À Propos' },
                { path: '/equipes', label: 'Équipes' },
                { path: '/terrains', label: 'Terrains' },
              ].map(({ path, label }) => (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path}
                  className={`nav-link-custom ${location.pathname === path ? 'active-link' : ''}`}
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>

            <ButtonGroup>
              <ToggleButton
                type="button"
                variant="light"
                className={`fw-bold px-3 ${location.pathname === '/auth' ? 'active' : ''}`}
                onClick={handleAuthNavigate}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isAuthenticated ? 'Mon Profil' : 'Connexion / Inscription'}
              </ToggleButton>
            </ButtonGroup>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <WaveDivider color="#fff" />
    </div>
  );
}

function WaveDivider({ color = '#fff', flip = false }) {
  return (
    <div style={{ marginTop: 0, marginBottom: 0 }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: '60px',
          transform: flip ? 'rotate(180deg)' : 'none',
        }}
      >
        <path
          fill={color}
          fillOpacity="1"
          d="M0,96L48,101.3C96,107,192,117,288,117.3C384,117,480,107,576,80C672,53,768,11,864,10.7C960,11,1056,53,1152,69.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>
  );
}
