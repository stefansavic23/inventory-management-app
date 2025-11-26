import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate("/inventory")
        }
        catch (err) {
            const error = (((err.message).replace("-", " ")).split("(auth/")[1]).replace(").", "")

            const errorMessage = error.replace("-", " ")
            setError(errorMessage)
            console.error(errorMessage);
        }
    }

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <main>
            <CssBaseline />
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: 4,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <div>
                    <Typography level="h4" component="h1">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography level="body-sm">Create account to continue.</Typography>
                    {
                        error ? <Alert color="danger">{error}</Alert> : ''
                    }
                </div>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button sx={{ mt: 1 }} onClick={signUp}>Sign Up</Button>
                <Button sx={{ mt: 1 }} onClick={signUpWithGoogle}>Sign Up With Google</Button>
            </Sheet>
        </main>
    );
}
