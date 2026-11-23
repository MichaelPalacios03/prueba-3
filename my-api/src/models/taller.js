import sequelize from "../config/database.js";
import { DataTypes } from 'sequelize';

// Modelo ya definido: no es necesario modificarlo.
const Taller = sequelize.define('taller', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY, // formato AAAA-MM-DD
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'talleres'
})

export default Taller;
