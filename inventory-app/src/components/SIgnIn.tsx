import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const SignIn = () => {
    return (
        <>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Sign In</button>
        </>
    )
}