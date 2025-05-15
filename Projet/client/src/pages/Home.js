import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Carousel,
  Accordion
} from 'react-bootstrap';
import {
  FaFutbol,
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaRegQuestionCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const styles = {
  waveDivider: {
    marginBottom: '-1px',
  },
  waveSvg: {
    display: 'block',
    width: '100%',
    height: '100px',
  },
};

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-light">
      <div className="position-relative overflow-hidden" style={{ maxHeight: '700px' }}>
        <Image
          src="https://rbm996.fr/storage/2022/01/football-scene-stadium-with-close-up-soccer-shoe-kicking-ball.jpg"
          fluid
          className="w-100 object-fit-cover hero-image"
          style={{
            maxHeight: '700px',
            objectPosition: 'center',
            transition: 'transform 0.7s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          alt="Football Action Image"
        />


        <div
          className="position-absolute top-0 w-100 h-100"
          style={{
            background:
              'linear-gradient(120deg, rgba(0,0,0,0.7) 10%, rgba(0,128,0,0.5) 50%, rgba(0,0,0,0.7) 90%)',
            zIndex: 1,
          }}
        />

        <div className="position-absolute top-50 start-50 translate-middle text-light text-center p-4"
             style={{ zIndex: 2 }}>
          <h1
            className="display-1 fw-bold mb-4"
            style={{
              textShadow: '2px 2px 12px rgba(0, 255, 0, 0.7)',
              letterSpacing: '2px',
            }}
          >
            Vivez le Jeu
          </h1>
          <p className="lead fs-4 mb-4">Réservez vos terrains et organisez des matchs mémorables.</p>
          <Button
            variant="light"
            size="lg"
            className="fw-bold px-5 py-3"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => navigate('/terrains')}
          >
            Réserver un Terrain
          </Button>
        </div>
      </div>
      <div style={styles.waveDivider}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={styles.waveSvg}
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,101.3C96,107,192,117,288,117.3C384,117,480,107,576,80C672,53,768,11,864,10.7C960,11,1056,53,1152,69.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <Container className="py-5">
        <Row className="text-center g-4">
          <Col md={4}>
            <Card
              className="border-0 feature-card h-100"
              style={{
                overflow: 'hidden',
                transform: 'translateY(0)',
                transition: 'transform 0.4s, box-shadow 0.4s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <FaFutbol size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">Terrains Haut de Gamme</Card.Title>
                <Card.Text>
                  Découvrez des terrains de qualité pour une expérience de jeu optimale.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 feature-card h-100"
              style={{
                overflow: 'hidden',
                transform: 'translateY(0)',
                transition: 'transform 0.4s, box-shadow 0.4s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <FaUsers size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">Formation d'Équipes</Card.Title>
                <Card.Text>
                  Trouvez facilement des coéquipiers pour compléter votre équipe.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 feature-card h-100"
              style={{
                overflow: 'hidden',
                transform: 'translateY(0)',
                transition: 'transform 0.4s, box-shadow 0.4s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 128, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <FaCalendarAlt size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">Réservation Simplifiée</Card.Title>
                <Card.Text>
                  Réservez votre terrain en quelques clics avec notre système intuitif.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div
        className="py-5 text-light position-relative"
        style={{
          background: 'linear-gradient(180deg, #0f0f0f 0%, #1d1d1d 100%)',
        }}
      >
        <Container>
          <h2 className="fw-bold text-center mb-5">
            Nos Terrains
          </h2>
          <Carousel
            variant="dark"
            className="shadow-lg text-white rounded-4 overflow-hidden"
            style={{
              border: '3px solid #198754',
            }}
            interval={3000}
            fade
          >
            <Carousel.Item>
              <div
                className="position-relative carousel-item-div"
                style={{ height: '500px', overflow: 'hidden' }}
              >
                <Image
                  src="https://padelmagazine.fr/wp-content/uploads/2021/06/Padel-semi-couvert.jpg"
                  className="d-block w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 1s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  alt="Terrain Couvert"
                />
                <div
                  className="position-absolute top-0 w-100 h-100"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <Carousel.Caption>
                  <h3 className="fw-bold text-white display-6">Terrain Couvert</h3>
                  <p className='text-white'>Idéal pour jouer même par mauvais temps.</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                className="position-relative carousel-item-div"
                style={{ height: '500px', overflow: 'hidden' }}
              >
                <Image
                  src="https://www.espacesloisirs.ca/wp-content/uploads/2017/01/bg-apropos.jpg"
                  className="d-block w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 1s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  alt="Terrain Extérieur"
                />
                <div
                  className="position-absolute top-0 w-100 h-100"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <Carousel.Caption>
                  <h3 className="fw-bold text-white display-6">Terrain Extérieur</h3>
                  <p className='text-white'>Profitez du beau temps pour des matchs en plein air.</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                className="position-relative carousel-item-div"
                style={{ height: '500px', overflow: 'hidden' }}
              >
                <Image
                  src="https://d26itsb5vlqdeq.cloudfront.net//image/B5C3D15B-0407-167F-51E00AB4B55D258C"
                  className="d-block w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 1s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  alt="Terrain Synthétique"
                />
                <div
                  className="position-absolute top-0 w-100 h-100"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
                  }}
                />
                <Carousel.Caption>
                  <h3 className="fw-bold text-white display-6">Terrain Synthétique</h3>
                  <p className='text-white'>Qualité premium pour un confort de jeu optimal.</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="fw-bold text-center mb-5">Comment ça marche ?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 h-100 text-center p-4">
              <Card.Body>
                <FaClipboardCheck size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">1. Inscription</Card.Title>
                <Card.Text>
                  Créez votre compte en quelques secondes pour accéder à toutes les fonctionnalités.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 h-100 text-center p-4">
              <Card.Body>
                <FaMapMarkerAlt size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">2. Choisissez un Lieu</Card.Title>
                <Card.Text>
                  Sélectionnez un terrain proche de chez vous ou dans la zone qui vous convient.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 h-100 text-center p-4">
              <Card.Body>
                <FaCalendarAlt size={48} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-4">3. Réservez</Card.Title>
                <Card.Text>
                  Réservez la date et l’horaire de votre choix. C’est aussi simple que ça !
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5 bg-dark text-light rounded shadow-lg">
        <h2 className="fw-bold text-center mb-5">Ce que disent nos joueurs</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 p-3 bg-success text-light">
              <Card.Body>
                <div>
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                </div>
                <Card.Text className="mt-3">
                  “FootReserve a changé ma manière de jouer. Simple, rapide, et toujours prêt !”
                </Card.Text>
                <small>- Karim B.</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 p-3 bg-success text-light">
              <Card.Body>
                <div>
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                </div>
                <Card.Text className="mt-3">
                  “Les terrains sont incroyables et le processus de réservation est super simple.”
                </Card.Text>
                <small>- Léa D.</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-lg rounded-4 p-3 bg-success text-light">
              <Card.Body>
                <div>
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                  <FaStar size={24} />
                </div>
                <Card.Text className="mt-3">
                  “Un service exceptionnel pour les amateurs de football à Montréal !”
                </Card.Text>
                <small>- Jean M.</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <h2 className="fw-bold text-center mb-5">Foire Aux Questions</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Accordion className="shadow-lg rounded-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaRegQuestionCircle className="me-2 text-success" />
                  Comment puis-je annuler ma réservation ?
                </Accordion.Header>
                <Accordion.Body>
                  Vous pouvez annuler votre réservation depuis votre espace personnel jusqu'à 24h avant
                  le début du match. Passé ce délai, contactez-nous directement.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <FaRegQuestionCircle className="me-2 text-success" />
                  Puis-je payer en ligne ?
                </Accordion.Header>
                <Accordion.Body>
                  Oui, le paiement en ligne est disponible et sécurisé. Vous pouvez aussi régler sur
                  place dans certains terrains partenaires.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <FaRegQuestionCircle className="me-2 text-success" />
                  Comment trouver des joueurs pour compléter mon équipe ?
                </Accordion.Header>
                <Accordion.Body>
                  Utilisez notre fonctionnalité de recherche de joueurs dans votre compte. Vous pouvez
                  inviter des amis ou trouver de nouveaux coéquipiers.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <div className="bg-dark text-light text-center py-5 rounded-top shadow-lg position-relative overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,255,0,0.2), transparent 60%)',
            zIndex: 1,
            mixBlendMode: 'overlay',
          }}
        ></div>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="fw-bold display-4">Prêt pour l'Action ?</h2>
          <p className="lead fs-5">Réservez dès maintenant et vivez des matchs inoubliables.</p>
          <Button
            variant="success"
            size="lg"
            className="fw-bold px-5 py-3"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => navigate('/equipes')}
          >
            Commencez Maintenant
          </Button>
        </Container>
      </div>
    </div>
  );
}
