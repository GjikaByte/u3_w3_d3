import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/actions/favourites.js';

export default function JobItem({ job }) {
  const dispatch = useDispatch();
  const favs = useSelector(s => s.favourites.companies);
  const isFav = favs.includes(job.company_name);

  return (
    <Card className="mb-2 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-start gap-3">
        <div className="flex-grow-1">
          <Card.Title as="h5" className="mb-1">{job.title}</Card.Title>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to={`/company/${encodeURIComponent(job.company_name)}`} className="text-decoration-none">
              <Badge bg="secondary">{job.company_name}</Badge>
            </Link>
            {job.candidate_required_location && (
              <Badge bg="info" text="dark">{job.candidate_required_location}</Badge>
            )}
            {job.publication_date && (
              <small className="text-muted ms-2">
                {new Date(job.publication_date).toLocaleDateString()}
              </small>
            )}
          </div>

          {job.url && (
            <div className="mt-2">
              <a href={job.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                Vai all’annuncio
              </a>
            </div>
          )}
        </div>

        <div className="text-nowrap">
          <Button
            className={isFav ? 'btn btn-success' : 'btn btn-outline-success'}
            onClick={() => dispatch(toggleFavourite(job.company_name))}
            title={isFav ? 'Già nei preferiti' : 'Aggiungi ai preferiti'}
          >
            {isFav ? '★ Preferita' : '☆ Preferisci'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
