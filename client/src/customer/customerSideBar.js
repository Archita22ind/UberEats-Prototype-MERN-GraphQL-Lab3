import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import 'react-bootstrap-drawer/lib/style.css';
import {
	Drawer,
	DrawerOverflow,
	DrawerToC,
	DrawerToggle,
} from 'react-bootstrap-drawer';
// const MyLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);
import {CustomerNav} from './customerNav';

const CustomerSideBar = (props) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => setOpen(!open);
    //          
	return (
		<Drawer className={ props.className }>  
			<DrawerToggle onClick={ handleToggle } />

			<Collapse in={ open }>
				<DrawerOverflow>
					<DrawerToC>
						{ /* Your Navigation Goes Here */ }
						<CustomerNav />
					</DrawerToC>
				</DrawerOverflow>
			</Collapse>
		</Drawer>
	);
};

export default CustomerSideBar;