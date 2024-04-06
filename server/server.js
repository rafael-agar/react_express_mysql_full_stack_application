const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
//time
const moment = require('moment-timezone');
require('dotenv').config();

//path.resolve()
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5500;
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

/* ################## tabla trabajador_details ######################### */

app.post("/add_trabajador", (req, res) => {
  const sql =
    "INSERT INTO trabajador_details (`name`,`usuario`,`password`,`fecha_contratacion`,`id_cargo`) VALUES (?, ?, ?, ?, ?)";
  const values = [req.body.name, req.body.usuario, req.body.password, req.body.fecha_contratacion, req.body.id_cargo];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "trabajador added successfully" });
  });
});

// list control de asistencia
app.get("/trabajador_details", (req, res) => {
  const sql = `
    SELECT td.*, c.Nombre_cargo AS cargo_name
    FROM trabajador_details td
    JOIN cargo c ON td.id_cargo = c.ID_cargo`;
    
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" }); // Send error response and return to prevent further execution
    }
    return res.json(result); // Send successful response
  });
});


//obtiene un trabajador
app.get("/get_trabajador/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM trabajador_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

//editar un trabajador
app.post("/edit_trabajador/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE trabajador_details SET `name`=?, `usuario`=?, `password`=?, `fecha_contratacion`=?, `id_cargo`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.usuario,
    req.body.password,
    req.body.fecha_contratacion,
    req.body.id_cargo,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "trabajador updated successfully" });
  });
});

//elimina un trabajador
app.delete("/delete_trabajador/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM trabajador_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "trabajador updated successfully" });
  });
});

/* ################## tabla cargo ######################### */

app.post("/add_cargo", (req, res) => {
  const sql =
    "INSERT INTO cargo (`Nombre_cargo`,`Descripcion`,`Salario_base`) VALUES (?, ?, ?)";
  const values = [req.body.Nombre_cargo, req.body.Descripcion, req.body.Salario_base];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "cargo added successfully" });
  });
});

// list cargos
app.get("/cargo", (req, res) => {
  const sql = "SELECT * FROM cargo";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" }); // Send error response and return to prevent further execution
    }
    return res.json(result); // Send successful response
  });
});

//obtiene cargo
app.get("/get_cargo/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM cargo WHERE `ID_cargo`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error to get_cargo" });
    return res.json(result);
  });
});

//editar un cargo
app.post("/edit_cargo/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE cargo SET `Nombre_cargo`=?, `Descripcion`=?, `Salario_base`=? WHERE ID_cargo=?";
  const values = [
    req.body.Nombre_cargo,
    req.body.Descripcion,
    req.body.Salario_base,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "cargo updated successfully" });
  });
});

//elimina un trabajador
app.delete("/delete_cargo/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cargo WHERE ID_cargo=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "cargo eliminado successfully" });
  });
});



/* #################### CARGANDO ASISTENCIA ############################# */

// app.post('/login', (req, res) => {
//   const { usuario, password } = req.body;
//   const currentDate = new Date()
//   const currentHour = new Date()

//   // Validar usuario y contraseña
//   const loginSql = `SELECT * FROM trabajador_details WHERE usuario = ? AND password = ?`;
//   db.query(loginSql, [usuario, password], (err, result) => {
//       if (err) {
//           console.error('Error querying database:', err);
//           res.status(500).json({ error: 'An error occurred during login' });
//           return;
//       }

//       console.log(result)

//       if (result.length > 0) {
//           // Usuario válido
//           const userId = result[0].id;

//           // Insertar datos en la tabla asistencia_daily
//           const asistenciaSql = `INSERT INTO asistencia_daily (usuario, date, hours_start, hours_end, time_worked, overtime) VALUES (?, ?, ?, ?, ?, ?)`;
//           db.query(asistenciaSql, [userId, currentDate, currentHour, currentHour, 5, 2], (err, insertResult) => {
//               if (err) {
//                   console.error('Error inserting into asistencia_daily:', err);
//                   res.status(500).json({ error: 'An error occurred while inserting into asistencia_daily' });
//                   return;
//               }
//               res.json({ message: 'positivo desde el backend'});
//           });
//       } else {
//           res.status(401).json({ error: 'Invalid username or password' });
//       }
//   });
// });



