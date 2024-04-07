--gets all weigh ins for a specific goat –- 
SELECT *
FROM WEIGH_IN
WHERE Goat_id = <specific_goat_id>;

--Count of Weigh-ins for Each Goat--
SELECT Goat_id, COUNT(*) AS Weigh_in_count
FROM WEIGH_IN
GROUP BY Goat_id;

--gets all weigh ins between--
SELECT *
FROM WEIGH_IN
WHERE Weigh_in_date BETWEEN '2023-03-01' AND '2021-03-31';

--select all weigh ins – 
SELECT *
FROM WEIGH_IN;

--gets first weigh in for each goat – 
SELECT Goat_id, MIN(Weigh_in_date) AS First_Weigh_in_date
FROM WEIGH_IN
GROUP BY Goat_id;

--Retrieve all of the female notes --
SELECT N.Note_id, N.Goat_id, N.Date_of_note, N.Message
FROM NOTE N
JOIN GOAT G ON N.Goat_id = G.Goat_id
WHERE G.Gender = 'Female';

--Number of notes per goat --
SELECT N.Goat_id, COUNT(*) AS Note_Count
FROM NOTE N
GROUP BY N.Goat_id;
