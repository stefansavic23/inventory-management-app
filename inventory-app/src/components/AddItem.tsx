import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Grid } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"
import { db } from '../config/firebase';

const AddItem = () => {
    const addItem = async () => {
        const itemRef = addDoc(collection(db, "inventory"), {
            name: "Iphone 17",
            quantity: "10",
            price: "999"
        })

        console.log("Document written with ID: ", itemRef.id)
    }


    return (
        <Grid container direction={"column"} sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <form
            >
                <Stack spacing={1}>
                    <Input placeholder="Name" required />
                    <Input placeholder="Quantity" required />
                    <Input placeholder="Price" required />

                    <Button type="submit" onClick={addItem}>Add Item</Button>
                </Stack>
            </form>
        </Grid>
    )
}

export default AddItem