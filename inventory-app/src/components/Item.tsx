import { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Sheet,
    Button,
    Snackbar,
    Modal,
    Input,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

interface Props {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

const Item = ({ id, name, quantity, price }: Props) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [quantityToGet, setQuantityToGet] = useState<number>(1);

    const requestItem = async (itemId: string, requestedQuantity: number) => {

        if (!auth.currentUser) {
            setSnackbarMessage("You must be logged in.");
            setOpenSnackbar(true);
            return;
        }

        if (requestedQuantity < 1 || requestedQuantity > quantity) {
            return;
        }

        try {
            await addDoc(collection(db, "requests"), {
                itemId,
                name: name,
                requestedQuantity,
                userId: auth.currentUser.uid,
                email: auth.currentUser.email,
                status: "pending",
                createdAt: new Date(),
            });

            setSnackbarMessage("Request has been sent to admin for approval.");
            setOpenSnackbar(true);
            setOpenModal(false);
            setQuantityToGet(1);
        } catch (err) {
            console.error(err);
            setSnackbarMessage("An error occurred while sending the request.");
            setOpenSnackbar(true);
        }
    };

    return (
        <CssVarsProvider defaultMode="dark">
            <CssBaseline />

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                autoHideDuration={3000}
                color="neutral"
            >
                {snackbarMessage}
            </Snackbar>

            {/* Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Sheet
                    variant="outlined"
                    sx={{
                        mx: "auto",
                        my: "20vh",
                        p: 3,
                        width: 300,
                        borderRadius: "md",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography level="h4">Select quantity</Typography>

                    <Input
                        type="number"
                        required
                        onChange={(e) =>
                            setQuantityToGet(Number(e.target.value))
                        }
                    />

                    <Button
                        onClick={() =>
                            requestItem(id, quantityToGet)
                        }
                    >
                        Confirm
                    </Button>
                </Sheet>
            </Modal>

            {/* Item Card */}
            <Sheet
                sx={{
                    width: 300,
                    mx: "auto",
                    my: 4,
                    py: 3,
                    px: 2,
                }}
            >
                <Card
                    variant="solid"
                    color="primary"
                    invertedColors
                    sx={{ boxShadow: "sm" }}
                >
                    <Typography level="h2">
                        {name}
                    </Typography>

                    <CardContent>
                        <Typography>
                            Quantity available: {quantity}
                        </Typography>
                        <Typography>
                            Price: ${price}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            disabled={quantity === 0}
                            onClick={() => setOpenModal(true)}
                        >
                            Get
                        </Button>
                    </CardActions>
                </Card>
            </Sheet>
        </CssVarsProvider>
    );
};

export default Item;
