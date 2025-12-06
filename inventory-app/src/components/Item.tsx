import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { collection, addDoc } from "firebase/firestore"
import { db, auth } from '../config/firebase';

interface Props {
    id: string,
    name: string,
    quantity: number,
    price: number,
}

const Item = ({ name, price, quantity, id }: Props) => {
    const requestItem = async (itemId: string, userId: string) => {
        try {
            await addDoc(collection(db, "requests"), {
                itemId,
                userId,
                status: "pending",
            });
            alert("Zahtev je poslat adminu na odobrenje.");
        } catch (err) {
            console.error(err);
            alert("Došlo je do greške prilikom slanja zahteva.");
        }
    };

    return (
        <CssVarsProvider defaultMode="dark">
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
                }}
            >
                <Card
                    key={id}
                    variant="solid"
                    color="primary"
                    invertedColors
                    sx={{
                        boxShadow: 'sm',
                        width: 400,
                        maxWidth: '100%',
                        overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <div>
                        <Typography level="h2">
                            Name: {name}
                        </Typography>
                    </div>
                    <CardContent>
                        <Typography level="body-md">
                            Quantity: {quantity}
                        </Typography>
                        <Typography level="body-md">
                            Price: $ {price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="solid" onClick={() => requestItem(id, auth.currentUser?.uid)}>Get</Button>
                    </CardActions>
                </Card>
            </Sheet>
        </CssVarsProvider >
    )
}

export default Item