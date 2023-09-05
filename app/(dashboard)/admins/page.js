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
import DefaultButton from "../components/appButtons/DefaultButton";
import Link from "next/link";
import Loader from "components/Loader";

const Tables = () => {
  const [admins, setAdmins] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullName,
      email,
      phone,
      address,
      password,
    };
    await axios.post("/api/admins", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    await fetchData();
    setLgShow(false);
    setLoading(false);
  };
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/admins");
    const data = await response.json();
    setAdmins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Utilisateurs</h1>
              <p className="mb-0 ">Liste des utilisateurs.</p>
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

                <Button
                  variant="primary"
                  className="me-1"
                  onClick={() => setLgShow(true)}
                >
                  Ajouter
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="design" className="pb-4 p-4">
                    {/* code started */}
                    <Table responsive striped className="text-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" className="fw-bold">
                            #Nom
                          </th>
                          <th scope="col" className="fw-bold">
                            E-mail
                          </th>
                          <th scope="col" className="fw-bold">
                            Phone
                          </th>
                          <th scope="col" className="fw-bold">
                            Adresse
                          </th>
                          <th scope="col" className="fw-bold">
                            Status
                          </th>
                        </tr>
                      </thead>
                      {loading ? (
                        <Loader />
                      ) : (
                        <tbody>
                          {admins.map((admin) => (
                            <tr key={admin._id}>
                              <th scope="row">
                                <Link href={`/admins/${admin._id}`}>
                                  {admin.fullName}
                                </Link>
                              </th>
                              <td>{admin.email}</td>
                              <td>{admin.phone}</td>
                              <td>{admin.address}</td>
                              <td>{admin.status}</td>
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
            {"Ajout d'un admin"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column gap-10"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="d-flex flex-wrap gap-2">
              <div className="flex-fill">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Nom complet</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputFullname"
                    aria-describedby="emailFullname"
                    placeholder="Saisir le nom complet"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Saisir l'e-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputPassword">Mot de passe</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword"
                    aria-describedby="passwordHelp"
                    placeholder="Saisir le mot de passe"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>

              <div className="flex-fill ">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Téléphone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Saisir le numéro de téléphone"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="exampleInputPassword1">Adresse</label>
                  <textarea
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Saisir l'adresse"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  ></textarea>
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
