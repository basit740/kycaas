import React from 'react';

import classes from './Header.module.css';

const Header = () => {
	return (
		<header>
			<nav className={classes.navbar}>
				<a href='/home/'>{process.env.REACT_APP_LOGO}</a>
			</nav>
		</header>
	);
};

export default Header;
