import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import FavouritesPage from './pages/favouritesPage.jsx';

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Remote Jobs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:company" element={<CompanyPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Container>
    </>
  );
}
