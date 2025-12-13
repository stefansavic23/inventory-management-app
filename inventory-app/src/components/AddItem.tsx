import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Grid } from "@mui/material";
import { collection, addDoc } from "firebase/firestore"
import { db } from '../config/firebase';
import { useState } from 'react';
import { Snackbar } from '@mui/joy';

const AddItem = () => {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState<number>(1)
    const [price, setPrice] = useState<number>(1)
    const [open, setOpen] = useState(false);


    const addItem = async () => {
        try {
            if (quantity < 1 || price < 1) {
                return;
            }

            const itemRef = await addDoc(collection(db, "inventory"), {
                name: name,
                quantity: quantity,
                price: price,
                status: "pending"
            })
            setOpen(true)

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                color="neutral"
                autoHideDuration={2000}
            >
                Item added successfully!
            </Snackbar>
            <Grid container direction={"column"} sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <form>
                    <Stack spacing={1}>
                        <Input placeholder="Name" type='string' required onChange={(e) => setName(e.target.value)} />
                        <Input placeholder="Quantity" type='number' required onChange={(e) => setQuantity(Number(e.target.value))} />
                        <Input placeholder="Price" type='number' required onChange={(e) => setPrice(Number(e.target.value))} />

                        <Button type='button' onClick={addItem}>Add Item</Button>
                    </Stack>
                </form>
            </Grid>
        </>
    )
}

export default AddItem