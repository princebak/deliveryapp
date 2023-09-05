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
import { ResponsiveMenuAlignmentCode2 } from "data/code/DropdownsCode";
import DefaultButton from "../components/appButtons/DefaultButton";
import Link from "next/link";
import Loader from "components/Loader";

const Tables = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState({
    id: "",
    code: "",
    driverId: "",
  });
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const assignToDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put("/api/deliveries/assign_to_driver", {
      deliveryId: activeDelivery.id,
      driverId: activeDelivery.driverId,
    });
    await fetchData();
    setLgShow(false);
    setLoading(false);
  };

  const removeFromDriver = async (deliveryId, driverId) => {
    setLoading(true);
    await axios.put("/api/deliveries/remove_from_driver", {
      deliveryId,
      driverId,
    });
    await fetchData();
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/deliveries");
    const data = await response.json();
    console.log("Data >> ", data);
    setDeliveries(data);

    const response2 = await fetch("/api/drivers");
    const data2 = await response2.json();
    console.log("Data2 >> ", data2);
    setDrivers(data2);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!deliveries) {
    return <p>Chargement...</p>;
  }

  console.log("activeDelivery >> " + activeDelivery);
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
                      {loading ? (
                        <Loader />
                      ) : (
                        <tbody>
                          {deliveries.map((delivery) => (
                            <tr key={delivery.code}>
                              <th scope="row">
                                <Link href={`/deliveries/${delivery._id}`}>
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
                              <td>
                                <Button
                                  variant="primary"
                                  className="me-1"
                                  size="sm"
                                  onClick={() => {
                                    setActiveDelivery({
                                      id: delivery._id,
                                      code: delivery.code,
                                      driverId: delivery.driver,
                                    });
                                    console.log(
                                      "Selected activeDelivery",
                                      activeDelivery
                                    );
                                    setLgShow(true);
                                  }}
                                >
                                  {delivery.status === "created"
                                    ? "Affecter"
                                    : "ReAffecter"}
                                </Button>
                                {delivery.status === "pending" ? (
                                  !loading ? (
                                    <Button
                                      variant="primary"
                                      className="me-1"
                                      size="sm"
                                      onClick={() => {
                                        removeFromDriver(
                                          delivery._id,
                                          delivery.driver
                                        );
                                      }}
                                    >
                                      Retirer
                                    </Button>
                                  ) : (
                                    <Loader />
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
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
            {"Affectation d'une Livraison"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column gap-10"
            onSubmit={(e) => {
              assignToDriver(e);
            }}
          >
            <div className="d-flex flex-wrap gap-2">
              <div className="flex-fill">
                <div className="form-group">
                  <label>
                    Affecter au chauffeur la livraison avec le code{" "}
                    <strong>{activeDelivery.code}</strong>
                  </label>

                  <select
                    aria-describedby="driverHelp"
                    className="form-control"
                    onChange={(e) => {
                      setActiveDelivery({
                        ...activeDelivery,
                        driverId: e.target.value,
                      });
                    }}
                    value={activeDelivery.driverId}
                  >
                    {drivers.map((driver) => (
                      <option key={driver._id} value={driver._id}>
                        {driver.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <DefaultButton
              title={"Enregistrer"}
              type="submit"
              className="btn btn-primary"
              loading={loading}
            />
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Tables;
