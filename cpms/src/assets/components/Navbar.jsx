import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Navbars() {
  return (
    <>
      <Navbar className="p-3  " bg="dark" variant="dark">
        <Container fluid>
          <NavLink to="/">
            <h4>CPMS</h4>
          </NavLink>{" "}
          <Nav className="me-auto ms-3 align-text-middle mt-2">
            <NavLink
              to="/records"
              style={({ isActive }) =>
                isActive ? { color: "white" } : { color: "gray" }
              }
            >
              <p className="text">Records</p>
            </NavLink>
          </Nav>{" "}
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
