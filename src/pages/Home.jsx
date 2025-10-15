import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import JobList from '../ui/JobList.jsx';

const BASE = 'https://strive-benchmark.herokuapp.com/api/jobs';

async function fetchJobs(query, pageSize = 20) {
  const url = `${BASE}?search=${encodeURIComponent(query)}&limit=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // alcune risposte usano 'data' per la lista
  return json.data || json.results || [];
}

export default function Home() {
  const [query, setQuery] = useState('developer');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [jobs, setJobs] = useState([]);

  const doSearch = async (q) => {
    if (!q) return;
    setLoading(true); setErr('');
    try {
      const list = await fetchJobs(q);
      setJobs(list);
    } catch (e) {
      setErr(e.message || 'Errore di rete');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { doSearch(query); /* auto-search iniziale */ }, [query]);

  return (
    <>
      <Row className="align-items-center g-2 mb-3">
        <Col md={8}>
          <Form onSubmit={(e) => { e.preventDefault(); doSearch(query); }}>
            <InputGroup>
              <Form.Control
                placeholder="Cerca posizione (es. developer, designer)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="primary">Cerca</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {loading && <div className="mb-3"><Spinner animation="border" size="sm" /> Caricamento…</div>}
      {err && <Alert variant="danger">{err}</Alert>}

      <JobList jobs={jobs} />
    </>
  );
}
