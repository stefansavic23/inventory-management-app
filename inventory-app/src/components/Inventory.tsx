import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { getDocs, collection, onSnapshot } from "firebase/firestore"
import Item from "./Item"
import { Grid } from "@mui/joy"
import { Snackbar } from '@mui/joy';

export default function Inventory() {
    const [itemList, setItemList] = useState([])
    const [requestResult, setRequestResult] = useState([])
    const [open, setOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const itemCollection = collection(db, "inventory")
    const requestsCollection = collection(db, "requests")


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
    }, [itemCollection])

    useEffect(() => {
        const unsubscribe = onSnapshot(requestsCollection, (snapshot) => {
            const reqs = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));

            const justApproved = reqs.find(r => r.status === "approved");
            const justRejected = reqs.find(r => r.status === "rejected");

            if (justApproved) {
                setSnackbarMessage("Your request was approved!");
                setOpen(true);
            }

            if (justRejected) {
                setSnackbarMessage("Your request was rejected.");
                setOpen(true);
            }

            setRequestResult(reqs);
        });

        return () => unsubscribe();
    }, [])

    return (
        <Grid
            container
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {
                requestResult.map(() => (
                    <Snackbar
                        open={open}
                        onClose={() => setOpen(false)}
                        color="neutral"
                        autoHideDuration={2000}
                    >
                        {snackbarMessage}
                    </Snackbar>
                ))
            }
            {
                itemList.map((item) => (
                    <Item name={item.name} id={item.id} quantity={item.quantity} price={item.price} />
                ))
            }
        </Grid >
    )
};