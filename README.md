# egopass-backend

Il s'agit de l'API d'une plateforme en ligne permettant l'achat en ligne des titres de voyage.

## Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Routes de l'API](#routes-de-lapi)
- [Modèles de données](#modèles-de-données)
- [Services](#services)
- [Utilitaires](#utilitaires)
- [Swagger](#swagger)

## Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/Ibikivan/egopass-backend.git
    cd egopass-backend

2. Installation des dépendence
    ### npm install

3. Configuration
    Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1h
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_password
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    FRONT_END_HOST=your_frontend_host
    SWAGGER_PROXY_HOST=your_swagger_proxy_host
    ROLE_ADMIN=ADMIN
    ROLE_SUPER_ADMIN=SUPER_ADMIN
    ROLE_AGENT=AGENT_RVA

4. Démarrage
    Pour démarrer le serveur en mode développement :
    ### npm run dev

    Pour démarrer le serveur en mode production :
    ### npm start

5. Structure du projet
    .env
    .gitignore
    package.json
    README.md
    server.js
    src/
      config/
        database.js
      controllers/
        authController.js
        egopassController.js
        travelersController.js
        userController.js
      index.js
      middlewares/
        authMiddleware.js
        autorizationMiddleware.js
        errorHandler.js
      models/
        Admin.js
        AgentRVA.js
        BankCard.js
        FreeEGoPASS.js
        index.js
        MobilMoney.js
        PayedEGoPASS.js
        Payement.js
        SuperAdmin.js
        Traveler.js
        User.js
      repositories/
        adminRepository.js
        agentRVARepository.js
        egopassRepository.js
        superAdminRepository.js
        travelersRepository.js
        userRepository.js
      routes/
        egopassRoutes.js
        travelersRoutes.js
        userRoutes.js
      services/
        authServices.js
        egopassServices.js
        travelerServices.js
        userServices.js
      swagger.js
      utils/
        emailService.js
        index.js
        qrCode.js
        smsService.js
        tokenBlacklist.js
      uploads/
        profilePictures/

6. Routes de l'API
    Utilisateurs
    POST /api/users/login : Connexion d'un utilisateur.
    POST /api/users/register : Inscription d'un nouvel utilisateur.
    GET /api/users/profil : Récupération du profil de l'utilisateur connecté.
    GET /api/users/profil/:email : Récupération du profil d'un utilisateur par email.
    PATCH /api/users/update : Mise à jour du profil de l'utilisateur connecté.
    GET /api/users/logout : Déconnexion de l'utilisateur.
    POST /api/users/request-reset-password : Demande de réinitialisation de mot de passe.
    POST /api/users/verify-reset-code : Vérification du code de réinitialisation.
    POST /api/users/reset-password : Réinitialisation du mot de passe.
    POST /api/users/register-agent : Inscription d'un nouvel agent RVA.
    POST /api/users/register-admin : Inscription d'un nouvel administrateur.
    POST /api/users/register-super-admin : Inscription d'un nouveau super administrateur.
    eGoPASS
    POST /api/egopass/create : Création d'un eGoPASS.
    PATCH /api/egopass/update/:id : Mise à jour d'un eGoPASS.
    GET /api/egopass/get-free/:id : Récupération du QR Code d'un eGoPASS gratuit.
    GET /api/egopass/get-payed/:id : Récupération du QR Code d'un eGoPASS payé.
    GET /api/egopass/get-all : Récupération de tous les eGoPASS.
    GET /api/egopass/getall-userfree : Récupération de tous les eGoPASS gratuits activés.
    POST /api/egopass/authenticate : Authentification d'un eGoPASS gratuit.
    POST /api/egopass/disactivate : Désactivation d'un eGoPASS gratuit.
    DELETE /api/egopass/delete-free/:id : Suppression d'un eGoPASS gratuit.
    DELETE /api/egopass/delete-payed/:id : Suppression d'un eGoPASS payé.
    Voyageurs
    POST /api/travels/create : Création d'un voyageur.
    GET /api/travels/get/:id : Récupération d'un voyageur par ID.
    GET /api/travels/get-all : Récupération de tous les voyageurs.
    PATCH /api/travels/update/:id : Mise à jour d'un voyageur.
    DELETE /api/travels/delete/:id : Suppression d'un voyageur.

7. Utiliaires
    Email Service
    sendEmailOTP : Envoi d'un code OTP par email.
    SMS Service
    sendSMSOTP : Envoi d'un code OTP par SMS.
    Token Blacklist
    addTokenToBlacklist : Ajout d'un token à la liste noire.
    isTokenBlacklisted : Vérification si un token est dans la liste noire.
    QR Code
    generateQRCode : Génération d'un QR Code à partir d'un texte.
    Divers
    specializeData : Séparation des données en deux objets basés sur des clés spécifiées.
    generateResetCode : Génération d'un code OTP.
    ensureDirectoryExistence : Vérification et création d'un répertoire s'il n'existe pas.

8. Swagger
    L'API est documentée avec Swagger. Pour accéder à la documentation Swagger, démarrez le serveur et ouvrez l'URL suivante dans votre navigateur :

    http://localhost:3000/api/docs