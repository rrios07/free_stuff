import { Link } from 'react-router-dom'

function Item(props) {
    return (
        <Link to="a">
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
                    src={props.img}
                    alt="Missing."
                />
                <p
                    style={{
                        display: 'inline-block',
                    }}
                >
                    User: {props.user}
                    <br />
                    Location: {props.location}
                    <br />
                    Condition: {props.condition}
                </p>
            </div>
        </Link>
    )
}

export default Item
