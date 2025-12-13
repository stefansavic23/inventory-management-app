import AddItem from "./AddItem";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
    doc,
    updateDoc,
    collection,
    onSnapshot,
    runTransaction
} from "firebase/firestore";
import RequestCard from "./RequestCard";
import { Grid } from "@mui/joy";

const AdminPanel = () => {
    const [requestList, setRequestList] = useState<any[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "requests"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRequestList(data);
        });

        return () => unsub();
    }, []);

    const approveRequest = async (request: any) => {
        await runTransaction(db, async (transaction) => {
            const itemRef = doc(db, "inventory", request.itemId);
            const requestRef = doc(db, "requests", request.id);

            const itemSnap = await transaction.get(itemRef);

            if (!itemSnap.exists()) {
                throw new Error("Item not found");
            }

            const currentQuantity = itemSnap.data().quantity;

            if (currentQuantity < request.requestedQuantity) {
                throw new Error("Not enough stock");
            }

            transaction.update(itemRef, {
                quantity: currentQuantity - request.requestedQuantity,
            });

            transaction.update(requestRef, {
                status: "approved",
            });
        });
    };


    const rejectRequest = async (requestId: string) => {
        await updateDoc(doc(db, "requests", requestId), {
            status: "rejected",
        });
    };

    return (
        <>
            <AddItem />

            <Grid
                container
                spacing={2}
                justifyContent="center"
            >
                {requestList.map(req => (
                    <RequestCard
                        key={req.id}
                        name={req.itemName}
                        status={req.status}
                        user={req.email}
                        requestedQuantity={req.requestedQuantity}
                        onApprove={() => approveRequest(req)}
                        onReject={() => rejectRequest(req.id)}
                    />
                ))}
            </Grid>
        </>
    );
};

export default AdminPanel;
