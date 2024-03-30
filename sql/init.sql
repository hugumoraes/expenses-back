CREATE TABLE public."user" (
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

