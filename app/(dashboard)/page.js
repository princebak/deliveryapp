"use client";
// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/deliveries/stats");
    const data = await response.json();
    console.log("Data >> ", data);
    setStatistics(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Tableau de bord</h3>
                </div>
                <div>
                  <Link href="#" className="btn btn-white">
                    Livraisons non affectées
                    <span>({statistics?.created})</span>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          {ProjectsStatsData.map((item, index) => {
            if (statistics != null) {
              switch (item.id) {
                case 1:
                  item.value =
                    statistics?.created +
                    statistics?.delivered +
                    statistics?.on_the_way +
                    statistics?.pending;
                  break;
                case 2:
                  item.value = statistics?.delivered;
                  break;
                case 3:
                  item.value = statistics?.on_the_way;
                  break;
                case 4:
                  item.value = statistics?.pending;
                  break;

                default:
                  break;
              }
            }

            return (
              <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                <StatRightTopIcon info={item} />
              </Col>
            );
          })}
        </Row>

        {/* Active Projects  */}
        <ActiveProjects deliveries={statistics?.last7} />

        <Row className="my-6"></Row>

        {/*  <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <TasksPerformance />
          </Col>
          <Col xl={8} lg={12} md={12} xs={12}>
            <Teams />
          </Col>
        </Row> */}
      </Container>
    </Fragment>
  );
};
export default Home;
