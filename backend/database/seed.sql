-- Seed data for Rental Prime

-- Categories
INSERT INTO categories (name) VALUES 
    ('Electronics'),
    ('Furniture'),
    ('Vehicles'),
    ('Real Estate'),
    ('Tools');

-- Pricing Plans
INSERT INTO pricing_plans (name, price, duration_in_days) VALUES
    ('Basic', 9.99, 30),
    ('Premium', 19.99, 30),
    ('Pro', 29.99, 30);

-- Note: For security reasons, we don't include user data with passwords in seed files
-- You can create admin users and test users through the application
