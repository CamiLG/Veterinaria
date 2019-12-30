import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import ListaCitas from './components/ListaCitas';
import NuevaCita from './components/NuevaCita';

class App extends Component {
  state = {  
    citas:[]
  }
  componentDidMount(){
    const citasLS= localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      });
    }
  }
  componentDidUpdate(){
      localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita= datos=> {
    const citas = [...this.state.citas, datos];

    this.setState(
      {citas}
    )
  }
  eliminarCita= id=> {
    //eliminar cita hacer una copia del state y 
    const citasActuales=[...this.state.citas];
    const citas= citasActuales.filter(cita=> cita.id !== id);
    this.setState({citas})

  }
  render() { 
    
    return ( 
      <div className= "container">
        <Header titulo='Administrador Pacientes Veterinaria'/>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
            crearNuevaCita={this.crearNuevaCita}
            />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
                <ListaCitas
                citas={this.state.citas}
                eliminarCita={this.eliminarCita}
                />
          </div>    
        </div>
      </div>
     );
  }
}
 
export default App;
