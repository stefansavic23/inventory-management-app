import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
    collection,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Item from "./Item";
import { Grid, Snackbar } from "@mui/joy";

export default function Inventory() {
    const [itemList, setItemList] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "inventory"),
            (snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItemList(items);
            }
        );

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "requests"),
            where("userId", "==", currentUser.uid)
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
            });
        });

        return () => unsubscribe();
    }, [currentUser]);

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
        >
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2500}
                color="neutral"
            >
                {snackbarMessage}
            </Snackbar>

            {itemList.map(item => (
                <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                />
            ))}
        </Grid>
    );
}
