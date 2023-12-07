import { Link } from 'react-router-dom'

function Item(props) {
    var img_prop = props.img
    if (img_prop == null)
        img_prop =
            'https://cdn.iconscout.com/icon/premium/png-256-thumb/not-available-2685170-2232747.png'

    return (
        <Link to={'/items/' + props.post_id}>
            <div
                style={{
                    color: 'black',
                    width: '1165px',
                    height: '200px',
                    boxShadow: '0px 0px 3px black',
                }}
            >
                <h4>{props.name}</h4>
                <img
                    style={{
                        objectFit: 'contain',
                        minWidth: '20%',
                        maxWidth: '20%',
                        minHeight: '70%',
                        maxHeight: '70%',
                    }}
                    src={img_prop}
                ></img>
                <p
                    style={{
                        display: 'inline-block',
                    }}
                >
                    User: {props.user}
                    <br />
                    {props.desc}
                </p>
            </div>
        </Link>
    )
}

export default Item
