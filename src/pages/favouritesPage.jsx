import { useSelector, useDispatch } from 'react-redux';
import { selectFavourites, removeFavourite } from '../store/favouritesSlice.js';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FavouritesPage() {
  const companies = useSelector(selectFavourites);
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="h4 mb-3">Aziende preferite</h2>

      {companies.length === 0 ? (
        <p className="text-muted">Nessuna azienda nei preferiti.</p>
      ) : (
        <ListGroup>
          {companies.map((name) => (
            <ListGroup.Item key={name} className="d-flex justify-content-between align-items-center">
              <Link to={`/company/${encodeURIComponent(name)}`} className="text-decoration-none">{name}</Link>
              <Button size="sm" variant="outline-danger" onClick={() => dispatch(removeFavourite(name))}>
                Rimuovi
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
