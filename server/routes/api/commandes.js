const express = require('express');
const router = express.Router();
const commandes = require('../../models/Commandes');
const jwtSecret = 'ma_cle_secrete'; 
const { verifyToken } = require('./jwt');

router.get('/', verifyToken, (req, res) => {
  commandes.find()
    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json({ nocommandesFound: 'Pas de commandes trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
  commandes.findById(req.params.id)
    .then(commande => res.json(commande))
    .catch(err => res.status(404).json({ commandeNotFound: 'commande non trouvé...' }));
});


router.post('/Createcommande', verifyToken, (req, res) => {
  commandes.create(req.body)
    .then(commande => res.json({ msg: 'commande bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter le commande' }));
});

router.put('/:id', verifyToken, (req, res) => {
  commandes.findByIdAndUpdate(req.params.id, req.body)
    .then(commande => res.json({ msg: 'commande bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du commande...' }));
});


router.delete('/:id', verifyToken, (req, res) => {
  commandes.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'commande supprimé avec succès' }))
    .catch(err => res.status(404).json({ commandeNotFound: 'commande non trouvé...' }));
});

module.exports = router;