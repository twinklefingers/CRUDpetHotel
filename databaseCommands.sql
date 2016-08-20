CREATE TABLE pets (
	id SERIAL PRIMARY KEY,
	name varchar(30),
	breed varchar(30),
	color varchar(20),
	owner_id integer
);

CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	first_name varchar(15),
	last_name varchar(25),
);


SELECT first_name,last_name, name, breed, color
FROM pets JOIN owners ON pets.owner_id = owners.id;

-- join pets.owner_id on owners primary key
