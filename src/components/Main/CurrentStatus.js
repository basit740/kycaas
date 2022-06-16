// import React, { useEffect, useState } from 'react';

// const CurrentStatus = () => {
// 	const [data, setData] = useState(false);

// 	// useEffect(() => {
// 	// 	const intervalId = setInterval(async () => {
// 	// 		//assign interval to a variable to clear it.

// 	// 		const response = await fetch(
// 	// 			`${
// 	// 				process.env.REACT_APP_API_URL
// 	// 			}customers/consentrequest/list?user_id=${localStorage.getItem(
// 	// 				'id'
// 	// 			)}&issuer_register_id=${localStorage.getItem(
// 	// 				'orgId'
// 	// 			)}&requester_register_id=${process.env.REACT_APP_COMP_REGISTER_ID}`
// 	// 		);

// 	// 		const result = await response.json();
// 	// 		console.log(result);

// 	// 		console.log('test data', data);

// 	// 		setData((prev) => {
// 	// 			return [...result.data];
// 	// 		});
// 	// 	}, process.env.REACT_APP_REFRESH_SECONDS);

// 	// 	return () => clearInterval(intervalId); //This is important
// 	// }, []);
// 	return (
// 		<div>
// 			{/* {data.map((item) => {
// 				return <p>{item.company_id}</p>;
// 			})} */}
// 			current status
// 		</div>
// 	);
// };

// export default CurrentStatus;
