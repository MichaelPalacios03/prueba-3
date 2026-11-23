/* eslint-disable react-refresh/only-export-components */
import api from '../services/api.js'
import { createContext, useContext } from 'react';

const TallerContext = createContext(null);

export const TallerProvider = ({ children }) => {

    // TODO (Pregunta 3): llamar al API con "api" (services/api.js)
    // para obtener la lista de talleres.
    const findAll = async () => {
            return await api.get('/talleres');

    };

    // TODO (Pregunta 3): llamar al API con "api" (services/api.js)
    // para registrar "taller". Si el API responde con error, api.js ya lanza
    // un Error y el formulario lo muestra en pantalla.
    const create = async (taller) => {
        return await api.post('/talleres', taller);
    };

    return (
        <TallerContext.Provider value={{ findAll, create }}>
            {children}
        </TallerContext.Provider>
    );
};

export const useTaller = () => useContext(TallerContext);

export default TallerContext;
