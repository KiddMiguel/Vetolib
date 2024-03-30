# VetoLib

VetoLib est une solution de gestion intégrée conçue pour les cliniques vétérinaires. Ce projet inclut une interface administrateur, une API, et un frontend pour les utilisateurs.

## Structure du projet

Le projet est divisé en trois dossiers principaux :

- `admin` : Contient le code de l'interface d'administration pour la gestion des utilisateurs, des animaux, et des rendez-vous.
- `api` : Contient le backend de l'application, qui fournit les endpoints API pour les opérations CRUD sur la base de données.
- `frontend` : Contient le code du frontend de l'application, utilisé par les clients pour interagir avec les services de VetoLib.

Rendez vous aussi dans le dossier `admin` pour pouvoir lire le readme.md qui vous sera utile pour des tests.

## Installation

Pour configurer le projet VetoLib, suivez les étapes pour chaque partie du projet.

### Interface Administrateur

```bash
cd admin
npm install
npm run dev
```
Créer un fichier `.env`
```
    DB_HOST = "localhost"
    DB_NAME = "vetolib"
    DB_USER = "root"
    DB_PWD = ""
    DB_PORT = 3307
    SECRET_KEY = "secret_key"
```

### API

```bash
cd api
npm install
npm start
```
### Frontend

```bash
cd frontend
npm install
npm run dev
```

# Base de données
Vous trouverez ci-dessous les scripts nécessaires pour créer la base de données et ses tables.


### Création de la base de données

```sql
DROP DATABASE IF EXISTS Vetolib;
CREATE DATABASE Vetolib;
USE Vetolib;

-- Table User
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    nom VARCHAR(100), 
    prenom VARCHAR (100),
        image VARCHAR(100),
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(20), 
    address VARCHAR(255), 
    user_type ENUM('admin', 'propriétaire', 'user') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table Animal
CREATE TABLE Animal (
    animal_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    animal_name VARCHAR(50) NOT NULL,
    animal_type VARCHAR(50) NOT NULL,
    race VARCHAR(50),
    sex ENUM('male', 'femelle', 'inconnu'),
    age INT,
    image LONGTEXT,
    is_vaccinated BOOLEAN,
    last_visit VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (owner_id) REFERENCES User(user_id)
);

-- Table Cabinet
CREATE TABLE Cabinet (
    cabinet_id INT PRIMARY KEY AUTO_INCREMENT,
    cabinet_name VARCHAR(100) NOT NULL,
    owner_id INT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100), 
    image LONGTEXT,
    is_available BOOLEAN NOT NULL,
    opening_hours VARCHAR(255), 
    services_offered TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES User(user_id)
);

-- Table Appointment
CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    cabinet_id INT,
    owner_id INT, 
    animal_id INT,
    appointment_date DATE NOT NULL,
    status ENUM('Planifier','Confirmer','Annuler') NOT NULL,
    reason VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (cabinet_id) REFERENCES Cabinet(cabinet_id),
    FOREIGN KEY (animal_id) REFERENCES Animal(animal_id),
    FOREIGN KEY (owner_id) REFERENCES USER(user_id)
);    
```

### Procédures Stockées

