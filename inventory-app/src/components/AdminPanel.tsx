import AddItem from "./AddItem"
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import RequestCard from "./RequestCard";
import { Grid } from "@mui/joy";

const AdminPanel = () => {
    const [requestList, setRequestList] = useState<any[]>([]);

    const approveRequest = async (id: string) => {
        await updateDoc(doc(db, "requests", id), { status: "approved" });
    };

    const rejectRequest = async (id: string) => {
        await updateDoc(doc(db, "requests", id), { status: "rejected" });
    };

    const getAllRequests = async () => {
        const snap = await getDocs(collection(db, "requests"));

        return snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    useEffect(() => {
        const loadRequests = async () => {
            const list = await getAllRequests();
            setRequestList(list);
        };

        loadRequests();
    }, [requestList]);

    return (
        <>
            <AddItem />
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {requestList.map(req => (
                    <RequestCard
                        name={req.name}
                        status={req.status}
                        user={req.email}
                        requestId={req.id}
                        onApprove={approveRequest}
                        onReject={rejectRequest}
                    />
                ))}
            </Grid>
        </>
    )
}

export default AdminPanel                                  