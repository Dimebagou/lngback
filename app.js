import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'; // Importe le module cors

import { generatePdf, sendPdfByEmail } from './pdfGenerator.js'

const app = express();
const port = 8080; //

app.use(cors());

// Configuration du middleware pour parser les données du formulaire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Traitement d’erreurs. Code copié depuis https://expressjs.com/fr/guide/error-handling.html
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Route POST pour envoyer l'email avec le PDF en pièce jointe
app.post('/api/send-email', async (req, res) => {
    const { formData, recipientEmail } = req.body;
    
    try {
        // Génère le PDF
        const pdfBytes = await generatePdf(formData);
        // Envoie le PDF par email
        await sendPdfByEmail(pdfBytes, recipientEmail);

        // Réponse JSON si tout s'est bien passé
        res.json({ message: 'PDF envoyé par email avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la génération ou de l\'envoi du PDF :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi du PDF par email.' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
