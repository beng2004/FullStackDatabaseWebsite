DROP TABLE IF EXISTS GOAT;
CREATE TABLE GOAT(
	Goat_id integer primary key,
	Gender varchar(20) NOT NULL default '',
	Birth_date timestamp,
	Breed varchar(20) NOT NULL default '',
	Cohort_id integer,	
	FOREIGN KEY (Cohort_id) REFERENCES COHORT (Cohort_id)
);
DROP TABLE IF EXISTS WEIGH_IN;
CREATE TABLE WEIGH_IN(
	Weigh_in_date timestamp primary key,
	Weight varchar(20) NOT NULL default '',
	Goat_id integer,
	FOREIGN KEY (Goat_id) REFERENCES GOAT (Goat_id)
);
DROP TABLE IF EXISTS NOTE;
	CREATE TABLE NOTE (
	Goat_id integer NOT NULL,
	Date_of_note timestamp,
	Note varchar(30) NOT NULL,
	primary key( Goat_id, Date_of_note),
	FOREIGN KEY (Goat_id) REFERENCES GOAT (Goat_id)

);
DROP TABLE IF EXISTS COHORT;
CREATE TABLE COHORT (
	Cohort_id integer primary key,
	Cohort_name varchar(20),
);

-- \copy GOAT from 'CSV/Goat.csv' WITH DELIMITER ',' CSV HEADER; --
