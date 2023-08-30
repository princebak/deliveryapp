"use client";

// import node module libraries
import { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Table,
  Nav,
  Tab,
  Container,
  Button,
  Modal,
} from "react-bootstrap";

// import widget/custom components
import { HighlightCode } from "widgets";

// import react code data file
import { StripedTableCode } from "data/code/TablesCode";
import axios from "axios";

const Tables = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState(null);

  useEffect(() => {
    console.log("In useEffect");
    const fetchData = async () => {
      const response = await fetch("/api/deliveries");
      const data = await response.json();
      console.log("Data >> ", data);
      setDeliveries(data);
    };
    fetchData();
  }, []);

  if (!deliveries) {
    return <p>Loading...</p>;
  }
  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Livraisons</h1>
              <p className="mb-0 ">Liste des livraisons.</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* striped-rows */}
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-4" defaultActiveKey="design">
            <Card>
              <Card.Header className="border-bottom-0 px-4 py-2 d-flex justify-content-between">
                <h2 className="p-0 m-0">Liste</h2>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="design" className="pb-4 p-4">
                    {/* code started */}
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
                          <th scope="col" className="fw-bold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveries.map((delivery) => (
                          <tr key={delivery.code}>
                            <th scope="row">{delivery.code}</th>
                            <td>{delivery.client}</td>
                            <td>{delivery.driver}</td>
                            <td>
                              {delivery.packs.map(
                                (pack) =>
                                  pack.items.map((item) => item.name + ",") +
                                  "; "
                              )}
                            </td>
                            <td>{delivery.status}</td>
                            <td>
                              <Button
                                variant="primary"
                                className="me-1"
                                onClick={() => {
                                  setActiveDelivery(delivery._id);
                                  setLgShow(true);
                                }}
                              >
                                Ajouter
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {/* end of code */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="react" className="pb-4 p-4 react-code">
                    <HighlightCode code={StripedTableCode} />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      {/* end of striped-rows */}

      {/* Modal */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {"Details d'une Livraison"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column gap-10">
            <div className="d-flex flex-wrap gap-2">
              <div className="flex-fill">
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    Affecter au chauffeur la livraison {}
                  </label>
                  <select
                    aria-describedby="driverHelp"
                    className="form-control"
                  >
                    <option>driver</option>
                  </select>
                </div>
              </div>

              <div className="flex-fill">
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Tables;