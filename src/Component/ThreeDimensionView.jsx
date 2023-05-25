import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, useProgress } from "@react-three/drei";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

//Model
function Model(props) {
  const { scene } = useGLTF("https://backend-cs7woc-microtica.microtica.rocks/item/file/" + props.param);
  return <primitive object={scene} {...props} />;
}

//Three Dimensions View
function ThreeDimensionView() {
  const { id } = useParams();
  const [fname, setfname] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://backend-cs7woc-microtica.microtica.rocks/item/modelname?id=${id}`)
      .then((response) => {
        console.log(response.data.filename);
        setfname(response.data.filename);
      });
  }, []);

  return (
    <>
      {typeof fname === "undefined" ? (
       <div className="container" style={{display:'flex',justifyContent:'center',alignItems:'center',height:"300px"}} >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ fov: 45 }}
            style={{ position: "absolute" }}
          >
            <color attach="background" args={["#DDDDDD"]} />
            <OrbitControls enablePan enableZoom enableRotate />
            <Stage environment="sunset">
              <Model scale={0.029999} param={fname} />
            </Stage>
          </Canvas>
        </>
      )}
    </>
  );
}

export default ThreeDimensionView;
