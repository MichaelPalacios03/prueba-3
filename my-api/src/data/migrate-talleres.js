import sequelize from "../config/database.js"
import { Taller } from '../models/relaciones.js'

// Fecha de hoy + n días, en formato AAAA-MM-DD
const enDias = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const talleres = [
  { id: 1, titulo: "Taller de UX", fecha: enDias(30), capacidad: 25 },
  { id: 2, titulo: "Taller de Docker", fecha: enDias(7), capacidad: 2 },
  { id: 3, titulo: "Taller de APIs REST", fecha: enDias(14), capacidad: 40 }
]

async function migrate() {
  try {
    await sequelize.sync({force: true})
    await Taller.bulkCreate(talleres);

    for (const tabla of ['talleres']) {
      await sequelize.query(
      `SELECT setval(pg_get_serial_sequence('${tabla}', 'id'), (SELECT MAX(id) FROM ${tabla}))`
      )
    }

    console.log('Migracion terminada!')
  
  } catch (error) { 
    console.log(error)
  } finally {
    await sequelize.close()
  }
}

migrate();
