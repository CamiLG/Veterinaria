import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuid from 'uuid';


const stateInicial={
    cita: {
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    },
    error: false

}
class NuevaCita extends Component {
    state = { 
       ...stateInicial
     }
     //para modificar los datos en el state
     handleChange = e =>{
         this.setState(
             {
                 cita: {
                     ...this.state.cita,
                     [e.target.name] : e.target.value
                 }
             }
         )
     }

     //para enviar el formulario
     handleSubmit = e =>{
         e.preventDefault();
         //extraer valores del state y validar los datos
        const {mascota, propietario, fecha, hora, sintomas}= this.state.cita;
        if(mascota === '' || propietario=== '' || fecha ==='' || hora=== '' || sintomas=== ''){
            this.setState(
                {
                    error:true
                }
            );
            return;
        }
        //creamos con uuid un id para cada cita, es como si fuera el de la base de datos
        const nuevaCita= {
            ...this.state.cita,
            id: uuid()
        }

         //agregar los datos a la cita
         this.props.crearNuevaCita(nuevaCita);
         //colocar el sate inicial
         this.setState({
             ...stateInicial
         }
         )
     }
    render() { 
        const {error}= this.state;
        return (  
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Completa el formulario para crear una nueva cita 
                    </h2>
                    {error ? <div className="alert alert-danger mt-2 mb-5 text-center"> Todos los campos son obligatorios</div>: null}
                    <form
                    onSubmit={this.handleSubmit}
                    >
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Nombre de la Mascota
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Mascota"
                                    name="mascota"
                                    onChange={this.handleChange}
                                    value= {this.state.cita.mascota}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Nombre del Dueño
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Dueño Mascota"
                                    name="propietario"
                                    onChange={this.handleChange}
                                    value={this.state.cita.propietario}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Fecha
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha"
                                    onChange={this.handleChange}
                                    value={this.state.cita.fecha}
                                />
                            </div>
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Hora
                            </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="hora"
                                    onChange={this.handleChange}
                                    value={this.state.cita.hora}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Sintomas
                            </label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea
                                className="form-control"
                                name="sintomas"
                                placeholder="Describe los sintomas"
                                    onChange={this.handleChange}
                                    value={this.state.cita.sintomas}>
                                </textarea>
                            </div>
                        </div>
                        <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="Agregar Nueva Cita"/>

                    </form>
                </div>
            </div>
        );
    }
}
 NuevaCita.propTypes ={
    crearNuevaCita: PropTypes.func.isRequired
 }
export default NuevaCita;