// Route to handle adding entry to asistencia_daily table





// Función para calcular el tiempo trabajado en horas


app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  //const currentDate = new Date().toISOString().slice(0, 10); // Fecha actual en formato YYYY-MM-DD
  const currentDate = moment().tz('America/Caracas').format('YYYY-MM-DD');

  // Validar usuario y contraseña
  const loginSql = `SELECT * FROM trabajador_details WHERE usuario = ? AND password = ?`;
  db.query(loginSql, [usuario, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'An error occurred during login' });
    }

    if (result.length > 0) {
      // Usuario válido
      const userId = result[0].id;

      // Verificar si ya hay un registro para el usuario hoy
      const checkAttendanceSql = `SELECT * FROM asistencia_daily WHERE usuario = ? AND date = ?`;
      db.query(checkAttendanceSql, [userId, currentDate], (err, rows) => {
        if (err) {
          console.error('Error querying attendance:', err);
          return res.status(500).json({ error: 'An error occurred while checking attendance' });
        }

        if (rows.length > 0) {
          // Ya existe un registro para el usuario hoy
          updateAttendanceRecord(rows[0], userId, currentDate, res);
        } else {
          // No hay registro para el usuario hoy, insertar nuevos datos
          const now = new Date();
          const currentHour = [now.getHours(), now.getMinutes(), now.getSeconds()].map(num => String(num).padStart(2, '0')).join(':');
          //const currentHour =  new Date().toISOString().slice(11, 19); // Hora actual en formato HH:MM:SS
          const insertAttendanceSql = `INSERT INTO asistencia_daily (usuario, date, hours_start) VALUES (?, ?, ?)`;
          db.query(insertAttendanceSql, [userId, currentDate, currentHour], (err, insertResult) => {
            if (err) {
              console.error('Error inserting into asistencia_daily:', err);
              return res.status(500).json({ error: 'An error occurred while inserting into asistencia_daily'});
            }
            res.json({ message: 'Registro de ENTREDA creado correctamente', currentHour });
          });
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

function updateAttendanceRecord(row, userId, currentDate, res) {
  if (!row.hours_end) { // Verificar solo si hours_end no está definido
    const hoursStartStr = row.hours_start; // 'hours_start' de la base de datos en formato 'HH:MM:SS'
    
    const now = new Date();
    const hoursEndStr = [now.getHours(), now.getMinutes(), now.getSeconds()].map(num => String(num).padStart(2, '0')).join(':');

    // Construir objetos Date para 'hours_start' y 'hours_end' usando 'currentDate' como la fecha de referencia
    const hoursStart = new Date(`${currentDate}T${hoursStartStr}`);
    let hoursEnd = new Date(`${currentDate}T${hoursEndStr}`);

    // Ajustar 'hoursEnd' al día siguiente si es menor que 'hoursStart'
    if (hoursEnd < hoursStart) {
      hoursEnd.setDate(hoursEnd.getDate() + 1);
    }

    // Calcular la diferencia en horas
    const timeWorked = calcularTiempoTrabajado(hoursStart, hoursEnd);

    if (timeWorked >= 0) {
      // Aplicar el ajuste de zona horaria (restar 4 horas)
      hoursEnd.setHours(hoursEnd.getHours() - 4); 
      const hoursEndFormatted = hoursEnd.toISOString().slice(0, 19).replace('T', ' ');

      const updateValues = [hoursEndFormatted, timeWorked, calcularHorasExtra(timeWorked), userId, currentDate];
      const updateAttendanceSql = `UPDATE asistencia_daily SET hours_end = ?, time_worked = ?, overtime = ? WHERE usuario = ? AND date = ?`;
      db.query(updateAttendanceSql, updateValues, (err, updateResult) => {
        if (err) {
          console.error('Error updating asistencia_daily:', err);
          return res.status(500).json({ error: 'An error occurred while updating asistencia_daily' });
        }
        res.json({ message: 'SALIDA creada correctamente, Adios!', timeWorked });
      });
    } else {
      console.error('timeWorked calculated as negative');
      return res.status(500).json({ error: 'An error occurred while calculating time worked' });
    }
  } else {
    // El registro ya está completamente lleno
    res.json({ message: 'El registro de asistencia para el usuario hoy ya está completo' });
  }
}


function calcularTiempoTrabajado(hoursStart, hoursEnd) {
  // Asegurarse de que ambos argumentos sean fechas válidas
  if (isNaN(hoursStart.getTime()) || isNaN(hoursEnd.getTime())) {
    console.error('Invalid date provided for calcularTiempoTrabajado');
    return 0; // Devuelve 0 o maneja este caso según sea necesario
  }

  const diff = hoursEnd.getTime() - hoursStart.getTime();
  const timeWorked = diff / (1000 * 60 * 60); // Convertir milisegundos a horas
  return parseFloat(timeWorked.toFixed(2)); // Formatea a dos decimales y convierte a float
}

// Función para calcular las horas extras
function calcularHorasExtra(timeWorked) {
  const horasNormales = 9.9; // Número de horas normales de trabajo
  if (timeWorked > horasNormales) {
      return parseFloat((timeWorked - horasNormales).toFixed(2)); // Horas extras
  }
  return 0; // No hay horas extras
}





app.post('/add_asistencia', (req, res) => {
  const { usuario, date, hours_start, hours_end, time_worked,overtime } = req.body;

  // Query to insert data into asistencia_daily table
  const sql = `INSERT INTO asistencia_daily (usuario, date, hours_start, hours_end, time_worked, overtime) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [usuario, date, hours_start, hours_end, time_worked, overtime];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding asistencia:', err);
      res.status(500).json({ error: 'An error occurred while adding asistencia' });
    } else {
      console.log('Asistencia added successfully');
      res.json({ message: 'Asistencia added successfully' });
    }
  });
});

/* ###################### REPORTE #################################### */


// list reporte
app.get("/reporte", (req, res) => {
  const sql = `
  SELECT ad.*, td.name
FROM asistencia_daily ad
LEFT JOIN trabajador_details td ON ad.usuario = td.id
ORDER BY ad.date DESC;
  `;
    // const sql = "SELECT * FROM asistencia_daily";
    
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" }); // Send error response and return to prevent further execution
    }
    return res.json(result); // Send successful response
  });
});


//elimina un reporte
app.delete("/delete_reporte/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM asistencia_daily WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "cargo eliminado successfully" });
  });
});

//obtiene reporte
app.get("/get_reporte/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM asistencia_daily WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error to get_cargo" });
    return res.json(result);
  });
});

//editar un reporte
app.post("/edit_reporte/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE asistencia_daily SET `hours_start`=?, `hours_end`=?, `time_worked`=?, `overtime`=? WHERE id=?";

  const values = [
    req.body.hours_start,
    req.body.hours_end,
    req.body.time_worked,
    req.body.overtime,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "cargo updated successfully" });
  });
});

// Exportar reporte
app.get("/exportar_reporte", (req, res) => {
  // Obteniendo fechas desde los parámetros de la query, no desde los parámetros de la ruta
  const fechaInicio = req.query.fechaInicio;
  const fechaFin = req.query.fechaFin;

  // Asegúrate de que ambas fechas están presentes
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ message: "Se requieren la fecha de inicio y la fecha de fin" });
  }

  const sql = "SELECT * FROM asistencia_daily WHERE `date` BETWEEN ? AND ?";

  db.query(sql, [fechaInicio, fechaFin], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error del servidor al obtener el reporte" });
    }
    return res.json(result);
  });
});



/* ########################################################## */


app.listen(port, () => {
  console.log(`listening on port ${port} `);
});


