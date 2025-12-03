import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Grid } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"
import { db } from '../config/firebase';
import { useState } from 'react';

const AddItem = () => {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()

    const addItem = async () => {
        try {
            const itemRef = await addDoc(collection(db, "inventory"), {
                name: name,
                quantity: quantity,
                price: price
            })
        } catch (err) {
            console.error(err.messages)
        }
    }

    return (
        <Grid container direction={"column"} sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <form
            >
                <Stack spacing={1}>
                    <Input placeholder="Name" required onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Quantity" required onChange={(e) => setQuantity(e.target.value)} />
                    <Input placeholder="Price" required onChange={(e) => setPrice(e.target.value)} />

                    <Button onClick={addItem}>Add Item</Button>
                </Stack>
            </form>
        </Grid>
    )
}

export default AddItem