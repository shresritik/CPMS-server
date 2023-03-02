import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form, Navbar } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import Navbars from "../components/Navbar";

function Main() {
  const [plate, setPlate] = useState("");
  const [plateImg, setPlateImg] = useState("");
  const [name, setName] = useState("");
  const [validity, setValidity] = useState("");
  const [driverImg, setDriverImg] = useState("");
  const [alert, setAlert] = useState(false);
  const [licenseError, setLicenseError] = useState(false);
  const [numOfPass, setNumOfPass] = useState(Number);
  const navigator = useNavigate();
  const fetchFingerRequest = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/validate_driver/"
      );
      const res = await response.json();
      console.log(res);
      let errMsg = await res.message.split(" ")[0];

      setDriverImg(res.driver?.license_img);
      setName(res.driver?.username);
      setValidity(res.driver?.expiry_date);

      if (errMsg == "Error") {
        setLicenseError(true);
      } else {
        setLicenseError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/upload/");
      const res = await response.json();

      setPlate(res.message);
      setPlateImg(res.file);
    } catch (error) {
      console.log(error);
    }
  };
  const postRequest = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numOfPass: numOfPass,
        plateImg: plateImg,
        numberPlate: plate,
        licenseImg: driverImg,
        expiry_date: validity,
      }),
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/upload/",
        options
      );
      const res = await response.json();
      console.log(res);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  useEffect(() => {
    fetchFingerRequest();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest();
    setPlate("");
    setNumOfPass();
    setAlert(true);
    setTimeout(() => {
      return navigator("/exit");
    }, 4000);

    // alert("Form submitted");
  };
  return (
    <>
      <Navbars />
      <div className="main container">
        {alert && (
          <Alert className="" variant={"success"}>
            Form Submitted, Redirecting to Exit.
          </Alert>
        )}
        {licenseError && (
          <Alert className="" variant={"danger"}>
            Fingerprint error.
          </Alert>
        )}
        <Form className="mt-5">
          <Form.Group className="mb-3">
            <Form.Label>
              <h4>{licenseError && "Fingerprint Error Detected"}</h4>
              <h4>Name: {!name ? "Loading..." : name}</h4>
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number of Passengers</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNumOfPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              value={validity ? validity : ""}
              onChange={(e) => setValidity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>License Image</Form.Label>
            <br />
            <h4>{licenseError && "Fingerprint Error "}</h4>

            <div>
              {driverImg && (
                <img
                  alt="image"
                  className="w-12"
                  src={`http://localhost:8000${driverImg}`}
                />
              )}
            </div>
            {!driverImg && <h6>Loading...</h6>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number Plate Image</Form.Label>
            <br />
            <div>
              {plateImg && (
                <img
                  alt="image"
                  className="w-12"
                  src={`data:image/jpeg;base64,${plateImg}`}
                />
              )}
            </div>
            {!plateImg && <h6>Loading...</h6>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number Plate</Form.Label>
            <Form.Control
              type="text"
              value={plate ? plate : ""}
              onChange={(e) => setPlate(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            disabled={
              numOfPass == 0 ||
              plateImg === "" ||
              numOfPass === "" ||
              licenseError == true
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Main;
