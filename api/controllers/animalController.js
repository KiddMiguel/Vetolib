// const pool = require('../databases/database');
const pool = require('../databases/database');

exports.getAllAnimals = async(req, res) => {
    try {
        const connexion = await pool.getConnection();
        const resultat = await connexion.query("CALL GetAllAnimals()");
        res.status(200).json(resultat[0]);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des animaux", error });
    }
};
exports.addAnimal = async(req, res) => {
    const { owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit } = req.body;
    try {
        const connexion = await pool.getConnection();
        await connexion.query("CALL AddAnimal(?, ?, ?, ?, ?, ?, ?, ?, ?)", [owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit]);
        res.status(201).json({ message: 'Animal ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de l'animal", error });
    }
};

exports.editAnimal = async(req, res) => {
    const animal_id = req.params.id;
    const { owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit } = req.body;
    try {
        const connexion = await pool.getConnection();
        await connexion.query("CALL EditAnimal(?,?, ?, ?, ?, ?, ?, ?, ?, ?)", [animal_id, owner_id, animal_name, animal_type, race, sex, age, image, is_vaccinated, last_visit]);
        res.status(200).json({ message: 'Animal mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'animal", error });
    }
};

exports.getAnimalById = async(req, res) => {
    const animal_id = req.params.id; // Modifié pour utiliser params au lieu de body
    try {
        const connexion = await pool.getConnection();
        const result = await connexion.query("CALL GetAnimalById(?)", [animal_id]);
        if (result[0].length > 0) {
            res.status(200).json(result[0][0]);
        } else {
            res.status(404).json({ message: 'Animal non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'animal", error });
    }
};


exports.deleteAnimal = async(req, res) => {
    const animal_id = req.params.id; // Modifié pour utiliser params au lieu de body
    try {
        const connexion = await pool.getConnection();
        await connexion.query("CALL DeleteAnimal(?)", [animal_id]);
        res.status(200).json({ message: 'Animal supprimé avec succès' });
        } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'animal", error });
        }
};