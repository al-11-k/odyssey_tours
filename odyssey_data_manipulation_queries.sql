

--------------------------------------------------------
-- Travelers

-- Select

SELECT traveler_id, first_name, last_name, email, phone_number FROM Travelers;

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

SELECT agent_id, first_name, last_name, email, phone_number FROM Travel_Agents;

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

SELECT date_purchaed, total_cost, traveler_id, agent_id FROM Travel_Packages;

-- Insert

INSERT INTO Travel_Packages (date_purchaed, total_cost, traveler_id, agent_id)
VALUES (
    :input_date_purchased,
    :input_total_cost,
    :input_traveler_id,
    :input_agent_id
);



--------------------------------------------------------
-- Bookings

-- Select

SELECT item_id, item_cost, quantity, package_id FROM Bookings;

-- Insert

INSERT INTO Bookings (item_id, item_cost, quantity, package_id)
VALUES (
    :input_item_id,
    :input_item_cost,
    :input_quantity,
    :input_package_id
);

-- Delete (again unsure just based it off the example)

DELETE FROM Bookings WHERE item_id = :item_id_entry_selected_from_list AND  package_id = package_id_entry_selected_from_list;

-- Update (still need to do this but i got tired lol)





--------------------------------------------------------
-- Items

-- Select (i think i did this right?? m)

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

SELECT item_type, description FROM Item_Types;

-- Insert

INSERT INTO Item_Types (description)
VALUES (
    :input_description
);