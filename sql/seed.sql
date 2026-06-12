INSERT INTO authors(name, email, bio)
VALUES 
('Alexelcapo', 'alexelcapo@gmail.com', 'Critico y amante de videojuegos'),
('Anton Ego', 'anton@gmail.com', 'Critico de comida'),
('Miranda Priestly', 'mirandapriestly@gmail.com', 'editora y critica de tendencias culturales globales');

INSERT INTO posts (author_id, title, content, published)
VALUES 
    (1, 'Por qué los videojuegos son arte', 'Un análisis profundo sobre las narrativas interactivas en la actualidad...', TRUE),
    (1, 'Mi opinión sincera sobre el nuevo GOTY', 'Contenido del post analizando el juego del año paso a paso...', FALSE),
    (2, 'La perspectiva de un crítico gastronómico', 'El trabajo de un crítico es sencillo en muchos aspectos. Arriesgamos poco...', TRUE);