"use client";
// import node module libraries
import { Fragment } from "react";
import { Col, Row, Card, Table, Nav, Tab, Container } from "react-bootstrap";

// import widget/custom components
import { HighlightCode } from "widgets";

// import react code data file
import {
  BasicTableCode,
  DarkTableCode,
  TableHeadCode,
  StripedTableCode,
  TableVariantCode,
  BorderedTableCode,
  BorderlessTableCode,
  HoverableRowsCode,
  SmallTableCode,
  ContextualClassesCode,
  ResponsiveTableCode,
} from "data/code/TablesCode";

const Tables = () => {
  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Livraisons</h1>
              <p className="mb-0 ">Toutes les livraisons.</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* striped-rows */}
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container id="tab-container-4" defaultActiveKey="design">
            <Card>
              <Card.Header className="border-bottom-0 p-0">
                <Nav className="nav-lb-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="design" className="mb-sm-3 mb-md-0">
                      Liste
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="react" className="mb-sm-3 mb-md-0">
                      Edition
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="design" className="pb-4 p-4">
                    {/* code started */}
                    <Table striped className="text-nowrap">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
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
    </Container>
  );
};

export default Tables;
