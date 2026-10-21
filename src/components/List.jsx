function List({ satellites }) {
  return (
    <div className="sat-list">
      <ul className="list-group">
        {satellites.map((satellite, index) => (
          <li key={index} className="list-group-item">
            Satellite {satellite.OBJECT_NAME} - {satellite.OBJECT_ID}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;