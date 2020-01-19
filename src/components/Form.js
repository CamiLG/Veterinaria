import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types'

const Form = ({crearCita}) => {

    const [cita, actualizarcita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const handleChange = e => {
      actualizarcita({
        ...cita,
        [e.target.name]: e.target.value
      });
    };
    const [error, seterror] = useState(false)
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    const submitCita = e => {
       e.preventDefault();
    
       // Validar datos
       if(mascota.trim() === '' ||  propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
           seterror(true);
           return;
       }
       //Eliminar el mensaje de error
       seterror(false);
       //Asignar in ID
       cita.id = uuid();

       //Crear la cita
        crearCita(cita);
       // Reiniciar el form
       actualizarcita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
       });
    }
    return (
      <Fragment>
        <h2>Crear Cita</h2>
        {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
        <form onSubmit={submitCita}>
          <label>Nombre de Mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre Mascota"
            onChange={handleChange}
            value={mascota}
            
          />
          <label>Nombre del Dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre Dueño de mascota"
            onChange={handleChange}
            value={propietario}
          />
          <label>Fecha</label>
          <input type="date" name="fecha" className="u-full-width" onChange={handleChange} value={fecha}/>

          <label>Hora</label>
          <input type="time" name="hora" className="u-full-width"  onChange={handleChange} value={hora} />
          <label>Sintomas</label>
          <textarea className="u-full-width" name="sintomas" onChange={handleChange} value={sintomas}>

          </textarea>
          <button type="submit" className=" u-full-width">Agregar Cita</button>
        </form>
      </Fragment>
    );
}
 Form.propTypes = {
   crearCita: PropTypes.func.isRequired
 }
export default Form;