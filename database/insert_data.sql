\c compose_example_db

INSERT INTO tasks (title, description, completed)
SELECT 'Learn Docker', 'Understand the basics of Docker and Docker Compose.', FALSE
UNION ALL
SELECT 'Setup Development Environment', 'Install necessary tools and configure the environment.', TRUE
UNION ALL
SELECT 'Write Unit Tests', 'Create unit tests for the backend services.', FALSE
UNION ALL
SELECT 'Design UI', 'Design the user interface for the frontend application.', FALSE
UNION ALL
SELECT 'Deploy Application', 'Deploy the application to a cloud service.', FALSE
WHERE NOT EXISTS (SELECT 1 FROM tasks);
