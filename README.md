## Installation

Pour installer et démarrer le projet Vetolib, suivez ces étapes :

1. Clonez le répertoire du projet :
    ```
    git clone <url_du_projet>
    ```
2. Naviguez dans le répertoire du projet :
    ```
    cd vetolib
    ```
3. Installez les dépendances dans chaque dossier `api` & `frontend`:
    ```
    npm install
    ```
4. Démarrez l'application :

    Lancer le `server`

        ```
        npm start
        ```

    Lancer le `frontend` 
        ```
        npm run dev
        ```
Le server devrait maintenant être accessible à l'adresse `http://localhost:8000`.

## Configuration de la Base de Données

Vetolib utilise MySQL comme système de gestion de base de données. Voici comment configurer la base de données :

1. Lancer votre MairiaDb et utiliser ces requettes
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
            image VARCHAR(100),
            is_vaccinated BOOLEAN,
            last_visit DATE,
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
            image VARCHAR(100),
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
            animal_id INT,
            appointment_date DATETIME NOT NULL,
            status ENUM('planned', 'completed', 'cancelled') NOT NULL,
            reason VARCHAR(255),
            notes TEXT,
            FOREIGN KEY (cabinet_id) REFERENCES Cabinet(cabinet_id),
            FOREIGN KEY (animal_id) REFERENCES Animal(animal_id)
        );    
    ```
2. Créer les Procédures qui séront utilisés :

    ```sql
        --  Création des Procédures de la table Animal
        DELIMITER $$

        CREATE PROCEDURE `GetAllAnimals`()
        BEGIN
            SELECT * FROM animal;
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
            SELECT * FROM Cabinet;
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
            IN _password VARCHAR(255),
            IN _nom VARCHAR(100),
            IN _prenom VARCHAR(100),
            IN _user_type ENUM('admin', 'propriétaire', 'user')
        )
        BEGIN
            UPDATE User 
            SET email = _email, 
                password = _password, 
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

## Peuplement de la Base de Données

Pour peupler la base de données avec des données de test, utilisez les procédures stockées fournies. Voici comment les exécuter :

1. Créez les procédures dans MySQL en exécutant les commandes SQL sous la section "Création des Procédures".

    ```sql
    -- Procédure de création des données

    DELIMITER $$

    CREATE PROCEDURE `CreateCabinets`()
    BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 20 DO
        INSERT INTO Cabinet (cabinet_name, owner_id, address, city, phone_number, email, image, is_available, opening_hours, services_offered, created_at)
        VALUES (CONCAT('Cabinet ', i), FLOOR(1 + (RAND() * 4)), CONCAT('Adresse ', i), 'Ville', '0123456789', CONCAT('email', i, '@example.com'), 'image_url', TRUE, '09:00-17:00', 'Services', NOW());
        SET i = i + 1;
    END WHILE;
    END$$

    DELIMITER ;

    DELIMITER $$

    CREATE PROCEDURE `CreateAnimalsForCabinets`()
    BEGIN
    DECLARE cabinetCount, i INT DEFAULT 0;
    SELECT COUNT(*) INTO cabinetCount FROM Cabinet;
    SET i = 1;
    WHILE i <= cabinetCount DO
        INSERT INTO Animal (owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit, created_at)
        VALUES (i, 'AnimalName', 'AnimalType', 'Race', 'male', 2, 'image_url', TRUE, CURDATE(), NOW()),
            (i, 'AnimalName2', 'AnimalType', 'Race', 'femelle', 3, 'image_url', FALSE, CURDATE(), NOW()),
            (i, 'AnimalName3', 'AnimalType', 'Race', 'inconnu', 1, 'image_url', TRUE, CURDATE(), NOW()),
            (i, 'AnimalName4', 'AnimalType', 'Race', 'male', 4, 'image_url', FALSE, CURDATE(), NOW()),
            (i, 'AnimalName5', 'AnimalType', 'Race', 'femelle', 5, 'image_url', TRUE, CURDATE(), NOW());
        SET i = i + 1;
    END WHILE;
    END$$

    DELIMITER ;

    DELIMITER $$

    CREATE PROCEDURE `CreateUsersForAnimals`()
    BEGIN
    DECLARE animalCount, i INT DEFAULT 0;
    SELECT COUNT(*) INTO animalCount FROM Animal;
    SET i = 1;
    WHILE i <= animalCount DO
        INSERT INTO User (email, nom, prenom, password, phone, address, user_type, created_at)
        VALUES (CONCAT('user', i, '@example.com'), CONCAT('Nom', i), CONCAT('Prenom', i), 'password', '0123456789', 'Adresse', 'user', NOW());
        SET i = i + 1;
    END WHILE;
    END$$

    DELIMITER ;

```

2. Exécutez les procédures pour créer les cabinets, les animaux, et les utilisateurs :
    ```sql
    CALL CreateCabinets();
    CALL CreateAnimalsForCabinets();
    CALL CreateUsersForAnimals();
    ```

## Utilisation

Après avoir démarré l'application et peuplé la base de données, vous pouvez naviguer dans Vetolib pour :

- Chercher et consulter des cabinets vétérinaires.
- Ajouter et gérer des informations sur vos animaux.
- Prendre des rendez-vous avec des vétérinaires.
#
