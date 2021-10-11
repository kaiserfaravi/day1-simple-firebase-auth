import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import initializeAuthentication from './Firebase/firebase.initialize';
// import { computeHeadingLevel } from '@testing-library/dom';
import { useState } from 'react';

initializeAuthentication();
const googleprovider = new GoogleAuthProvider();
const githubprovider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState([]);

  //bar bar na korar jonno dilam 
  const auth = getAuth();


  // google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleprovider)

      .then(result => {
        const { displayName, email, photoURL } = result.user;

        const loggedInUser = {
          Name: displayName,
          email: email,
          photo: photoURL,


        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  // github sign in function

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubprovider)
      .then(result => {
        // const user = result.user;
        // destructuring
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          Name: displayName,
          email: email,
          photo: photoURL


        };
        setUser(loggedInUser);

        console.log(user);
      })

  }

  // for sign out
  const handlSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }


  return (
    <div className="App">
      {!user.Name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In Button</button>
        </div> :
        <button onClick={handlSignOut} >Sign Out</button>
      }
      <br />
      {/* ektu buje nite hbe */}
      {
        user.email && <div>
          <h2>Welcome {user.Name}</h2>
          <p>Email :{user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
