import React, { useState } from "react";
import Navbars from "../components/Navbar";
import { Alert, Button, Form, Navbar } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
const Register = () => {
  const navigator = useNavigate();

  const [userName, setUserName] = useState("");
  const [validity, setValidity] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [alert, setAlert] = useState(false);
  const [finishAlert, setFinishAlert] = useState(false);
  const [finishErrorAlert, setFinishErrorAlert] = useState(false);
  const [fingerAlert, setFingerAlert] = useState(false);
  const handleFile = (e) => {
    let data = e.target.files[0].name;
    if (data.endsWith(".jpg") || data.endsWith(".png")) {
      setAlert(false);
      setUploadFile(e.target.files[0]);
    } else {
      setAlert(true);
    }
  };
  const postRequest = async () => {
    const formdata = new FormData();
    formdata.append("license_img", uploadFile);
    formdata.append("username", userName);
    formdata.append("expiry_date", validity);
    const options = {
      method: "POST",
      body: formdata,
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/new_driver/",
        options
      );
      const res = await response.json();
      console.log(res);
      if (res.message === "posted" && res.finger !== -1) {
        setFinishAlert(true);
        setFingerAlert(false);
        setFinishErrorAlert(false);
        setTimeout(() => {
          return navigator("/exit");
        }, 5000);
      } else {
        setFinishAlert(false);
        setFinishErrorAlert(true);
        setFingerAlert(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = () => {
    // console.log(uploadFile);
    postRequest();
    setFinishErrorAlert(false);
    setFinishAlert(false);

    setFingerAlert(true);
  };

  return (
    <>
      <Navbars />
      <div className="main container">
        {finishErrorAlert && (
          <Alert className="" variant={"danger"}>
            Something went wrong.
          </Alert>
        )}
        {fingerAlert && (
          <Alert className="" variant={"info"}>
            Place your finger in the sensor.
          </Alert>
        )}
        {finishAlert && (
          <Alert className="" variant={"success"}>
            Succesfully Registered.
          </Alert>
        )}
        {alert && (
          <Alert className="" variant={"danger"}>
            License Image should be either jpg or png
          </Alert>
        )}
        {/* {licenseError && (
          <Alert className="" variant={"danger"}>
            Fingerprint error.
          </Alert>
        )} */}
        <Form className="mt-5">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUserName(e.target.value)}
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>License Image</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          <Button
            variant="dark"
            disabled={userName === "" || alert}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
