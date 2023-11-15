// src/HomePage.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import Form from "./SignInForm";
import SignIn from "./SignIn";
import Post from "./Post";
import PostForm from "./PostForm";
import SearchBar from './SearchBar';

function FunctionButton(props) {
    const val = props.val
    return (
        <Link to={val} style={{
                color: 'black',
                padding: '15px 15px',
                'text-decoration': 'none',
                'font-size': '25px',
            }}>
                {val}
        </Link>
    )
}

function HomeBody() {
    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>);
}

function Home(props) {
    return <div>
        <BrowserRouter>
        <div
        style={{
            'background-color': '#e9e9e9',
            width: '100%',
        }}>
            <FunctionButton val="Home" />
            <FunctionButton val="Profile" />
            <FunctionButton val="Post" />
        </div>

        <div style={{
            float: 'right',
        }}
        >
            <FunctionButton val="Sign In" />
            <FunctionButton val="Sign Up" />
        </div>
        <Routes>
            <Route path="Sign In" element={<SignIn/>} />
            <Route path="Sign Up" element={props.SignUp} />
            <Route path="Home" element={props.Home}/>
            <Route path="" element={props.Home}/>
            {/* <Route path="Profile" element={<Profile />} /> */}
            <Route path="Post" element={props.Post} />
        </Routes>
    </BrowserRouter>
</div>
}

export default Home
