import Taller from './taller.js';
import Reserva from './reserva.js';

// TODO (Pregunta 2):
//  1. Crear el modelo Reserva en models/reserva.js (nombreAlumno, correo).
//  2. Importarlo aquí y definir la relación talleres 1 ----> N reservas
//     con hasMany y belongsTo, usando la clave foránea 'tallerId'.
//  3. Exportarlo junto con Taller.
Taller.hasMany(Reserva, { foreignKey: 'tallerId', as: 'reservas', onDelete: 'CASCADE' });
Reserva.belongsTo(Taller, { foreignKey: 'tallerId' });

export { Taller, Reserva}
