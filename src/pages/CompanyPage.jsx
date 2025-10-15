import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import JobList from '../ui/JobList.jsx';

const BASE = 'https://strive-benchmark.herokuapp.com/api/jobs';

async function fetchByCompany(company, limit = 25) {
  const url = `${BASE}?company=${encodeURIComponent(company)}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data || json.results || [];
}

export default function CompanyPage() {
  const { company } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true); setErr('');
      try {
        const list = await fetchByCompany(company);
        if (!cancel) setJobs(list);
      } catch (e) {
        if (!cancel) { setErr(e.message || 'Errore di rete'); setJobs([]); }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [company]);

  return (
    <>
      <h2 className="h4 mb-3">Offerte: <span className="text-primary">{company}</span></h2>
      {loading && <div className="mb-3"><Spinner animation="border" size="sm" /> Caricamento…</div>}
      {err && <Alert variant="danger">{err}</Alert>}
      <JobList jobs={jobs} />
    </>
  );
}
