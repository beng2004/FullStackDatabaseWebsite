# Goat Database Project

## Introduction

This project aims to create a comprehensive database system for managing goat data. It includes tables for storing data on goats, their weights, traits, notes, and more. The schema is designed to organize and track various aspects of goat management efficiently.

## Schema

The schema consists of several tables:

The schema consists of several tables:

1. **GOAT**:
   - The GOAT table represents individual goats within the database.
   - Attributes include Goat_id (unique identifier), Gender, Birth_date, and Breed.
   - GOAT serves as the primary entity for storing basic information about each goat in the system.

2. **WEIGH_IN**:
   - The WEIGH_IN table stores data related to weigh-ins of goats.
   - Attributes include Weigh_in_date, Weight, and Goat_id.
   - Each record represents a specific weigh-in event for a goat, allowing the tracking of weight changes over time.

3. **NOTE**:
   - The NOTE table contains notes recorded for individual goats.
   - Attributes include Goat_id, Date_of_note, and Note.
   - Notes provide additional information or observations about specific goats, aiding in their management and tracking.

4. **GOAT_ACTIVITY**:
   - The GOAT_ACTIVITY table records various activities of goats during sessions.
   - Attributes include Session_id, Goat_id, Activity_code, Activity_date, is_exported, and is_deleted.
   - This table facilitates the tracking of different activities carried out by goats during specific sessions, providing valuable insights into their behavior and performance.

## Data Import

The schema provides instructions for importing data from CSV files into respective tables using the `\copy` command.

## Data Transformation

The schema includes SQL queries for transforming data, such as creating derived tables like `GOAT_ACTIVITY`, `WEIGH_IN`, and `NOTE` based on the original tables.

## Queries

Several sample queries are provided to retrieve and analyze data, including:

- Getting all weigh-ins for a specific goat.
- Counting weigh-ins for each goat.
- Retrieving weigh-ins within a specified date range.
- Obtaining basic statistics on weigh-in data.
- Finding the first weigh-in date for each goat.
- Identifying the heaviest weight recorded for each goat.
- Selecting notes created after a certain date.
- Filtering male goats from the database.

## Instructions

1. Execute the `schema.sql` file in your PostgreSQL database to create the necessary tables and schema.
2. Properly name your csvs and they will be auto imported into our schema.
3. Execute the provided SQL queries to transform data and perform analysis as needed.
4. Front end coming soon!

## Contributors

- Zack O'Rourke
  - Email: zorourke14@gmail.com
  - April 2024
- Ben Guerrieri
  - Email: guerrib2@tcnj.edu
  - April 2024
    
## License

This project is licensed under the [MIT License](LICENSE).
