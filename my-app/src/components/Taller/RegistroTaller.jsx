import { useState } from 'react'
import { useTaller } from '../../context/TallerContext.jsx'
import { useNavigate } from 'react-router-dom'

// Este componente ya está completo: solo falta create() en TallerContext.jsx.
const RegistroTaller = () => {

    const { create } = useTaller()
    const navigate = useNavigate();

    const tallerDefault = {
        titulo: '',
        fecha: '',
        capacidad: 0
    }

    const [taller, setTaller] = useState({...tallerDefault})
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await create({ ...taller, capacidad: Number(taller.capacidad) });
            alert("¡Registro guardado!")
            navigate('/')
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input type="text" 
                    value={taller.titulo}
                    onChange={e => setTaller({...taller, titulo: e.target.value})}/>
                <label>Fecha</label>
                <input type="date" 
                    value={taller.fecha}
                    onChange={e => setTaller({...taller, fecha: e.target.value})}/>
                <label>Capacidad</label>
                <input type="number"
                    value={taller.capacidad}
                    onChange={e => setTaller({...taller, capacidad: e.target.value})}/>
                {error && <p className="error-message">{error}</p>}
                <button>GUARDAR</button>
            </form>
        </>
    )
}

export default RegistroTaller
