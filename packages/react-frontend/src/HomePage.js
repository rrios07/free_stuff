// src/HomePage.js
import SearchBar from './SearchBar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Post from './Post'
import PostForm from './PostForm'
import ItemView from './ItemView.js'
import SearchResults from './SearchResults'
import Profile from './Profile'

function FunctionButton(props) {
    const val = props.val
    return (
        <Link
            to={val}
            style={{
                color: 'black',
                padding: '15px 15px',
                textDecoration: 'none',
                fontSize: '25px',
            }}
        >
            {val}
        </Link>
    )
}

// function HomeBody() {
//     return (
//         <div>
//             <SearchBar />
//             <div
//                 style={{
//                     float: 'right',
//                 }}
//             >
//                 <FunctionButton val="Sign In" />
//                 <FunctionButton val="Sign Up" />
//             </div>
//             <div
//                 style={{
//                     backgroundColor: '#e9e9e9',
//                     width: '100%',
//                 }}
//             >
//                 <FunctionButton val="Home" />
//                 <FunctionButton val="Profile" />
//                 <FunctionButton val="Post" />
//             </div>

//             <div>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//                 in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                 nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//                 sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </div>
//         </div>
//     )
// }

function Home(props) {
    return (
        <div>
            <BrowserRouter>
                <SearchBar />
                <div
                    style={{
                        backgroundColor: '#e9e9e9',
                        width: '100%',
                    }}
                >
                    <FunctionButton val="Home" />
                    <FunctionButton val="Profile" />
                    <FunctionButton val="Post" />
                </div>

                <div
                    style={{
                        float: 'right',
                    }}
                >
                    <FunctionButton val="Sign In" />
                    <FunctionButton val="Sign Up" />
                </div>
                <Routes>
                    <Route path="Sign In" element={<SignIn />} />
                    <Route path="Sign Up" element={<SignUp />} />

                    <Route path="Home" element={props.Home} />
                    <Route path="" element={props.Home} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Post" element={props.Post} />
                    <Route path="/search/:query" element={<SearchResults />} />
                    <Route path="/items/:query" element={<ItemView />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Home
