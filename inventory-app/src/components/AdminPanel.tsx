import Inventory from "./Inventory"
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Grid } from "@mui/material";

const AdminPanel = () => {
    return (
        <>
            <Grid container direction={"row"} sx={{
                justifyContent: "space-between",
                alignItems: "baseline",
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
                        <Input placeholder="Try to submit with no text!" required />
                        <Input placeholder="It is disabled" disabled />
                        <Button type="submit">Submit</Button>
                    </Stack>
                </form>
                <hr />
            </Grid>
            <Inventory />
        </>
    )
}

export default AdminPanel