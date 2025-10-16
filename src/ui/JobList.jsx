import { Row, Col } from 'react-bootstrap';
import JobItem from './JobItem.jsx';

export default function JobList({ jobs = [] }) {
  return (
    <Row className="g-3">
      {jobs.map(j => (
        <Col xs={12} key={j._id || j.id || j.url}>
          <JobItem job={j} />
        </Col>
      ))}
    </Row>
  );
}
