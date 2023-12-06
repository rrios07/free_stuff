function ItemView(props) {
    var img_prop = props.img
    if (img_prop == null)
        img_prop =
            'https://cdn.iconscout.com/icon/premium/png-256-thumb/not-available-2685170-2232747.png'

    return (
        <div>
            <h4>{props.name}</h4>
            <img src={img_prop}></img>
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
