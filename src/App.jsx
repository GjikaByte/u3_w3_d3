import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import FavouritesPage from './pages/FavouritesPage.jsx';

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Remote Jobs</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
              {/* add more links if needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:company" element={<CompanyPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="*" element={<div className="text-muted">Not found</div>} />
        </Routes>
      </Container>
    </>
  );
}
