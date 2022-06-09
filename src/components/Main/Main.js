import React, { useState } from 'react';

import classes from './Main.module.css';
const Main = () => {
	const [id, setID] = useState('');
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const submitHandler = async (event) => {
		event.preventDefault();
		setLoading(true);

		const response = await fetch(
			process.env.REACT_APP_API_URL + '/customers/' + id
		);
		const result = await response.json();
		// if (result.registered === false) {
		// 	alert('no information found');
		// }

		setLoading(false);

		if (result.registered === false) {
			setNotFound(true);
		}
	};

	return (
		<div className={classes.main}>
			<div className={classes['main-content-container']}>
				{!notFound && (
					<div classes={classes['main-content']}>
						<h3>New Client</h3>
						<p>
							<label>Please Enter your ID</label>
						</p>
						<p>
							<form onSubmit={submitHandler}>
								<div classes={classes['input-group']}>
									<input
										style={{
											padding: '5px',
											borderRadius: '5px',
											width: '200px',
										}}
										type='text'
										onChange={(e) => {
											setID(e.target.value);
										}}
									/>
								</div>
								<div classes={classes['input-group-action']}>
									<button
										style={{
											marginTop: '10px',
											padding: '5px',
											borderRadius: '5px',
											backgroundColor: 'rgb(74, 74, 237)',
											width: '200px',
											border: 'none',
											color: 'white',
											cursor: 'pointer',
										}}
										type='submit'
									>
										{loading ? 'sending...' : 'Ok'}
									</button>
								</div>
							</form>
						</p>
					</div>
				)}

				{notFound && (
					<div classes={classes['main-content']}>
						<h2 style={{ color: '#E1AD01' }}>
							We were not able to retrieve associated KYC information for the
							specified ID
						</h2>
						<button
							onClick={() => setNotFound(false)}
							style={{
								marginTop: '10px',
								padding: '5px',
								borderRadius: '5px',
								backgroundColor: 'red',
								width: '200px',
								border: 'none',
								color: 'white',
								cursor: 'pointer',
							}}
						>
							Try again?
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Main;
