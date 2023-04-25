import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="border d-flex flex-column align-items-center vh-100 justify-content-center">
      <Link to="/main">
        <Button variant="dark px-5 ">
          <h4 className="text-center align-middle mt-1">Start</h4>
        </Button>
      </Link>
      <p className="text-center align-middle mt-2 gray">
        Press Start to Proceed
        <br />
        Go to{" "}
        <Link to="records" className=" link">
          Records
        </Link>
        /
        <Link to="register" className=" link">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Start;
