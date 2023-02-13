import { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Form, Navbar } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import Navbars from "../components/Navbar";

function Main() {
  const [plate, setPlate] = useState("");
  const [plateImg, setPlateImg] = useState("");
  const [alert, setAlert] = useState(false);
  const [numOfPass, setNumOfPass] = useState(Number);
  const navigator = useNavigate();
  const fetchRequest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/upload/");
      const res = await response.json();
      setPlate(res.message);
      setPlateImg(res.file);
    } catch (error) {
      alert(error.msg);
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
      alert(error.msg);
    }
  };
  useEffect(() => {
    fetchRequest();
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
        <Form className="mt-5">
          <Form.Group className="mb-3">
            <Form.Label>Number of Passengers</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNumOfPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Number Plate Image</Form.Label>
            <br />
            <div>
              {plateImg && (
                <img
                  alt="image"
                  className="w-75"
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
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            disabled={numOfPass == 0 || plateImg === "" || numOfPass === ""}
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
