import React from "react";

const List = ({ people }) => {
	return (
		<>
			{people.map((person) => {
				const { id, name, age, image, birthDayMonth } = person;
				return (
					<article
						key={id}
						className="person"
					>
						<img
							src={image}
							alt={name}
						/>
						<div>
							<h4>{name}</h4>
							<p>{age} years</p>
							<marquee
								className="marquee"
								scrolldelay="90"
							>
								{birthDayMonth}
							</marquee>
						</div>
					</article>
				);
			})}
		</>
	);
};

export default List;
