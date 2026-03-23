const express = require('express');
const app = express();
const mysql = require("mysql2"); // agregue el 2
const cors = require ("cors"); // agregue esta linea

app.use(cors()); // ¡Importante para conectar con React!
app.use(express.json()); // ¡Sin esto req.body no funciona!

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"usuarios_crud"
});

app.post("/create",(req,res)=>{
    // Extraemos los datos que vienen del front (React)
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    // Ejecutamos la consulta en la tabla 'usuarios'
    db.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)',
        [nombre, email, password],
        (err, result) => {
            if (err) {
                console.log("Error al insertar:", err);
                res.status(500).send("Error en el servidor");
            } else {
                res.send("Usuario registrado correctamente");
            }
        }
    );
});

app.get("/usuarios", (req, res) => {
    // Para traer datos no necesitamos enviar [nombre, email, password]
    db.query('SELECT * FROM usuarios', 
        (err, result) => {
            if (err) {
                console.log("Error al consultar:", err);
                res.status(500).send("Error en el servidor");
            } else {
                // Aquí 'result' contiene la lista de usuarios de MySQL
                res.send(result);
            }
        }
    );
});
//agregue esta //
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar");
        } else {
            res.send("Usuario eliminado");
        }
    });
});

app.listen(3001, () => { // Usamos el 3001 porque React suele usar el 3000
    console.log("Servidor corriendo en el puerto 3001");
});
