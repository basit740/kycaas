import React, { useState, useRef } from 'react';
//import CurrentStatus from './CurrentStatus';

import classes from './Main.module.css';
const Main = () => {
	const [showMain, setShowMain] = useState(true);
	const [done, setDone] = useState(false);
	const [defaultAddr, setDefaultAddr] = useState(
		'0x9FAA8D9F8959e6CCCB234bdCA895d71cf30bdC84'
	);
	const [loading, setLoading] = useState(false);

	const defaultAddrRef = useRef();
	const companyNameRef = useRef();
	const companyAddrRef = useRef();
	const companyRegIDRef = useRef();

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();

		const reqBody = {
			address: defaultAddrRef.current.value,
			company_name: companyNameRef.current.value,
			company_address: companyAddrRef.current.value,
			register_id: 0,
		};

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}organizations/new`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reqBody),
			}
		);

		const result = await response.json();

		setLoading(false);
		setDone(true);
		setShowMain(false);
		console.log(result);
	};

	return (
		<div className={classes.main}>
			<div className={classes['main-content-container']}>
				{showMain && (
					<div classes={classes['main-content']}>
						<h3>New Company Registration</h3>
						<div className='form-section'>
							<form onSubmit={submitHandler}>
								<div className-='input-group'>
									<label>Address</label>
									<input type='text' value={defaultAddr} ref={defaultAddrRef} />
								</div>
								<div className-='input-group'>
									<label>Company Name</label>
									<input type='text' ref={companyNameRef} />
								</div>
								<div className-='input-group'>
									<label>Company Address</label>
									<input type='text' ref={companyAddrRef} />
								</div>
								<div className='input-group'>
									<label>Company Registration ID</label>
									<input type='text' ref={companyRegIDRef} />
								</div>

								<div className='form-actions'>
									<button type='submit'>
										{loading ? 'saving...' : 'Save'}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{done && (
					<div classes={classes['main-content']}>
						<h1 style={{ color: 'green' }}>
							New Company Registered Successfully
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default Main;
