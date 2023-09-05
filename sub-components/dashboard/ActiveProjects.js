// import node module libraries
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import Loader from "components/Loader";

const ActiveProjects = ({ deliveries }) => {
  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white  py-4">
            <h4 className="mb-0">7 dernières livraisons</h4>
          </Card.Header>
          <Table responsive striped className="text-nowrap">
            <thead>
              <tr>
                <th scope="col" className="fw-bold">
                  #code
                </th>
                <th scope="col" className="fw-bold">
                  Id Client
                </th>
                <th scope="col" className="fw-bold">
                  Id Chauffeur
                </th>
                <th scope="col" className="fw-bold">
                  Colis
                </th>
                <th scope="col" className="fw-bold">
                  Status
                </th>
              </tr>
            </thead>
            {!deliveries ? (
              <Loader />
            ) : (
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.code}>
                    <th scope="row">
                      <Link href={`/deliveries/${delivery.code}`}>
                        {delivery.code}
                      </Link>
                    </th>
                    <td>{delivery.client}</td>
                    <td>{delivery.driver}</td>
                    <td>
                      {delivery.packs.map(
                        (pack) => pack.itemsDescription + "; "
                      )}
                    </td>
                    <td>{delivery.status}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
          <Card.Footer className="bg-white text-center">
            <Link href="/deliveries" className="link-primary">
              View All Projects
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default ActiveProjects;
