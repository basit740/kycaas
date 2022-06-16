import React, { useState } from 'react';
//import CurrentStatus from './CurrentStatus';

//import Page3 from '../Page3/Page3';

import classes from './Main.module.css';
const Main = () => {
	const [showForm, setShowForm] = useState(true);
	const [showTables, setShowTables] = useState(false);
	const [companyId, setCompanyId] = useState('');
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState([]);
	const [nextIsDisabled, setNextIsDisabled] = useState(true);

	//
	const [showAttr, setShowAttr] = useState(false);
	const [attrList, setAttrList] = useState([]);
	const [selectedAttr, setSelectedAttr] = useState([]);
	const [values, setValues] = useState([]);
	const [showFinal, setShowFinal] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		localStorage.setItem('userId', userId);
		localStorage.setItem('companyId', companyId);

		//const response  = await fetch('')

		console.log('executing again...');
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}customers/consentrequest/list?user_id=${userId}&issuer_register_id=${process.env.REACT_APP_COMP_REGISTER_ID}&requester_register_id=${companyId}`
		);

		const result = await response.json();
		console.log(result);
		setLoading(false);
		setShowForm(false);
		setShowTables(true);
		setList(result.data);
	};

	const enabler = (e) => {
		setNextIsDisabled(false);
	};

	const cancelHandler = (e) => {
		console.log('cancel handler function');
	};
	const nextHandler = async (e) => {
		setLoading(true);

		setShowTables(false);

		const response = await fetch(
			`http://54.191.179.53:8081/api/organizations/${process.env.REACT_APP_COMP_REGISTER_ID}/customers/${userId}/attribute/list`
		);

		const result = await response.json();
		console.log(result);
		setAttrList(result.data);
		console.log('next handler function');
		setShowAttr(true);
		setLoading(false);
	};

	const infoSubmitHandler = (e) => {
		e.preventDefault();
	};

	const permissionHandler = async (e) => {
		e.preventDefault();

		const newList = [];
		selectedAttr.map(async (attr) => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}organizations/${companyId}/customers/${userId}/${attr}/value`
			);

			const result = await response.json();

			const prevValues = values;

			const newObj = {};
			newObj[attr] = result.data;

			console.log(newObj);
			setValues((prev) => {
				return [...prev, newObj];
			});

			// prevValues[attr] = result.data;
			// setValues((prev) => {
			// 	return [...prevValues];
			// });
		});

		// const permittedValues = [];

		// setValues((prev) => {
		// 	return [...newList];
		// });

		// for (let i = 0; i < selectedAttr.length; i++) {
		// 	permittedValues[selectedAttr[i]] = newList[i];

		// 	//permittedValues.push(valObject);
		// }
		// console.log(permittedValues);

		setShowAttr(false);
		setShowFinal(true);
	};

	function getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	const getValue = (obj) => {
		const values = [];
		Object.keys(obj).forEach(function (key) {
			var val = obj[key];
			values.push(val);
			// use val
		});
		return values;
	};

	const attrSelector = (e) => {
		console.log(e.target.checked);

		if (e.target.checked === false) {
			const filtered = selectedAttr.filter((atr) => atr !== e.target.value);
			setSelectedAttr((prev) => {
				return [...filtered];
			});
		} else {
			setSelectedAttr((prev) => {
				return [...prev, e.target.value];
			});
		}
	};
	return (
		<div className={classes.main}>
			<div className={classes['main-content-container']}>
				{showForm && (
					<form onSubmit={submitHandler}>
						<input
							type='text'
							placeholder='company id'
							onChange={(e) => setCompanyId(e.target.value)}
						/>
						<input
							type='text'
							placeholder='user id'
							onChange={(e) => setUserId(e.target.value)}
						/>
						<button type='submit'>{loading ? 'loading...' : 'Submit'}</button>
					</form>
				)}
				{showTables && (
					<div classes={classes['main-content']}>
						<h3>The following organizaions requested your kyc info</h3>

						<table>
							{list.length === 0 && (
								<tbody>
									<tr>
										<td>No data found</td>
									</tr>
								</tbody>
							)}
						</table>
						<table>
							{list.length > 0 && (
								<tbody>
									<tr>
										<th>Serial Number</th>
										<th>Company Id</th>
										<th>User Id</th>
										<th>Organization Id</th>
										<th>Performed</th>
										<th>Perform Stamp</th>
									</tr>

									{list.map((item, index) => {
										if (item.performed === false) {
											return (
												<tr
													onClick={enabler}
													style={{ cursor: 'pointer' }}
													className='data-row'
												>
													<td>{index + 1}</td>
													<td>{item.company_id}</td>
													<td>{item.id}</td>
													<td>{item.kyc_manager_id}</td>
													<td>false</td>
													<td>{item.perform_stamp}</td>
												</tr>
											);
										}
									})}
								</tbody>
							)}
						</table>

						<div className='actions'>
							<button onClick={cancelHandler}>Cancel</button>
							<button
								disabled={nextIsDisabled}
								style={{
									background: nextIsDisabled ? 'gray' : 'blue',
								}}
								onClick={nextHandler}
							>
								Next
							</button>
						</div>
					</div>
				)}

				{showAttr && (
					<div classes={classes['main-content']}>
						<h3>Please select the informations that we can share</h3>

						<form onSubmit={infoSubmitHandler}>
							<table>
								<tbody>
									{attrList.length > 0 &&
										attrList.map((atr) => {
											return (
												<tr>
													<td>
														<input
															type='checkbox'
															id={atr}
															name={atr}
															value={atr}
															onChange={attrSelector}
														/>
														<label for={atr}> {atr}</label>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</form>
						<div className='actions'>
							<button onClick={permissionHandler}>Ok</button>
						</div>
					</div>
				)}

				{showFinal && (
					<div classes={classes['main-content']}>
						<h3>Permitted Values</h3>

						{!loading && (
							<table>
								<tbody>
									<tr>
										<th>Attribute Name</th>
										<th>Attribute Value</th>
									</tr>
									{values.map((v, index) => {
										return (
											<tr>
												<td>{getKeyByValue(v, getValue(v)[0])}</td>
												<td>{getValue(v)[0]}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
						{loading && <p>loading...</p>}
					</div>
				)}
			</div>
		</div>
	);
};

export default Main;
