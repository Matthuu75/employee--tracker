
-- Insert data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 1),
  ('Alice', 'Williams', 2, 3);

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 100000, 1),
  ('Salesperson', 50000, 2),
  ('Engineer', 75000, 3);

-- Insert data into the departments table
INSERT INTO departments (name)
VALUES
  ('Management'),
  ('Sales'),
  ('Engineering');
