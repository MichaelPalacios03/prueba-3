import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import { useTaller } from './context/TallerContext.jsx';

// La carga con useEffect ya está escrita: usa findAll() de TallerContext.jsx.
function App() {
  const { findAll } = useTaller();
  const [ talleres, setTalleres] = useState([])
  const [ error, setError] = useState('')

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const result = await findAll();
        setTalleres([...(result ?? [])]);
      } catch (err) {
        setError('No se pudo cargar la lista: ' + err.message);
      }
    }  

    handleLoad();

  },[])

  return (
    <>
      <Header />
      <main>
        <h2>Lista de talleres</h2>
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Capacidad</th>
            </tr>
          </thead>
          <tbody>
            {
              /* TODO (Pregunta 3): recorrer "talleres" y mostrar una fila <tr>
                 por registro, con titulo, fecha y capacidad en celdas <td>. */
                 talleres.map((t) => (
      <tr key={t.id}>
        <td>{t.titulo}</td>
        <td>{t.fecha}</td>
        <td>{t.capacidad}</td>
      </tr>
    ))
            }
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
