export default function CardAuto({ auto }) {
  return (
    <div className="card-auto">
      <img src={auto.imagen} alt={`${auto.marca} ${auto.modelo}`} />
      <h3>{auto.marca} {auto.modelo}</h3>
      <p>Año: {auto.año}</p>
      <p>Precio: ${auto.precio}</p>
    </div>
  )
}
