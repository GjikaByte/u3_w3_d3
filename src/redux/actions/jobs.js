import { JOBS_REQUEST, JOBS_SUCCESS, JOBS_FAILURE } from './actionTypes.js';

const BASE = 'https://strive-benchmark.herokuapp.com/api/jobs';

const parseJobs = async (res) => {
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return data.data || data.results || [];
};

export const fetchJobs = (query, limit = 20) => {
  return async (dispatch) => {
    dispatch({ type: JOBS_REQUEST, payload: { query } });
    try {
      const url = `${BASE}?search=${encodeURIComponent(query)}&limit=${limit}`;
      const list = await parseJobs(await fetch(url));
      dispatch({ type: JOBS_SUCCESS, payload: { items: list, query } });
    } catch (err) {
      dispatch({ type: JOBS_FAILURE, payload: { error: err.message || 'Errore di rete' } });
    }
  };
};

export const fetchJobsByCompany = (company, limit = 25) => {
  return async (dispatch) => {
    dispatch({ type: JOBS_REQUEST, payload: { company } });
    try {
      const url = `${BASE}?company=${encodeURIComponent(company)}&limit=${limit}`;
      const list = await parseJobs(await fetch(url));
      dispatch({ type: JOBS_SUCCESS, payload: { items: list, company } });
    } catch (err) {
      dispatch({ type: JOBS_FAILURE, payload: { error: err.message || 'Errore di rete' } });
    }
  };
};
