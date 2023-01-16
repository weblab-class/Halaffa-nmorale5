function Move(props) {
  return (
    <button
      className="move"
      onClick={props.onClick}
    >
      {props.name}
    </button>  
  )
}