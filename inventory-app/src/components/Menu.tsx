import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import Link from '@mui/joy/Link';


const MenuComponent = () => {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
                <MoreVert />
            </MenuButton>
            <Menu>
                <MenuItem>
                    <Link href="/" color="neutral">
                        Home
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/login" color="neutral">
                        Login
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/signup" color="neutral">
                        Sign up
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/inventory" color="neutral">
                        Inventory
                    </Link>
                </MenuItem>
            </Menu>
        </Dropdown>
    )

}

export default MenuComponent