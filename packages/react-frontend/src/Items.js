import { Link } from "react-router-dom";

function Item(props)
{
    return (
        <Link to='a'>
            <div
            style={{
                    padding: '2px',
                    color: 'black',
                    width: '250px',
                    height: '250px',
                    gap: '20px',
                    boxShadow: '0px 0px 3px black'
                }}>
                <h4 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                Vacuum Cleaner</h4>
                <img
                style={{
                    objectFit: 'contain',
                    width: '80%',
                    maxHeight: '60%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block'
                }} 
                src='https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'></img>
            </div>
        </Link>
    )
}

export default Item;