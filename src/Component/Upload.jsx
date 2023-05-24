import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function Upload() {
  const in1 = useRef(null);
  const in2 = useRef(null);
  const [creatorName, setCreatorName] = useState("");
  const [modelName, setModelName] = useState("");
  const [file, setfile] = useState(null);
  const [img, setimg] = useState(null);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [IsMessage, setIsMessage] = useState("");

  const handleSubmit = async (event) => {
    if (
      creatorName.trim() != "" &&
      modelName.trim() != "" &&
      file != null &&
      img != null
    ) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("img", img);
      formData.append("name", creatorName);
      formData.append("modelname", modelName);

      const response = await axios
        .post("http://localhost:8080/item/senddata", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsMessage(response.data.message);
          setSuccess(true);
          in1.current.value = "";
          in2.current.value = "";
          setCreatorName("");
          setModelName("");
        })
        .catch((error) => {
          setIsMessage(error.response.data.message);
          setShow(true);
        });
    } else {
      setIsMessage("All fill required");
      setShow(true);    
    }
  };

  return (
    <>
      {show && (
        <div>
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <p>{IsMessage}</p>
          </Alert>
        </div>
      )}

      {success && (
        <div>
          <Alert
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            <p>{IsMessage}</p>
          </Alert>
        </div>
      )}

      <Form>
        <Form.Group className="mb-3" controlId="creatorName">
          <Form.Label>Creator Name</Form.Label>
          <Form.Control
            value={creatorName}
            onChange={(event) => setCreatorName(event.target.value)}
            type="text"
            placeholder="mohammad kaif"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ModeName">
          <Form.Label>Model Name</Form.Label>
          <Form.Control
            value={modelName}
            onChange={(event) => setModelName(event.target.value)}
            type="text"
            placeholder="X1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ModelFile">
          <Form.Label>Chosse 3d Model</Form.Label>
          <Form.Control
            ref={in1}
            accept=".glb,.gltf,.fbx"
            onChange={(event) => setfile(event.target.files[0])}
            type="File"
            placeholder="X1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ModelFile">
          <Form.Label>Upload thumbnail</Form.Label>
          <Form.Control
            ref={in2}
            accept=".png,.jpg,.gif"
            onChange={(event) => setimg(event.target.files[0])}
            type="File"
            placeholder="X1"
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleSubmit}>
          Upload
        </Button>{" "}
      </Form>
    </>
  );
}

export default Upload;
