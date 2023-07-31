import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export async function generatePdf(formData) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', margin: 30 });
        
        // Pipe the PDF content to a buffer
        const pdfChunks = [];
        doc.on('data', (chunk) => pdfChunks.push(chunk));
        doc.on('end', () => {
            const pdfBytes = Buffer.concat(pdfChunks);
            resolve(pdfBytes);
        });

        // Create the PDF content
        doc.pipe(fs.createWriteStream(`mentions_legales.pdf`));

        doc.fontSize(20).fillColor('#2F5373').font('fonts/Poppins-Bold.ttf').text('Mentions Légales');

        doc.moveDown(0.3);

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('1 – Édition du site');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text("En vertu de ", { continued: true })
            .fillColor("#c36")
            .text("l’article 6 de la loi n° 2004-575 du 21 juin 2004", { link: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164#LEGIARTI000042038977", continued: true, underline: true })
            .fillColor('#000000')
            .text(" pour la confiance dans l’économie numérique, il est précisé aux utilisateurs du site internet ", { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
            .fillColor('#000000')
            .text(" l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi : ", { link: null, underline: false });

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Propriétaire du site : ${formData.site_owner} - Contact : ${formData.mail} - Adresse`)

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Identification de l’entreprise : ${formData.site_owner} - SIREN : ${formData.siren}`)

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Adresse postale : ${formData.address}, ${formData.postal_code} ${formData.city} - `, { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.terms_and_conditions_link}`, { link: `${formData.terms_and_conditions_link}`, underline: true, continued: false })

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Directeur de la publication : ${formData.publication_director}`)

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Hébergeur : ${formData.host_name} - ${formData.host_address} - ${formData.host_postal_code} ${formData.host_city} - Téléphone : ${formData.host_phone}`)

        doc.moveDown(0.3);

        doc.fontSize(10).fillColor('#000000')
            .text(`Délégué à la protection des données : ${formData.data_protection_officer} - ${formData.data_protection_officer_mail}`)

        doc.moveDown(0.3);

        formData.contributors?.length > 0 && (
            doc.fontSize(10).fillColor('#000000').text(`Autres contributeurs : `).moveDown(0.3)
        )

        formData.contributors?.length > 0 && formData.contributors.map((contributor) => (
            doc.fontSize(10).fillColor('#000000')
                .text(`${contributor.job} - ${contributor.name}`)
                .moveDown(0.3)
        ))

        formData.credits?.length > 0 && (
            doc.fontSize(10).fillColor('#000000').text(`Crédits : `).moveDown(0.3)
        )

        formData.credits?.length > 0 && formData.credits.map((credit) => (
            doc.fontSize(10).fillColor('#000000')
                .text(`${credit.name} - ${credit.source}`)
                .moveDown(0.3)
        ))

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('2 – Propriété intellectuelle et contrefaçons.');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`${formData.site_owner} est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.`)

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de ${formData.site_owner}.`)

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles `, { continued: true })
            .fillColor("#c36")
            .text("L.335-2 et suivants du Code de Propriété Intellectuelle", { link: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032655082", continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('3 – Limitations de responsabilité.');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`${formData.site_owner} ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site `, { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.site_url}.`, { link: `${formData.site_url}`, continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`${formData.site_owner} décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur `, { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.site_url}.`, { link: `${formData.site_url}`, continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`${formData.site_owner} s’engage à sécuriser au mieux le site `, { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
            .fillColor('#000000')
            .text(`, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.`, { link: null, underline: false, continued: false })

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Des espaces interactifs (espace contact ou commentaires) sont à la disposition des utilisateurs. ${formData.site_owner} se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.`)

        doc.moveDown(0.3);

        doc.addPage();

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Le cas échéant, ${formData.site_owner} se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …).`)

        doc.moveDown(0.3);

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('4 – CNIL et gestion des données personnelles.');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text("Conformément aux dispositions de ", { continued: true })
            .fillColor("#c36")
            .text(`la loi 78-17 du 6 janvier 1978 modifiée`, { link: `https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460`, continued: true, underline: true })
            .fillColor('#000000')
            .text(", l’utilisateur du site ", { link: null, underline: false, continued: true })
            .fillColor("#c36")
            .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
            .fillColor('#000000')
            .text(` dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données : ${formData.data_protection_officer} – ${formData.data_protection_officer_mail}.`, { link: null, underline: false });

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Pour plus d’informations sur la façon dont nous traitons vos données (type de données, finalité, destinataire…), lisez notre `, { continued: true })
            .fillColor("#c36")
            .text(`Politique de confidentialité.`, { link: `${formData.privacy_policy_link}`, continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('5 – Liens hypertextes et cookies');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("Le site ", { continued: true })
        .fillColor("#c36")
        .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
        .fillColor('#000000')
        .text(" contient des liens hypertextes vers d’autres sites et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers ", { link: null, underline: false, continued: true })
        .fillColor("#c36")
        .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("La navigation sur le site ", { continued: true })
        .fillColor("#c36")
        .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
        .fillColor('#000000')
        .text(" est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur.", { link: null, underline: false, continued: false })

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("Un « cookie » est un fichier de petite taille qui enregistre des informations relatives à la navigation d’un utilisateur sur un site. Les données ainsi obtenues permettent d’obtenir des mesures de fréquentation, par exemple.")

        doc.moveDown(0.3);
        
        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("Vous avez la possibilité d’accepter ou de refuser les cookies en modifiant les paramètres de votre navigateur. Aucun cookie ne sera déposé sans votre consentement.")

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("Les cookies sont enregistrés pour une durée maximale de 13 mois.")
        
        doc.moveDown(0.3);   
        
        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
            .text(`Pour plus d’informations sur la façon dont nous faisons usage des cookies, lisez notre `, { continued: true })
            .fillColor("#c36")
            .text(`Politique de confidentialité.`, { link: `${formData.privacy_policy_link}`, continued: false, underline: true })

        doc.moveDown(0.3);

        doc.fontSize(15).font('fonts/Poppins-Bold.ttf').fillColor('#000000').text('6 – Droit applicable et attribution de juridiction.');

        doc.moveDown(0.3);

        doc.fontSize(10).font('fonts/Poppins-Regular.ttf').fillColor('#000000')
        .text("Tout litige en relation avec l’utilisation du site ", { continued: true })
        .fillColor("#c36")
        .text(`${formData.site_url}`, { link: `${formData.site_url}`, continued: true, underline: true })
        .fillColor('#000000')
        .text(` est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de ${formData.courts_city}.`, { link: null, underline: false, continued: false })

        // End and finalize the PDF
        doc.end();
    });
}


export async function sendPdfByEmail(pdfBytes, recipientEmail) {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // PDF Attachment
    const attachment = {
        filename: 'mentions_legales.pdf',
        content: pdfBytes,
    };

    // Email options
    const mailOptions = {
        from: 'bersonvictor@gmail.com',
        to: recipientEmail,
        subject: 'Votre PDF de Mentions Légales par LNG',
        text: 'Bonjour, vous trouverez en pièce jointe les mentions légales pour votre site, générées par Legal Notices Generator. \n\nMerci d\'avoir utilisé notre service.',
        attachments: [attachment],
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}


