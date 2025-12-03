import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import Item from "./Item"
import { Grid } from "@mui/joy"

export default function Inventory() {
    const [itemList, setItemList] = useState([])

    const itemCollection = collection(db, "inventory")

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
                itemList.map((item) => (
                    <Item name={item.name} id={item.id} quantity={item.quantity} price={item.price} />
                ))
            }
        </Grid>
    )
};