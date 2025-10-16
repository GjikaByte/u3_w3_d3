import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/actions/jobs.js';
import { Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';
import JobItem from '../ui/JobItem.jsx';

export default function Home() {
  const [query, setQuery] = useState('developer');
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.jobs);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchJobs(query, 20));
  };

  useEffect(() => { dispatch(fetchJobs(query, 20)); }, [dispatch]); // initial

  return (
    <>
      <Form onSubmit={onSubmit} className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Cerca posizione (es. developer, designer)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">Cerca</Button>
        </InputGroup>
      </Form>

      {loading && <div className="mb-3"><Spinner animation="border" size="sm" /> Caricamento…</div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && items.map(job => (
        <JobItem key={job._id || job.id || job.url} job={job} />
      ))}
    </>
  );
}
