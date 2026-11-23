import sequelize from "../config/database.js";
import { DataTypes } from 'sequelize';
 
const Reserva = sequelize.define('reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreAlumno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'reservas'
})
 
export default Reserva;