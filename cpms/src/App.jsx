import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [plate, setPlate] = useState("");
  const [plateImg, setPlateImg] = useState("");
  const fetchRequest = async () => {
    const response = await fetch("http://127.0.0.1:8000/");
    const res = await response.json();
    console.log(res);
    setPlate(res.message);
    setPlateImg(res.file);
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="App">
      {/* <img src="yolov5 inference\cropped1.jpg" alt="Image" /> */}
      {plate && <img src={`data:image/jpeg;base64,${plateImg}`} />}

      <h1>{plate}</h1>
    </div>
  );
}

export default App;
