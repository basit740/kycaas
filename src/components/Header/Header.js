import React from 'react';

import classes from './Header.module.css';

const Header = () => {
	return (
		<header>
			<nav className={classes.navbar}>
				<a href='/home/'>Logo</a>
			</nav>
		</header>
	);
};

export default Header;
