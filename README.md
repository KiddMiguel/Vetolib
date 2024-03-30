# VetoLib

VetoLib est une solution de gestion intégrée conçue pour les cliniques vétérinaires. Ce projet inclut une interface administrateur, une API, et un frontend pour les utilisateurs.

## Structure du projet

Le projet est divisé en trois dossiers principaux :

- `admin` : Contient le code de l'interface d'administration pour la gestion des utilisateurs, des animaux, et des rendez-vous.
- `api` : Contient le backend de l'application, qui fournit les endpoints API pour les opérations CRUD sur la base de données.
- `frontend` : Contient le code du frontend de l'application, utilisé par les clients pour interagir avec les services de VetoLib.

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
    FOREIGN KEY (owner_id) REFERENCES USER(user_id),
);    
```

### Procédures Stockées

```sql
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
    VALUES (_email, _nom, _prenom, _user_type, CURRENT_TIMESTAMP);
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


### Contribution
Pour contribuer à ce projet, veuillez suivre les bonnes pratiques de développement et soumettre une pull request avec vos modifications.

