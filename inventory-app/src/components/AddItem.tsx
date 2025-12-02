import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Grid } from "@mui/material";

const AddItem = () => {
    return (
        <Grid container direction={"column"} sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    alert(JSON.stringify(formJson));
                }}
            >
                <Stack spacing={1}>
                    <Input placeholder="Name" required />
                    <Input placeholder="Quantity" required />
                    <Input placeholder="Price" required />

                    <Button type="submit">Add Item</Button>
                </Stack>
            </form>
        </Grid>
    )
}

export default AddItem