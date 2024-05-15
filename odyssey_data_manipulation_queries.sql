

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

SELECT date_purchaed AS Date Purchased,
    total_cost AS Total Cost,
    traveler_id AS Traveler ID, 
    agent_id AS Agent ID
FROM Travel_Packages;


-- Select to populate the Agent dropdown search and sort them alphabetically

SELECT agent_id, first_name, last_name FROM Travel_Agents ORDER BY last_name ASC;


-- Select to populate the Traveler dropdown search and sort them alphabetically

SELECT traveler_id, first_name, last_name FROM Travelers ORDER BY last_name ASC;


-- Insert

INSERT INTO Travel_Packages (date_purchaed, total_cost, traveler_id, agent_id)
VALUES (
    :input_date_purchased,
    :input_total_cost,
    :input_traveler_id_selected_dropdown,
    :input_agent_id_selected_dropdown
);



--------------------------------------------------------
-- Bookings

-- Select

SELECT booking_id AS Booking ID,
    item_id AS Item ID, 
    item_cost AS Item Cost, 
    quantity AS Quantity, 
    package_id AS Package ID
FROM Bookings;

-- Select to populate the Travel Packages dropdown search

--??????


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