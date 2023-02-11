import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Exit = () => {
  return (
    <div className="border d-flex flex-column align-items-center vh-100 justify-content-center">
      <Link to="/">
        <Button variant="danger px-5 ">
          <h4 className="text-center align-middle mt-1">Exit</h4>
        </Button>
      </Link>
      <p className="text-center align-middle mt-2 gray">
        Press Exit to Restart the Process. <br />
        Go to{" "}
        <Link to="/records" className=" link">
          Records
        </Link>
      </p>
    </div>
  );
};

export default Exit;
