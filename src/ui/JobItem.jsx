import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isFavourite, toggleFavourite } from '../store/favouritesSlice.js';

function pick(obj, ...keys) {
  const o = {};
  keys.forEach(k => { if (obj?.[k] != null) o[k] = obj[k]; });
  return o;
}

export default function JobItem({ job }) {
  // API campi comuni
  const { title, company_name, candidate_required_location, category, job_type, url, publication_date } =
    pick(job, 'title', 'company_name', 'candidate_required_location', 'category', 'job_type', 'url', 'publication_date');

  const dispatch = useDispatch();
  const fav = useSelector((state) => isFavourite(state, company_name));

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="flex-grow-1">
          <Card.Title as="h5" className="mb-1">{title}</Card.Title>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <Link to={`/company/${encodeURIComponent(company_name)}`} className="text-decoration-none">
              <Badge bg="secondary">{company_name}</Badge>
            </Link>
            {candidate_required_location && <Badge bg="info" text="dark">{candidate_required_location}</Badge>}
            {(category || job_type) && <Badge bg="dark">{category || job_type}</Badge>}
            {publication_date && <small className="text-muted ms-2">{new Date(publication_date).toLocaleDateString()}</small>}
          </div>

          {url && (
            <div className="mt-2">
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                Vai all’annuncio
              </a>
            </div>
          )}
        </div>

        <div className="text-nowrap">
          <Button
            variant={fav ? 'success' : 'outline-success'}
            onClick={() => dispatch(toggleFavourite(company_name))}
            title={fav ? 'Già nei preferiti' : 'Aggiungi ai preferiti'}
          >
            {fav ? '★ Preferita' : '☆ Preferisci'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
