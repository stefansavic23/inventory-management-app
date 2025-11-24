/*

const Inventory = () => {
    

    return (
        <div>
            {itemList.map((item) => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                </div>
            ))}
        </div>
    )
}

export default Inventory
*/

import { db } from "../config/firebase"
import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

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
    }, [])

    return (
        <>
            {itemList.map((item) => (
                <CssVarsProvider defaultMode="dark">
                    <CssBaseline />

                    <Sheet
                        sx={{
                            width: 300,
                            mx: 'auto',
                            my: 4,
                            py: 3,
                            px: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Card
                            key={item.id}
                            variant="solid"
                            color="primary"
                            invertedColors
                            sx={{
                                boxShadow: 'sm',
                                width: 400,
                                maxWidth: '100%',
                                overflow: 'auto',
                                resize: 'horizontal',
                            }}
                        >
                            <div>
                                <Typography level="h2">
                                    Name: {item.name}
                                </Typography>
                            </div>
                            <CardContent>
                                <Typography level="body-md">
                                    Quantity: {item.quantity}
                                </Typography>
                                <Typography level="body-md">
                                    Price: ${item.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="solid">Get</Button>
                            </CardActions>
                        </Card>
                    </Sheet>
                </CssVarsProvider>
            ))
            }
        </>
    )
};
