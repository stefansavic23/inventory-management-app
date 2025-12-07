import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import { Grid } from '@mui/joy';

interface Props {
    name: string;
    user: string;
    requestId: string;
    status: string;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export default function RequestCard({
    name,
    user,
    requestId,
    status,
    onApprove,
    onReject
}: Props) {
    return (
        <Grid
            container
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    width: 350,
                    p: 3,
                    borderRadius: "lg",
                    boxShadow: "lg",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 3
                }}
            >
                <Typography level="h3">Request</Typography>

                <CardContent sx={{ textAlign: "center" }}>
                    <Typography level="body-lg">Item: {name}</Typography>
                    <Typography level="body-md">User: {user}</Typography>

                    <Typography level="body-sm">
                        Status: {status}
                    </Typography>

                    {status !== "pending" && (
                        <Typography
                            color={status === "approved" ? "success" : "danger"}
                        >
                            {status.toUpperCase()}
                        </Typography>
                    )}
                </CardContent>

                {status === "pending" && (
                    <CardActions
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            width: "100%"
                        }}
                    >
                        <Button
                            color="success"
                            variant="solid"
                            onClick={() => onApprove(requestId)}
                        >
                            Approve
                        </Button>

                        <Button
                            color="danger"
                            variant="solid"
                            onClick={() => onReject(requestId)}
                        >
                            Reject
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Grid>
    );
}
