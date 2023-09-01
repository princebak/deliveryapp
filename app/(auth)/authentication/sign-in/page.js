"use client";

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import hooks
import useMounted from "hooks/useMounted";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loading } from "utils/constant";

const SignIn = () => {
  const [phone, setPhone] = useState("0828414084");
  const [password, setPassword] = useState("PASS648207");
  const [loading, setLoading] = useState(false);
  const hasMounted = useMounted();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginForm = {
      username: phone,
      password: password,
      redirect: false,
      // callbackUrl: `${window.location.origin}`,
    };
    const res = await signIn("credentials", loginForm);
    console.log("Login Request : ", loginForm);
    console.log("Login Response : ", res);
    res.error
      ? console.log("Connection Error >> ", res.error)
      : router.push("/");
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <h1>
                <Link href="/">DeliveryApp</Link>
              </h1>

              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && (
              <Form
                onSubmit={(e) => {
                  setLoading(true);
                  handleSubmit(e);
                }}
              >
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="**************"
                    required
                  />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    {loading ? (
                      Loading
                    ) : (
                      <Button variant="primary" type="submit">
                        Sign In
                      </Button>
                    )}
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div>
                      <Link
                        // href="/authentication/forget-password"
                        href="#"
                        className="text-inherit fs-5"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
