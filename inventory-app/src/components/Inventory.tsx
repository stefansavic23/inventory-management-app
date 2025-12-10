import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { getDocs, collection, onSnapshot, query, where } from "firebase/firestore"
import Item from "./Item"
import { Grid } from "@mui/joy"
import { Snackbar } from '@mui/joy';
import { getAuth } from "firebase/auth"

export default function Inventory() {
    const [itemList, setItemList] = useState([])
    const [open, setOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const itemCollection = collection(db, "inventory")

    const currentUser = getAuth().currentUser?.email

    useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemCollection)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setItemList(filteredData)
            } catch (err) {
                console.error(err.message)
            }
        }

        getItemList()
    }, [])

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "requests"),
            where("email", "==", currentUser)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "modified") {
                    const data = change.doc.data();

                    if (data.status === "approved") {
                        setSnackbarMessage("Your request was approved!");
                        setOpen(true);
                    }

                    if (data.status === "rejected") {
                        setSnackbarMessage("Your request was rejected.");
                        setOpen(true);
                    }
                }
            })
        });

        return () => unsubscribe();
    }, [currentUser])

    return (
        <Grid
            container
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                color="neutral"
                autoHideDuration={2000}
            >
                {snackbarMessage}
            </Snackbar>

            {itemList.map((item) => (
                <Item
                    name={item.name}
                    id={item.id}
                    quantity={item.quantity}
                    price={item.price}
                />
            ))}
        </Grid>
    )
}
