CREATE TABLE public."user" (
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public."category" (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_color VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public."transaction" (
    transaction_id SERIAL PRIMARY KEY,
    transaction_name VARCHAR(255) NOT NULL,
    transaction_amount FLOAT NOT NULL,
    transaction_date DATE NOT NULL,
    user_id INT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public."user"(user_id),
    FOREIGN KEY (category_id) REFERENCES public."category"(category_id)
);

/* Insert data */
INSERT INTO public."user" (user_login, user_password, user_name)
VALUES  ('hugomoraes_@hotmail.com', '$2b$10$o3gCV52ICSVmOCWzW2AwZun8hPUCmbbXqYFrG4boC9Y9bomNQE7pu', 'Hugo Moraes Bonatto');

INSERT INTO public."category" (category_name, category_color)
VALUES  ('Food', '#FF0000'),
        ('Transport', '#00FF00'),
        ('Health', '#0000FF');

INSERT INTO public."transaction" (transaction_name, transaction_amount, transaction_date, user_id, category_id)
VALUES  ('Lunch', 20.00, '2021-01-01', 1, 1),
        ('Bus', 5.00, '2021-01-01', 1, 2),
        ('Medicine', 10.00, '2021-01-01', 1, 3);
