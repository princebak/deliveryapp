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
import Link from "next/link";
import Loader from "components/Loader";

const Details = ({ params: { id } }) => {
  const [data, setData] = useState({
    driver: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    console.log("ID >>", id);

    const response3 = await fetch(`/api/drivers/${id}`);
    const driver = await response3.json();

    const data = {
      driver: driver,
    };
    console.log("Details driver >> ", data);
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
              <h1 className="mb-1 h2 fw-bold">Details Chauffeur </h1>
              <p className="mb-0 ">{"Details d'un driver."}</p>
            </div>
            <h2>{data.driver != null ? data.driver.status : ""}</h2>
          </div>
        </Col>
      </Row>

      {/* striped-rows */}
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
                  <Loader />
                )}
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      {/* end of striped-rows */}
    </Container>
  );
};

export default Details;
