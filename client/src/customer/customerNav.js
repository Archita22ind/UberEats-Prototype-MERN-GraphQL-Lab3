import {
	Nav,
} from 'react-bootstrap';
import {DrawerNavigationHeader ,
        DrawerNavigation} from 'react-bootstrap-drawer';


export const CustomerNav = (props) => {
	return (
        <>
		<DrawerNavigationHeader href="/">An Application</DrawerNavigationHeader>

			<DrawerNavigation>
				{ /* Standard react-bootstrap Nav.Item / Nav.Link */ }
				{ /* Caveat: CSS provides custom styles */ }
				<Nav.Item>
					<Nav.Link href="/">Home</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link href="/settings">Settings</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link href="/profileInfo">Profile Information</Nav.Link>
				</Nav.Item>
			</DrawerNavigation>
            </>
	);
};