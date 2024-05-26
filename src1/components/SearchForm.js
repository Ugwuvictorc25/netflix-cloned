import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext();

	const searchValue = React.useRef();

	React.useEffect(() => {
		searchValue.current.focus();
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	const searchCocktail = () => {
		setSearchTerm(searchValue.current.value);
	};

	return (
		<section className="section search">
			<form className="search-form" onSubmit={submitHandler}>
				<div className="form-control">
					<label htmlFor="name">serach your favourite cocktail</label>
					<input id="name" type="text" ref={searchValue} onChange={searchCocktail} autoComplete="off" />
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
