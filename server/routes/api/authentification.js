const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const {generateToken } = require('./jwt');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const motDePasse = req.body.motDePasse;
    console.log(motDePasse);
    console.log(email, 'email');
    Users.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'Pas d\'utilisateur trouvé avec cet identifiant.' });
            }
            bcrypt.compare(motDePasse, user.motDePasse)
                .then(match => {
                    if (match) {
                        const token = generateToken(user);
                        res.json({ token, role: user.role, nom: user.nom ,id : user._id});
                    } else {
                        res.status(401).json({ message: 'Mot de passe incorrect.' });
                    }
                })
                .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la comparaison des mots de passe.' }));
        })
        .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.' }));
});


router.post('/inscription', (req, res) => {
    const { nom,prenom,email, motDePasse,role,statut,position,adresses} = req.body;
    Users.findOne({email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ error: 'adresse e-mail déjà utilisé' });
        }
        bcrypt.hash(motDePasse, 10) // 10 c'est le nombre de tours de hachage
          .then(hashedmotDePasse => {
            const newUser = {
              nom:nom,
              prenom:prenom,
              email: email,
              motDePasse: hashedmotDePasse,
              role:role,
              statut:statut,
              position:position,
              adresses:adresses
            };
            Users.create(newUser)
              .then(user => res.json({ msg: 'Utilisateur bien ajouté !' }))
          })
          .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' }));
      })
      .catch(err => res.status(400).json({ error: 'Une erreur s\'est produite lors de la vérification de l\'utilisateur' }));
  });

module.exports = router;