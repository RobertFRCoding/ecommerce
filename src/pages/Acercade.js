import React, { useState } from 'react';
import FranImage from '../components/Fran.jpg';  // Asegúrate de que la ruta sea correcta
import RobertImage from '../components/Robert.png';  // Asegúrate de que la ruta sea correcta
import FedeImage from '../components/Fede.png';  // Asegúrate de que la ruta sea correcta
import PabloImage from '../components/Pablo.png';  // Asegúrate de que la ruta sea correcta
import JaviImage from '../components/Javi.png';  // Asegúrate de que la ruta sea correcta


// Suponiendo que tienes un array de objetos con la información del equipo
const equipo = [
  { nombre: 'Fran', imagen: FranImage },
  { nombre: 'Robert', imagen: RobertImage },
  { nombre: 'Fede', imagen: FedeImage },
  { nombre: 'Pablo', imagen: PabloImage },
  { nombre: 'Javi', imagen: JaviImage },
  // ... más miembros del equipo
];

function Acercade() {
  // Estado para controlar qué sección mostrar
  const [seccionActiva, setSeccionActiva] = useState(null);

  // Funciones para manejar el clic en las pestañas
  const mostrarQuienesSomos = () => {
    setSeccionActiva('quienesSomos');
  };

  const mostrarNuestroEquipo = () => {
    setSeccionActiva('nuestroEquipo');
  };

  return (
    <div>
      {/* Pestañas */}
      <button onClick={mostrarQuienesSomos}>Quiénes somos?</button>
      <button onClick={mostrarNuestroEquipo}>Nuestro equipo</button>

      {/* Contenido de "Quiénes somos?" */}
      {seccionActiva === 'quienesSomos' && (
        <div>
          <h1>Bienvenido a Zapas Exclusivas</h1>
          <p>En Zapas Exclusivas, no solo vendemos zapatillas; ofrecemos una experiencia única para los amantes del calzado distintivo. Somos apasionados por la moda, la individualidad y la calidad excepcional. Cada par que ofrecemos cuenta una historia de innovación y estilo.

Nuestra misión es elevar tu estilo con zapatillas que no solo son exclusivas en diseño, sino que también reflejan tu personalidad audaz. Explora nuestra cuidadosa selección de calzado único y únete a la comunidad de aquellos que valoran la singularidad en cada paso.

Descubre la fusión perfecta entre moda y autenticidad en Zapas Exclusivas. ¡Caminemos juntos hacia un mundo de estilo incomparable!

¡Espero que esto capture la esencia de tu tienda de zapatillas exclusivas!
            
            {/* ... */}
          </p>
        </div>
      )}

      {/* Contenido de "Nuestro equipo" */}
      {seccionActiva === 'nuestroEquipo' && (
        <div>
          <h1>Nuestro Equipo</h1>
          <div className="equipo-container">
            {equipo.map((miembro, index) => (
              <div key={index} className="miembro-equipo">
                <img src={miembro.imagen} alt={miembro.nombre} />
                <h3>{miembro.nombre}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Acercade;
