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
import { Loading } from "utils/constant";
import Link from "next/link";

const Details = ({ params: { id } }) => {
  const [data, setData] = useState({
    delivery: null,
    driver: null,
    client: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    console.log("ID >>", id);

    const response = await fetch(`/api/deliveries/${id}`);
    const delivery = await response.json();

    const response2 = await fetch(`/api/drivers/${delivery.driver}`);
    const driver = await response2.json();

    const response3 = await fetch(`/api/clients/${delivery.client}`);
    const client = await response3.json();

    const data = {
      delivery: delivery,
      driver: driver,
      client: client,
    };
    console.log("Details Data >> ", data);
    setData(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const myStyles = {
    details: "d-flex flex-column flex-md-row gap-2 p-5",
    detailsSection: "d-flex flex-column flex-fill gap-2",
    detailsElement:
      "d-flex flex-column flex-md-row flex-fill gap-2 align-items-center",
    label: { flex: 1, textAlign: "end", width: "100%" },
    span: {
      backgroundColor: "#eee",
      fontWeight: "bold",
      padding: "4px",
      flex: 1,
      borderRadius: "5px",
      width: "100%",
    },
  };
  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">{`Details Livraison ${
                data.delivery != null ? data.delivery.code : ""
              }`}</h1>
              <p className="mb-0 ">{"Details d'une livraison."}</p>
            </div>
            <h2>{data.delivery != null ? data.delivery.status : ""}</h2>
          </div>
        </Col>
      </Row>

      {/* striped-rows */}
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-4" defaultActiveKey="design">
            <Card>
              <Card.Header className="border-bottom-0 px-4 py-2 d-flex justify-content-between">
                <h2 className="p-0 m-0">Client</h2>
              </Card.Header>
              <Card.Body className="p-0">
                {data.client != null ? (
                  <div className={`${myStyles.details}`}>
                    <div className={`${myStyles.detailsSection}`}>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Nom Complet</label>
                        <span style={myStyles.span}>
                          {data.client.fullName}
                        </span>
                      </div>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>E-mail</label>
                        <span style={myStyles.span}>{data.client.email}</span>
                      </div>
                    </div>
                    <div className={`${myStyles.detailsSection}`}>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Phone</label>
                        <span style={myStyles.span}>{data.client.phone}</span>
                      </div>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Adresse</label>
                        <span style={myStyles.span}>{data.client.address}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  Loading
                )}
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      {/* end of striped-rows */}

      <Row className="mt-5 mb-5">
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-4" defaultActiveKey="design">
            <Card>
              <Card.Header className="border-bottom-0 px-4 py-2 d-flex justify-content-between">
                <h2 className="p-0 m-0">Chauffeur</h2>
              </Card.Header>
              <Card.Body className="p-0">
                {data.driver != null ? (
                  <div className={`${myStyles.details}`}>
                    <div className={`${myStyles.detailsSection}`}>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Nom Complet</label>
                        <span style={myStyles.span}>
                          {data.driver.fullName}
                        </span>
                      </div>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>E-mail</label>
                        <span style={myStyles.span}>{data.driver.email}</span>
                      </div>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Localisation</label>
                        <span style={myStyles.span}>
                          {data.driver.location?.latitude} {" / "}
                          {data.driver.location?.longitude}
                        </span>
                      </div>
                    </div>
                    <div className={`${myStyles.detailsSection}`}>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Phone</label>
                        <span style={myStyles.span}>{data.driver.phone}</span>
                      </div>
                      <div className={`${myStyles.detailsElement}`}>
                        <label style={myStyles.label}>Adresse</label>
                        <span style={myStyles.span}>{data.driver.address}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  Loading
                )}
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>

      <Row className="mt-5 mb-5">
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-4" defaultActiveKey="design">
            <Card>
              <Card.Header className="border-bottom-0 px-4 py-2 d-flex justify-content-between">
                <h2 className="p-0 m-0">Colis</h2>
              </Card.Header>
              <Card.Body className="p-0">
                {data.delivery != null ? (
                  <Tab.Content>
                    <Tab.Pane eventKey="design" className="pb-4 p-4">
                      {/* code started */}
                      <Table responsive striped className="text-nowrap">
                        <thead>
                          <tr>
                            <th scope="col" className="fw-bold">
                              Description des Items
                            </th>
                            <th scope="col" className="fw-bold">
                              Nom du bénéficiaire
                            </th>
                            <th scope="col" className="fw-bold">
                              Téléphone du bénéficiaire
                            </th>
                            <th scope="col" className="fw-bold">
                              Adresse du bénéficiaire
                            </th>
                            <th scope="col" className="fw-bold">
                              E-mail du bénéficiaire
                            </th>
                            <th scope="col" className="fw-bold">
                              Statut du colis
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading
                            ? Loading
                            : data.delivery.packs.map((pack) => (
                                <tr key={pack._id}>
                                  <td>{pack.itemsDescription}</td>
                                  <td>{pack.beneficiaryName}</td>
                                  <td>{pack.beneficiaryPhone}</td>
                                  <td>{pack.beneficiaryAddress}</td>
                                  <td>{pack.beneficiaryEmail}</td>
                                  <td>{pack.status}</td>
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
                ) : (
                  Loading
                )}
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
