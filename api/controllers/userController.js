const db = require('../databases/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const resultat = await db.query("CALL GetAllUsers()");
        console.log(resultat);
        res.status(200).json(resultat[0]);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }
};

/**exports.createUser = async(req, res) => {
    const { nom, prenom, password, email, user_type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query("CALL CreateUser(?, ?, ?, ?, ?)", [email, hashedPassword, nom, prenom, user_type]);
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
    }
};**/

exports.createUser = async (req, res) => {
    const { nom, prenom, password, email, user_type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query("CALL CreateUser(?, ?, ?, ?, ?)", [email, hashedPassword, nom, prenom, user_type]);
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            token: token,
            user: {
                email: email,
                nom: nom,
                prenom: prenom,
                user_type: user_type
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
    }
};


exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const resultat = await db.query("CALL GetUserById(?)", [id]);
        console.log(resultat)
        if (resultat[0].length > 0) {
            res.status(200).json(resultat[0][0]);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    // Supposons que le corps de la requête inclut désormais 'nom' et 'prenom' au lieu de 'username'.
    const { nom, prenom, password, email, user_type, image, phone, address } = req.body;

    let hashedPassword = password;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        // Assurez-vous que l'ordre des paramètres correspond à celui attendu par votre procédure stockée ajustée.
        await db.query("CALL UpdateUser(?, ?, ?, ?, ?, ?, ?, ?)", [id, email, hashedPassword, nom, prenom, user_type, image, phone, address]);
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
    }
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("CALL DeleteUser(?)", [id]);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query('CALL LoginUser(?)', [email]);

        const users = result[0];
        if (users.length == 0) {
            return res.status(401).json({ error: "Utilisateur non existant" });
        }

        const user = users[0];
        const isSamePwd = await bcrypt.compare(password, user.password);

        if (!isSamePwd) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        if (user.user_type === "admin") {
            // Tu peux ajouter les données supplémentaires ici
            return res.json({ token: token, role: user.user_type, user: { user_id :user.user_id,  nom: user.nom, prenom: user.prenom, email: user.email,  address: user.address, user_type : user.user_type, image: user.image, phone: user.phone } });
        }

        // Pour un utilisateur non admin, tu renvoies simplement le token
        return res.json({ token: token, role: user.user_type, user: {user_id : user.user_id, nom: user.nom, prenom: user.prenom, email: user.email, address: user.address, user_type : user.user_type, image: user.image, phone: user.phone } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
