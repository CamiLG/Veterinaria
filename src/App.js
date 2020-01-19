import React, { Fragment, useState, useEffect } from "react";
import Form from "./Components/Form";
import Cita from "./Components/Cita";

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  //revisamos si hay citas almacenadas en localstorage, si citas es null, enviamos un arreglo vacío.
  if(!citasIniciales)
{
  citasIniciales = [];
}  const [citas, setcitas] = useState([]);
  /* useEffect es un método que se ejecuta cuando se carga o modifica un componente siempre retorna un arreglo. Es similar al método component did mount y component did update */
  useEffect(() => {
    
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);
  const crearCita = cita => {
    setcitas([...citas, cita]);
  };
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setcitas(nuevasCitas);
  };
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
