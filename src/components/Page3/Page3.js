import React, { useState } from 'react';
import './Page3.css';

const Page3 = () => {
	const [showFirstStep, setShowFirstStep] = useState(true);
	const [nextIsDisabled, setNextIsDisabled] = useState(false);
	const [showSecondStep, setShowSecondStep] = useState(false);

	return (
		<>
			{/* //////////////////    PAGE 3   ////////////////// */}

			{showFirstStep && (
				<div className='main-content'>
					<h3>The following organizaion requested your KYC information</h3>
					{/* <CurrentStatus /> */}
					<h1>Current Status data here</h1>

					<div className='actions'>
						<button>Cancel</button>
						<button
							disabled={nextIsDisabled ? true : false}
							className={nextIsDisabled ? '' : 'disable'}
						>
							Next
						</button>
					</div>
				</div>
			)}

			{showSecondStep && <p>for second step</p>}
		</>
	);
};

export default Page3;
