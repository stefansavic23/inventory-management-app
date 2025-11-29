import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import { auth, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginFinal() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)

            if (email === "admin@gmail.com" && password === "admin123") {
                return navigate("/admin/panel")
            }

            navigate("/inventory")
        } catch (err) {
            const error = (((err.message).replace("-", " ")).split("(auth/")[1]).replace(").", "")

            const errorMessage = error.replace("-", " ")
            setError(errorMessage)
            console.error(errorMessage);
            console.error(err)
        }
    }

    const signInWithGoogle = async () => {
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
                    <Typography level="body-sm">Log in to continue.</Typography>
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
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormControl>
                <Button sx={{ mt: 1 }} onClick={login}>Log in</Button>
                <Button sx={{ mt: 1 }} onClick={signInWithGoogle}>Log in With Google</Button>
                <Typography
                    endDecorator={<Link href="/signup">Sign up</Link>}
                    sx={{ fontSize: 'sm', alignSelf: 'center' }}
                >
                    Don&apos;t have an account?
                </Typography>
            </Sheet>
        </main>
    );
}
