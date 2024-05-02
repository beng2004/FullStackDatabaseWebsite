--Example queries of our db schema

--gets all weigh ins for a specific goat –- 
SELECT *
FROM WEIGH_IN
WHERE Goat_id = 1888;

--Count of Weigh-ins for Each Goat--
SELECT Goat_id, COUNT(*) AS Weigh_in_count
FROM WEIGH_IN
GROUP BY Goat_id;

--gets all weigh ins between--
SELECT *
FROM WEIGH_IN
WHERE Weigh_in_date BETWEEN '2021-03-01' AND '2022-03-31';

--select all weigh ins – 
SELECT *
FROM WEIGH_IN;

--Select count of weights
SELECT COUNT(Weight) FROM WEIGH_IN;

--gets first weigh in for each goat – 
SELECT Goat_id, MIN(Weigh_in_date) AS First_Weigh_in_date
FROM WEIGH_IN
GROUP BY Goat_id;

--gets heaviest weight for each goat
SELECT Goat_id, MAX(CAST(Weight AS FLOAT)) AS Max_weight_date
FROM WEIGH_IN
GROUP BY Goat_id;

--Select all notes after certain date
SELECT * FROM NOTE WHERE Date_of_note > '2022-01-01';

--Select all male goats
SELECT * FROM GOAT WHERE Gender = 'Male';
