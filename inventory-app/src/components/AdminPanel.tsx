import Inventory from "./Inventory"
import AddItem from "./AddItem"
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
    const [requestList, setRequestList] = useState<any[]>([]);

    const approveRequest = async (requestId: string) => {
        await updateDoc(doc(db, "requests", requestId), {
            status: "approved",
        });
    };

    const rejectRequest = async (requestId: string) => {
        await updateDoc(doc(db, "requests", requestId), {
            status: "rejected",
        });
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
            {requestList.map(req => (
                <div key={req.id}>
                    <p>Item: {req.itemId}</p>
                    <p>User: {req.userId}</p>
                    <p>Status: {req.status}</p>

                    {req.status === "pending" && (
                        <>
                            <button onClick={() => approveRequest(req.id)}>Approve</button>
                            <button onClick={() => rejectRequest(req.id)}>Reject</button>
                        </>
                    )}
                </div>
            ))}
            <Inventory />
        </>
    )
}

export default AdminPanel                                  