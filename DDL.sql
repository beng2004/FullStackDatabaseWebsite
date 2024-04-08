-- file: schema.sql
--
-- this is the original Gallagher Microsoft SQL schema, except:
--     replaced nvarchar with varchar
--     replaced datetime with timestamp
--
-- as a regression test, this file can be executed in psql:
--     \i schema.sql
--
-- John DeGood
-- degoodj@tcnj.edu
-- March 2024

DROP TABLE Animal;
CREATE TABLE Animal (
	animal_id integer primary key,
	lrid integer NOT NULL default 0,
	tag varchar(16) NOT NULL default '',
	rfid varchar(15) NOT NULL default '',
	nlis varchar(16) NOT NULL default '',
	is_new integer NOT NULL default 1,
	draft varchar(20) NOT NULL default '',
	sex varchar(20) NOT NULL default '',
	dob timestamp,
	sire varchar(16) NOT NULL default '',
	dam varchar(16) NOT NULL default '',
	breed varchar(20) NOT NULL default '',
	colour varchar(20) NOT NULL default '',
	weaned integer NOT NULL default 0 ,
	prev_tag varchar(10) NOT NULL default '',
	prev_pic varchar(20) NOT NULL default '',
	note varchar(30) NOT NULL default '',
	note_date timestamp,
	is_exported integer NOT NULL default 0,
	is_history integer NOT NULL default 0,
	is_deleted integer NOT NULL default 0,
	tag_sorter varchar(48) NOT NULL default '',
	donordam varchar(16) NOT NULL default '',
	whp timestamp,
	esi timestamp,
	status varchar(20) NOT NULL default '',
	status_date timestamp,
	overall_adg varchar(20) NOT NULL default '',
	current_adg varchar(20) NOT NULL default '',
	last_weight varchar(20) NOT NULL default '',
	last_weight_date timestamp,
	selected integer default 0,
	animal_group varchar(20) NOT NULL default '',
	current_farm varchar(20) NOT NULL default '',
	current_property varchar(20) NOT NULL default '',
	current_area varchar(20) NOT NULL default '', 
	current_farm_date timestamp,
	current_property_date timestamp,
	current_area_date timestamp,
	animal_group_date timestamp,
	sex_date timestamp,
	breed_date timestamp,
	dob_date timestamp,
	colour_date timestamp,
	prev_pic_date timestamp,
	sire_date timestamp,
	dam_date timestamp,
	donordam_date timestamp,
	prev_tag_date timestamp,
	tag_date timestamp,
	rfid_date timestamp,
	nlis_date timestamp,
	modified timestamp,
	full_rfid varchar(16) default '',
	full_rfid_date timestamp);

DROP TABLE NOTE1;
CREATE TABLE NOTE1 (
	animal_id integer NOT NULL,
	created timestamp,
	note varchar(30) NOT NULL,
	session_id integer NOT NULL,
	is_deleted integer default 0,
	is_alert integer default 0,
	primary key( animal_id, created ));

DROP TABLE SessionAnimalActivity;
CREATE TABLE SessionAnimalActivity (
	session_id integer NOT NULL,
	animal_id integer NOT NULL,
	activity_code integer NOT NULL,
	when_measured timestamp NOT NULL,
	latestForSessionAnimal integer default 1,
	latestForAnimal integer default 1,
	is_history integer NOT NULL default 0,
	is_exported integer NOT NULL default 0,
	is_deleted integer default 0,
	primary key( session_id, animal_id, activity_code, when_measured ));

DROP TABLE SessionAnimalTrait;
CREATE TABLE SessionAnimalTrait (
	session_id integer NOT NULL,
	animal_id integer NOT NULL,
	trait_code integer NOT NULL,
	alpha_value varchar(20) NOT NULL default '',
	alpha_units varchar(10) NOT NULL default '',
	when_measured timestamp NOT NULL,
	latestForSessionAnimal integer default 1,
	latestForAnimal integer default 1,
	is_history integer NOT NULL default 0,
	is_exported integer NOT NULL default 0,
	is_deleted integer default 0,
	primary key(session_id, animal_id, trait_code, when_measured));

DROP TABLE PicklistValue;
CREATE TABLE PicklistValue (
	picklistvalue_id integer primary key,
	picklist_id integer,
	value varchar(30));

-- read the CSV file into the table
\copy Animal from 'OGCSV/Animal.csv' WITH DELIMITER ',' CSV HEADER;

-- read the CSV file into the table
\copy Note from 'OGCSV/Note.csv' WITH DELIMITER ',' CSV HEADER;


-- read the CSV file into the table
\copy SessionAnimalTrait from 'OGCSV/SessionAnimalTrait.csv' WITH DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS NOTE;
DROP TABLE IF EXISTS WEIGH_IN;
DROP TABLE IF EXISTS GOAT_ACTIVITY;
DROP TABLE IF EXISTS GOAT;

CREATE TABLE GOAT AS
SELECT
    animal_id AS Goat_id,
    sex AS Gender,
    dob AS Birth_date,
    breed AS Breed
FROM Animal;

ALTER TABLE GOAT
ADD PRIMARY KEY (Goat_id);
--ADD CONSTRAINT fk_cohort_id FOREIGN KEY (Cohort_id) REFERENCES COHORT (Cohort_id);

CREATE TABLE GOAT_ACTIVITY AS
SELECT
    session_id as Session_id,
    animal_id as Goat_id,
    activity_code as Activity_code,
    when_measured as Activity_date,
    is_exported,
    is_deleted
FROM SessionAnimalActivity;

ALTER TABLE GOAT_ACTIVITY
ADD primary key(Session_id, Goat_id, Activity_code, Activity_date),
ADD CONSTRAINT fk_goat_id2 FOREIGN KEY (Goat_id) REFERENCES GOAT (Goat_id);

-- Copying data from SessionAnimalActivity table to WEIGH_IN table
CREATE TABLE WEIGH_IN AS
SELECT DISTINCT ON (animal_id, when_measured)
    when_measured AS Weigh_in_date,
    alpha_value AS Weight,
    animal_id AS Goat_id
FROM SessionAnimalTrait
WHERE (SessionAnimalTrait.trait_code = 53 or SessionAnimalTrait.trait_code = 357 or 
SessionAnimalTrait.trait_code = 436 or SessionAnimalTrait.trait_code = 393
or SessionAnimalTrait.trait_code = 381 or SessionAnimalTrait.trait_code = 
405) and SessionAnimalTrait.alpha_value != '0.0' and SessionAnimalTrait.alpha_value != '';

ALTER TABLE WEIGH_IN
--ADD PRIMARY KEY (Weigh_in_date, Goat_id),
ADD CONSTRAINT fk_goat_id FOREIGN KEY (Goat_id) REFERENCES GOAT (Goat_id);

-- Copying data from Note table to NOTE table
CREATE TABLE NOTE AS
SELECT
    animal_id AS Goat_id,
    note_date AS Date_of_note,
    note AS Note
FROM Animal;

ALTER TABLE NOTE
--ADD PRIMARY KEY (Goat_id, Date_of_note),
ADD CONSTRAINT fk_goat_id FOREIGN KEY (Goat_id) REFERENCES GOAT (Goat_id);
