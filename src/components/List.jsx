function List({ satellites, onSelectSatellite }) {
  return (
    <div className="sat-list">
      <ul className="list-group">
        {satellites.map((satellite, index) => (
          <li key={index} className="list-group-item" onClick={() => {
            setClass(satellite, index);
            onSelectSatellite(satellite);
            }}>

            Satellite {satellite.OBJECT_NAME} - {satellite.OBJECT_ID}
          </li>
        ))}
      </ul>
    </div>
  );
}

function setClass(satellite, index) {
  // Logique pour sélectionner un satellite et le mettre en surbrillance dans la scène 3D
  console.log('Satellite sélectionné :', satellite.OBJECT_NAME);
  if (document.getElementsByClassName("list-group-item")[index].classList.contains("active")) {
    document.getElementsByClassName("list-group-item")[index].classList.remove("active");
  } else {

   document.getElementsByClassName("list-group-item")[index].classList.add("active");
  }
  
} 

export default List;