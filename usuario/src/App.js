import './App.css';
import { useState, useEffect } from "react"; // Agregue useEffect aquí
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

const [nombre_usuario , setNombre_usuario] = useState("");
const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const [password_verificacion , setPassword_verificacion] = useState("");

const [usuariosList,setUsuarios] = useState([]);

const add = ()=>{
  // Es buena idea validar las contraseñas aquí antes de enviar
    if (password !== password_verificacion) {
      alert("Las contraseñas no coinciden");
      return;
    }

    axios.post("http://localhost:3001/create", {
      nombre: nombre_usuario, //cambie esto
      email: email,
      password: password
    }).then(() => {
      getUsuarios();
      alert("¡Usuario registrado en la base de datos!");
    }).catch((error) => {
      console.error("Hubo un error:", error);
      alert("No se pudo conectar con el servidor");
    });
  };

  const getUsuarios = ()=>{
    axios.get("http://localhost:3001/usuarios").then((response) => {
      setUsuarios(response.data);
    });
  };

  //agregue esta//
  const deleteUsuario = (id) => {
  axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
    getUsuarios(); // Para que la lista se refresque sola
    alert("Usuario eliminado");
  });
};

  useEffect(() => {
  getUsuarios();
}, []); // Los corchetes vacíos [] significan "ejecuta esto solo al cargar la página"

  return (
    <div className="container">

    <div className="card text-center">
  <div className="card-header">
    GESTIÓN DE USUARIOS
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Nombre de usuario:</span>
    <input type="text"  
    onChange={(event)=>{
        setNombre_usuario(event.target.value);
      }}
    className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Email:</span>
    <input type="email"  
    onChange={(event)=>{
        setEmail(event.target.value);
      }}
    className="form-control" placeholder="Ingrese un email" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Password:</span>
    <input type="password"  
    onChange={(event)=>{
        setPassword(event.target.value);
      }}
    className="form-control" placeholder="Ingrese su contraseña" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Password verificación:</span>
    <input type="password"  
    onChange={(event)=>{
        setPassword_verificacion(event.target.value);
      }}
    className="form-control" placeholder="Ingrese nuevamente su contraseña" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
  </div>
  <div className="card-footer text-muted">
   <button className='btn btn-success' onClick={add}>Registrar usuario</button>
  </div>
</div>
<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre de usuario</th>
      <th scope="col">Email</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {
      usuariosList.map((val) => {
        return (
          <tr key={val.id}>
            <th scope="row">{val.id}</th>
            <td>{val.nombre}</td>
            <td>{val.email}</td>
            <td>
              <button 
                onClick={() => deleteUsuario(val.id)} 
                className='btn btn-danger'>
                Eliminar
              </button>
            </td>
          </tr>
        );
      })
    }
  </tbody>
</table>
    </div>
  );
}

export default App;