```sql

USE Vetolib;
--  Création des Procédures de la table Animal
DELIMITER $$

CREATE PROCEDURE `GetAllAnimals`()
BEGIN
    SELECT * FROM animal ORDER BY animal.animal_id;
END$$

DELIMITER $$

CREATE PROCEDURE `AddAnimal`(IN _owner_id INT, IN _animal_name VARCHAR(50), IN _animal_type VARCHAR(50), IN _race VARCHAR(50), IN _sex ENUM('male', 'femelle', 'inconnu'), IN _age INT, IN _image VARCHAR(100), IN _is_vaccinated BOOLEAN, IN _last_visit DATE)
BEGIN
    INSERT INTO Animal (owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit, created_at) VALUES (_owner_id, _animal_name, _animal_type, _race, _sex, _age, _image, _is_vaccinated, _last_visit, CURRENT_TIMESTAMP);
END$$

CREATE PROCEDURE `EditAnimal`(IN _animal_id INT, IN _owner_id INT, IN _animal_name VARCHAR(50), IN _animal_type VARCHAR(50), IN _race VARCHAR(50), IN _sex ENUM('male', 'femelle', 'inconnu'), IN _age INT, IN _image VARCHAR(100), IN _is_vaccinated BOOLEAN, IN _last_visit DATE)
BEGIN
    UPDATE Animal SET owner_id = _owner_id, animal_name = _animal_name, animal_type = _animal_type, race = _race, sex = _sex, age = _age, image = _image, is_vaccinated = _is_vaccinated, last_visit = _last_visit WHERE animal_id = _animal_id;
END$$

CREATE PROCEDURE `GetAnimalById`(IN _animal_id INT)
BEGIN
    SELECT * FROM animal WHERE animal_id = _animal_id;
END$$


CREATE PROCEDURE `DeleteAnimal`(IN _animal_id INT)
BEGIN
    DELETE FROM animal WHERE animal_id = _animal_id;
END$$

DELIMITER ;


-- Prcedure Cabinet 
DELIMITER $$

CREATE PROCEDURE `GetAllCabinets`()
BEGIN
    SELECT * FROM Cabinet ORDER BY `cabinet`.`cabinet_id` DESC;
END$$

CREATE PROCEDURE `AddCabinet`(IN _cabinet_name VARCHAR(100), IN _owner_id INT, IN _address VARCHAR(255), IN _city VARCHAR(100), IN _phone_number VARCHAR(20), IN _image VARCHAR(100), IN _is_available BOOLEAN)
BEGIN
    INSERT INTO Cabinet (cabinet_name, owner_id, address, city, phone_number, image, is_available) VALUES (_cabinet_name, _owner_id, _address, _city, _phone_number, _image, _is_available);
END$$

CREATE PROCEDURE `GetCabinet`(IN _cabinet_id INT)
BEGIN
    SELECT * FROM Cabinet WHERE cabinet_id = _cabinet_id;
END$$

CREATE PROCEDURE `EditCabinet`(IN _cabinet_id INT, IN _cabinet_name VARCHAR(100), IN _owner_id INT, IN _address VARCHAR(255), IN _city VARCHAR(100), IN _phone_number VARCHAR(20), IN _image VARCHAR(100), IN _is_available BOOLEAN)
BEGIN
    UPDATE Cabinet SET cabinet_name = _cabinet_name, owner_id = _owner_id, address = _address, city = _city, phone_number = _phone_number, image = _image, is_available = _is_available WHERE cabinet_id = _cabinet_id;
END$$

CREATE PROCEDURE `DeleteCabinet`(IN _cabinet_id INT)
BEGIN
    DELETE FROM Cabinet WHERE cabinet_id = _cabinet_id;
END$$

DELIMITER ;


-- Procedure User
DELIMITER $$

CREATE PROCEDURE `GetAllUsers`()
BEGIN
    SELECT * FROM User;
END$$


CREATE PROCEDURE `CreateUser`(
    IN _email VARCHAR(100),
    IN _password VARCHAR(255),
    IN _nom VARCHAR(100),
    IN _prenom VARCHAR(100),
    IN _user_type ENUM('admin', 'propriétaire', 'user')
)
BEGIN
    INSERT INTO User (email, password, nom, prenom, user_type, created_at) 
    VALUES (_email, _password, _nom, _prenom, _user_type, CURRENT_TIMESTAMP);
END$$

CREATE PROCEDURE `GetUserById`(IN _user_id INT)
BEGIN
    SELECT * FROM User WHERE user_id = _user_id;
END$$

CREATE PROCEDURE `EditUser`(
    IN _user_id INT,
    IN _email VARCHAR(100),
    IN _nom VARCHAR(100),
    IN _prenom VARCHAR(100),
    IN _user_type ENUM('admin', 'propriétaire', 'user')
)
BEGIN
    UPDATE User 
    SET email = _email, 
        nom = _nom, 
        prenom = _prenom,
        user_type = _user_type
    WHERE user_id = _user_id;
END$$

CREATE PROCEDURE `DeleteUser`(IN _user_id INT)
BEGIN
    DELETE FROM User WHERE user_id = _user_id;
END$$

CREATE PROCEDURE `LoginUser`(IN _email VARCHAR(100))
BEGIN
    SELECT * FROM User WHERE email = _email;
END$$

DELIMITER ;
```

### Inserts de la Base de Données
Voici quelques exemples d'insertions pour pré-remplir votre base de données avec des données initiales.

