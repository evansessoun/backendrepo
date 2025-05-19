-- Insert a user into the account table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n')

--Update user's account type from default 'Client' to 'Admin'
UPDATE account SET account_type = 'Admin'


-- Deleting a user from the account table
DELETE FROM account WHERE account_id = 1

-- REPLACE  GM HUMMER description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10

-- Using INNER JOIN
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification
ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport'

-- Update Image and Thumbnail path to include /vehicles
UPDATE inventory
SET inv_image = REPLACE(inv_image,'/images','/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail,'/images','/images/vehicles')
