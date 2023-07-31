# Legal Notices Generator (Back-end)

## Description

Legal Notices Generator (LNG) est une application back-end qui travaille en conjonction avec le front-end ([https://github.com/Dimebagou/lngfront](https://github.com/Dimebagou/lngfront)) pour vous aider à générer des mentions légales pour votre site web. Le back-end prend en charge l'envoi du PDF par e-mail si l'utilisateur choisit d'utiliser cette fonctionnalité du front.

*Legal Notices Generator (LNG) is a back-end application that works in conjunction with the front-end ([https://github.com/Dimebagou/lngfront](https://github.com/Dimebagou/lngfront)) to help you generate legal notices for your website. The back-end supports sending the PDF via email if the user chooses to use this feature from the front-end.*

## Technologies Utilisées / Technologies Used

- Node.js
- Express
- PDFKit
- Nodemailer
- dotenv

## Pour Commencer / Getting Started

Suivez ces instructions pour obtenir une copie du projet sur votre machine locale à des fins de développement et de test.*

*Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.*

### Prérequis / Prerequisites

- Node.js (v14.x ou version supérieure / *or higher*)
- npm (v6.x ou version supérieure / *or higher*)

### Installation

#### 1. Clonez le dépôt sur votre machine locale / *Clone the repository to your local machine* :

````bash
 git clone https://github.com/Dimebagou/lngback.git
 cd lngback
````

#### 2. Installez les dépendances / *Install the dependencies* :

````bash
 npm install
````

#### 3. Configurez le .env / *Setting up Environment Variables (Gmail)* :

- Pour utiliser la fonctionnalité d'envoi d'e-mails du back-end de Legal Notices Generator (LNG), vous devez configurer les variables d'environnement pour un compte Gmail. Actuellement, l'application est configurée pour fonctionner uniquement avec Gmail.

- *To use the email functionality of the Legal Notices Generator (LNG) back-end, you need to set up environment variables for a Gmail account. Currently, the application is configured to work with Gmail only.*

  Voici comment configurer les variables d'environnement / *Here's how to set up the environment variables* :


  ````bash
   EMAIL=your_gmail_email
   PASSWORD=your_gmail_password
  ````
  Remplacez ton_email_gmail et ton_mot_de_passe_gmail par votre adresse e-mail et mot de passe Gmail réels. Pour assurer un accès sécurisé, veillez à activer l'option "Autoriser les applications moins sécurisées" dans les paramètres Gmail ou utilisez un mot de passe d'application pour l'authentification.

  Remarque : Veuillez faire preuve de prudence lors de l'utilisation de vos identifiants Gmail. Il est recommandé de créer un compte Gmail dédié à cette application pour des raisons de sécurité.

  Le back-end est maintenant prêt à utiliser votre compte Gmail pour envoyer les PDF générés par e-mail.

  *Replace your_gmail_email and your_gmail_password with your actual Gmail email and password. To ensure secure access, make sure to enable "less secure apps" in your Gmail settings or use an app password for authentication.*

  *Note: Please be cautious while using your Gmail credentials. Consider creating a dedicated Gmail account for this purpose to maintain security.*

  *Now, the back-end is ready to use your Gmail account for sending the generated PDFs via email.*

#### 4. Lancez le serveur de développement / *Run the development server* :
````bash
 npm start
````

Le back-end devrait maintenant être accessible. Une seule route est effective et avec la méthode POST : 

*The back-end should now be accessible. There is only one effective route with the POST method:*

[http://localhost:8080/api/send-email](http://localhost:8080/api/send-email).

## Comment Utiliser / How to Use

L'application Legal Notices Generator (LNG) permet aux utilisateurs de générer et d'envoyer un PDF de mentions légales en utilisant le formulaire sur le front-end ou en envoyant une requête POST avec un JSON au format approprié à l'aide d'un logiciel comme Postman.

*The Legal Notices Generator (LNG) application allows users to generate and send a PDF of legal notices using the form on the front-end or by sending a POST request with a JSON in the appropriate format using software such as Postman.*



Voici les données, en format JSON, attendues par la route [http://localhost:8080/api/send-email](http://localhost:8080/api/send-email) : 

*Here is the JSON format of data expected by the http://localhost:8080/api/send-email route:*

````json
{
  "formData": {
    "site_url": "https://example-website.com",
    "site_owner": "John Doe Enterprises",
    "publication_director": "John Doe",
    "siren": "123456789",
    "mail": "contact@example-website.com",
    "data_protection_officer": "Jane Smith",
    "data_protection_officer_mail": "privacy@example-website.com",
    "address": "123 Main Street",
    "postal_code": "12345",
    "city": "Anytown",
    "host_name": "Example Hosting Services",
    "host_address": "456 Hosting Avenue",
    "host_postal_code": "67890",
    "host_city": "Hosting City",
    "host_phone": "1800-123-4567",
    "privacy_policy_link": "https://example-website.com/privacy-policy",
    "terms_and_conditions_link": "https://example-website.com/terms-and-conditions",
    "courts_city": "Cityville",
    // The "contributors" and "credits" fields are optional
    // les champs contributeurs et credits sont optionnels
    "contributors": [
      {
        "job": "Motion Design Creation",
        "name": "Mary Johnson"
      }
    ],
    "credits": [
      {
        "name": "video",
        "source": "https://www.youtube.com/watch?v=ABC123 https://www.example-website.com/video-credits"
      },
      {
        "name": "image",
        "source": "https://www.example-website.com/image-credits"
      }
    ]
  },
  // This is the email to which the PDF is sent
  // ceci est le mail vers lequel est envoyé le PDF
  "recipientEmail": "john.smith@example.com"
}

````

## Contribution

Les contributions sont les bienvenues ! Si vous trouvez des problèmes ou avez des suggestions d'amélioration, n'hésitez pas à ouvrir une nouvelle issue ou à soumettre une pull request.

*Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open a new issue or submit a pull request.*

