import * as React from "react"
import Button from "@mui/joy/Button"
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useColorScheme } from "@mui/joy";


function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <Button variant="soft">Change mode</Button>;
    }

    return (
        <Select
            variant="soft"
            value={mode}
            onChange={(event, newMode) => {
                setMode(newMode);
            }}
            sx={{ width: 'max-content' }}
        >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
        </Select>
    );
}

export default ModeToggle