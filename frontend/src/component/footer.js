import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      {" "}
      {/* Change this to a valid HTML tag */}
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>PandeyStore &copy; {currentYear}</p>{" "}
            {/* Use &copy; for the copyright symbol */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
