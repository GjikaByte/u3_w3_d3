import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsByCompany } from '../redux/actions/jobs.js';
import { Spinner, Alert } from 'react-bootstrap';
import JobItem from '../ui/JobItem.jsx';

export default function CompanyPage() {
  const { company } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.jobs);

  useEffect(() => {
    if (company) dispatch(fetchJobsByCompany(company));
  }, [company, dispatch]);

  return (
    <>
      <h2 className="h4 mb-3">Offerte per <span className="text-primary">{company}</span></h2>

      {loading && <div className="mb-3"><Spinner animation="border" size="sm" /> Caricamento…</div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && items.map(job => (
        <JobItem key={job._id || job.id || job.url} job={job} />
      ))}
    </>
  );
}
