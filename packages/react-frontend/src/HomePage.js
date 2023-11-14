// src/HomePage.js

function SearchBar() {
    return (
        <form
            style={{
                display: 'flex',
                width: '60%',
                'align-items': 'center',
            }}
        >
            <input type="text" placeholder="Search.." name="search" />
            <button> </button>
        </form>
    )
}

function FunctionButton(props) {
    const val = props.val
    return (
        <a
            style={{
                color: 'black',
                padding: '15px 15px',
                'text-decoration': 'none',
                'font-size': '25px',
            }}
            href={'#' + val}
        >
            {val}
        </a>
    )
}

function FunctionBar() {
    return (
        <div>
            <SearchBar />
            <div
                style={{
                    float: 'right',
                }}
            >
                <FunctionButton val="Sign In" />
                <FunctionButton val="Sign Up" />
            </div>
            <div
                style={{
                    'background-color': '#e9e9e9',
                    width: '100%',
                }}
            >
                <FunctionButton val="Home" />
                <FunctionButton val="Profile" />
                <FunctionButton val="Post" />
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    )
}

function Home(props) {
    return <FunctionBar />
}

export default Home
