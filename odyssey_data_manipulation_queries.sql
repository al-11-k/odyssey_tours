

--------------------------------------------------------
-- Travelers

-- Select

SELECT traveler_id AS Traveler ID,
    first_name AS First Name, 
    last_name AS Last Name, 
    email AS Email, 
    phone_number AS Phone Number
FROM Travelers;

-- Insert

INSERT INTO Travelers (first_name, last_name, email, phone_number)
VALUES (
    :input_first_name,
    :input_last_name,
    :input_email,
    :input_phone_number
);



--------------------------------------------------------
-- Travel_Agents

-- Select

SELECT agent_id AS Agent ID,
    first_name AS First Name, 
    last_name AS Last Name,
    email AS Email, 
    phone_number AS Phone Number 
FROM Travel_Agents;

-- Insert

INSERT INTO Travel_Agents (first_name, last_name, email, phone_number)
VALUES (
    :input_first_name,
    :input_last_name,
    :input_email,
    :input_phone_number
);


--------------------------------------------------------
-- Travel_Packages

-- Select

SELECT Travel_Packages.date_purchaed AS Date Purchased,
    Travel_Packages.total_cost AS Total Cost,
    Travel_Packages.description AS Description,
    concat(Travelers.first_name, ' ', Travelers.last_name) as Traveler Name, 
    concat(Travel_Agents.first_name, ' ', Travel_Agents.last_name) as Agent Name
FROM Travel_Packages
    INNER JOIN Travelers ON traveler_id = Travel_Packages.traveler_id;
    INNER JOIN Travel_Agents ON agent_id = Travel_Packages.agent_id;


-- Select to populate the Agent dropdown search and sort them alphabetically

SELECT agent_id, first_name, last_name FROM Travel_Agents ORDER BY last_name ASC;


-- Select to populate the Traveler dropdown search and sort them alphabetically

SELECT traveler_id, first_name, last_name FROM Travelers ORDER BY last_name ASC;


-- Insert

INSERT INTO Travel_Packages (date_purchaed, total_cost, traveler_id, agent_id)
VALUES (
    :input_date_purchased,
    :input_total_cost,
    :input_description,
    :input_traveler_id_selected_dropdown,
    :input_agent_id_selected_dropdown
);



--------------------------------------------------------
-- Bookings

-- Select

SELECT Bookings.booking_id AS Booking ID,
    Items.description AS Item Description
    Bookings.item_id AS Item ID, 
    Items.item_cost AS Item Cost, 
    Items.quantity AS Quantity,
    Travel_Packages.description AS Package Description
    package_id AS Package ID
FROM Bookings
    INNER JOIN Items ON item_id = Bookings.item_id
    INNER JOIN Travel_Agents ON package_id = Bookings.item_type;

-- Select to populate the Travel Packages dropdown search

SELECT package_id, description FROM Travel_Packages;


-- Select to populate the Items dropdown search

SELECT item_id, description FROM Items;


-- Insert

INSERT INTO Bookings (item_id, item_cost, quantity, package_id)
VALUES (
    :input_item_id_from_dropdown,
    :input_item_cost,
    :input_quantity,
    :input_package_id_from_dropdown
);

-- Delete

DELETE FROM Bookings WHERE item_id = :item_id_entry_selected_from_list AND  package_id = package_id_entry_selected_from_list;

-- Update

UPDATE Bookings SET item_cost = :costInput, quantity = :quantityInput WHERE item_id = :item_id_entry_selected_from_list AND  package_id = package_id_entry_selected_from_list;



--------------------------------------------------------
-- Items

-- Select

SELECT Items.item_id, cost, Item_Types.description, description AS item_type
FROM Items INNER JOIN Item_Types ON item_type = Item_Types.item_type


-- Select to populate drop-down menu

SELECT item_type, description FROM Item_Types;

-- Insert

INSERT INTO Items (cost, item_type, description)
VALUES (
    :input_cost,
    :drop_down_item_type,
    :description
);

--------------------------------------------------------
-- Item Types

-- Select

SELECT item_type As Item Type,
    description AS description
FROM Item_Types;

-- Insert

INSERT INTO Item_Types (description)
VALUES (
    :input_description
);