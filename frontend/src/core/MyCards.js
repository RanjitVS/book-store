import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, Redirect } from "react-router-dom";

const MyCards = () => {
	const [data, setData] = useState({
		cvc: "",
		expiry: "",
		name: "",
		number: ""
	});
	const handleInputChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div id="PaymentForm">
			<Cards
				cvc={data.cvc}
				expiry={data.expiry}
				focus={data.focus}
				name={data.name}
				number={data.number}
			/>
			<form action="">
				<input
					type="number"
					name="number"
					placeholder="Card Number"
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="name"
					placeholder="Your Name"
					onChange={handleInputChange}
				/>
				<input
					type="date"
					name="expiry"
					placeholder="Expire Date"
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="cvc"
					placeholder="CVC"
					onChange={handleInputChange}
				/>
				 <Link to="/signin">
                    <button className="btn btn-outline-success">Pay</button>
                </Link>
			</form>
		</div>
	);
};

export default MyCards;