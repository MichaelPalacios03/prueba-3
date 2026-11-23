import { Taller } from '../models/relaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(Taller);

// TODO (Pregunta 1): sobrescribir findAll para devolver los registros
// ordenados por fecha ascendente.
repository.findAll = async () => {
    try {
    return await Taller.findAll({ order: [['fecha', 'ASC']] });
  } catch (error) {
    console.log(error);
    return null;
  }

}

// TODO (Pregunta 2): sobrescribir findOne para incluir sus reservas.

export default repository;
