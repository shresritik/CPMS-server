import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbars from "../components/Navbar";

const Views = () => {
  const [views, setViews] = useState();
  const fetchRequest = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/");
    const res = await response.json();
    setViews(res);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <>
      <Navbars />
      <div className="container-fluid p-3">
        <h4 className="mb-4">Total Records: {views && views.length}</h4>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>S.N</th>
              <th>Number Plate Image</th>
              <th>Number Plate</th>
              <th>Number of Passengers</th>
            </tr>
          </thead>
          <tbody>
            {views &&
              views.map((view) => (
                <tr className="text-center align-middle" key={view.id}>
                  <td>
                    <h6>{view.id}</h6>
                  </td>
                  <td>
                    {" "}
                    {/* <h6>{view.id}</h6> */}
                    <img src={`data:image/jpeg;base64,${view.plateImg}`} />
                  </td>

                  <td>
                    {" "}
                    <h6>{view.numberPlate}</h6>
                  </td>
                  <td>
                    {" "}
                    <h6>{view.numOfPass}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Views;