```sql
USE Vetolib;

--- INSERTION DES UTILISATEURS 

INSERT INTO User (email, nom, prenom, image, password, phone, address, user_type)
VALUES 
('alexandre.dupont@example.com', 'Dupont', 'Alexandre', 'profile1.jpg', 'Pass1234!', '0655555555', '123 rue de la Liberté, 75001 Paris', 'user'),
('beatrice.leroy@example.com', 'Leroy', 'Béatrice', 'profile2.jpg', 'Pass1234!', '0655555554', '456 avenue de la République, 75002 Paris', 'propriétaire'),
('charles.moreau@example.com', 'Moreau', 'Charles', 'profile3.jpg', 'Pass1234!', '0655555553', '789 boulevard de l’Égalité, 75003 Paris', 'propriétaire'),
('danielle.bernard@example.com', 'Bernard', 'Danielle', 'profile4.jpg', 'Pass1234!', '0655555552', '321 rue de la Fraternité, 75004 Paris', 'user'),
('emmanuel.dubois@example.com', 'Dubois', 'Emmanuel', 'profile5.jpg', 'Pass1234!', '0655555551', '654 avenue de la Révolution, 75005 Paris', 'user'),
('fanny.fontaine@example.com', 'Fontaine', 'Fanny', 'profile6.jpg', 'Pass1234!', '0655555550', '987 boulevard du Progrès, 75006 Paris', 'user'),
('gerard.martin@example.com', 'Martin', 'Gérard', 'profile7.jpg', 'Pass1234!', '0655555549', '135 rue de l’Industrie, 75007 Paris', 'propriétaire'),
('helene.petit@example.com', 'Petit', 'Hélène', 'profile8.jpg', 'Pass1234!', '0655555548', '246 avenue de l’Information, 75008 Paris', 'propriétaire'),
('isabelle.robert@example.com', 'Robert', 'Isabelle', 'profile9.jpg', 'Pass1234!', '0655555547', '369 boulevard de l’Innovation, 75009 Paris', 'user'),
('jacques.richard@example.com', 'Richard', 'Jacques', 'profile10.jpg', 'Pass1234!', '0655555546', '481 rue du Futur, 75010 Paris', 'user');

--- INSERTION DES ANIMAUX 
INSERT INTO Animal (owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit)
VALUES 
(2, 'Bella', 'Chien', 'Labrador', 'femelle', 3, 'bella.jpg', TRUE, '2023-03-01'),
(2, 'Max', 'Chien', 'Berger Allemand', 'male', 5, 'max.jpg', TRUE, '2023-01-15'),
(6, 'Luna', 'Chat', 'Siamois', 'femelle', 2, 'luna.jpg', FALSE, '2023-02-20'),
(11, 'Oliver', 'Chat', 'Persan', 'male', 4, 'oliver.jpg', TRUE, '2023-04-05'),
(5, 'Leo', 'Lapin', 'Mini Lop', 'male', 1, 'leo.jpg', FALSE, '2023-03-17'),
(11, 'Milo', 'Chien', 'Beagle', 'male', 2, 'milo.jpg', TRUE, '2023-05-25'),
(2, 'Charlie', 'Chat', 'Maine Coon', 'male', 3, 'charlie.jpg', TRUE, '2023-06-10'),
(3, 'Daisy', 'Chien', 'Cocker Spaniel', 'femelle', 6, 'daisy.jpg', TRUE, '2023-07-22'),
(11, 'Molly', 'Chat', 'British Shorthair', 'femelle', 4, 'molly.jpg', FALSE, '2023-08-30'),
(5, 'Loki', 'Chien', 'Husky', 'male', 3, 'loki.jpg', TRUE, '2023-09-15');


---- INSERTION DE CABINET

INSERT INTO Cabinet (cabinet_name, owner_id, address, city, phone_number, email, image, is_available, opening_hours, services_offered)
VALUES 
('Clinique Vétérinaire des Lys', 1, '12 Rue des Fleurs', 'Paris', '0123456789', 'lys.vet@example.com', 'cabinet1.jpg', TRUE, '08:00-18:00', 'Consultation, Vaccination, Chirurgie'),
('Centre de Soin Animalier du Marais', 2, '35 Rue des Archives', 'Paris', '0123456798', 'marais.soin@example.com', 'cabinet2.jpg', TRUE, '09:00-17:00', 'Urgences, Soins dentaires, Toilettage'),
('Le Refuge des Animaux', 3, '47 Avenue des Animaux', 'Lyon', '0123456797', 'refuge.animaux@example.com', 'cabinet3.jpg', TRUE, '10:00-19:00', 'Adoption, Stérilisation, Education'),
('La Maison des Chiens et Chats', 4, '58 Boulevard des Compagnons', 'Marseille', '0123456796', 'maison.chienschats@example.com', 'cabinet4.jpg', FALSE, '09:00-17:00', 'Hébergement, Alimentation, Soins généraux'),
('Paradis des Félins', 5, '75 Rue du Chat Qui Dort', 'Toulouse', '0123456795', 'felins.paradis@example.com', 'cabinet5.jpg', TRUE, '08:00-20:00', 'Consultation féline, Toilettage, Comportement'),
('Santé Canine Centre', 6, '82 Route de la Truffe', 'Nice', '0123456794', 'sante.canine@example.com', 'cabinet6.jpg', TRUE, '07:00-19:00', 'Diététique, Soins sportifs, Rééducation'),
('Clinique des Oiseaux', 7, '103 Volière Avenue', 'Strasbourg', '0123456793', 'clinique.oiseaux@example.com', 'cabinet7.jpg', TRUE, '09:00-18:00', 'Soins aviaires, Ailes et plumes, Identification'),
('Centre Aquatique Vétérinaire', 8, '27 Allée des Coraux', 'Bordeaux', '0123456792', 'aqua.vet@example.com', 'cabinet8.jpg', TRUE, '11:00-21:00', 'Soins marins, Aquarium, Réadaptation'),
('Refuge des Reptiles', 9, '56 Terrarium Terrasse', 'Nantes', '0123456791', 'reptiles.refuge@example.com', 'cabinet9.jpg', FALSE, '10:00-18:00', 'Soins pour reptiles, Adoption, Sensibilisation'),
('Clinique Équine de la Plaine', 10, '88 Chemin des Cavaliers', 'Montpellier', '0123456790', 'equine.plaine@example.com', 'cabinet10.jpg', TRUE, '06:00-22:00', 'Soins équins, Pension, Entraînement');

```

