function ItemView(props) {
    return (
        <div>
            <h4>{props.name}</h4>
            <img src={props.img}></img>
            <p>{props.desc}</p>
            <p>Offered By: {props.user}</p>
            <p>Located At: {props.location}</p>
            <button type="button" onClick={null}>
                Pick Up Item
            </button>
        </div>
    )
}

export default ItemView
