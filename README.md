# Todo List Test - React & NestJS

## Introduction

Ce projet est une application de liste de tâches construite avec un frontend React et un backend NestJS. Elle utilise une base de données MySQL pour stocker les tâches. Le but de ce test était de compléter les fonctionnalités manquantes comme la création, la modification et la suppression des tâches.

## Fonctionnalités implémentées

### Backend (NestJS)

1. **Création d'une tâche** :

   - Implémentée dans le contrôleur `TaskController` à l'aide de l'endpoint `POST /tasks`.
   - Implémentée dans le repository `TaskRepository` la méthode save pour sauvergarder la nouvelle tâche dans la base de données => Utilisation de Prisma pour interagir avec la base de données MySQL.
   - Implémentée dans le use case la validation des données, la sauvegarde de données et la gestion d'erreur lors de la création d'une tâche.

2. **Modification d'une tâche** :
   - Implémentée dans le contrôleur `TaskController` via `PATCH /tasks/:id`. J'ai suivi le modèle d'implémentation de l'enpoint `GET /tasks` et `DELETE/tasks/:id`.
   - Implémentée dans le repository `TaskRepository` la méthode save pour sauvergarder ou modifier la nouvelle tâche dans la base de données => Utilisation de Prisma pour interagir avec la base de données MySQL.

### Frontend (React)

1. **Création de tâches** :

   - Ajout d'un champ de saisie pour ajouter une nouvelle tâche.
   - Dynamisation du bouton "ajouter une tâche"
   - Validation côté client pour s'assurer que le nom de la tâche n'est pas vide.
   - Utilisation de l'API `POST` pour créer une tâche et rafraîchir la liste.

2. **Modification de tâches** :

   - Ajout d'un champ de saisie éditable pour modifier le nom d'une tâche.
   - L'édition est gérée de manière dynamique lors de la saisie.
   - Utilisation de l'API `PATCH` pour mettre à jour la tâche.

3. **Suppression de tâches** :
   - Utilisation de l'API `DELETE` pour supprimer une tâche de la liste.
   - Dynamisation de l'icône de suppression

## Choix Techniques

### 1. **Prisma pour la base de données** :

    - Prisma a été utilisé comme ORM pour simplifier les interactions avec MySQL. Il permet des migrations faciles et une gestion efficace des schémas.

### 2. **Gestion des états avec React** :

    - L'état des tâches est géré via `useState`. À chaque modification, suppression ou ajout, la liste des tâches est rafraîchie via un appel API.

### 3. **Utilisation des Hooks** :

    - `useEffect` est utilisé pour charger les données des tâches au montage du composant.
    - `useState` est utilisé pour gérer la nouvelle tâche à ajouter et les modifications des tâches existantes.

## Défis rencontrés

1. **Configuration de l'environnement de travail** :

   - La configuration de l'environnement de développement a nécessité une période d'apprentissage dédiée, notamment pour l'installation et la maîtrise de MySQL, Docker et Prisma. Étant novice avec ces technologies, j'ai investi du temps pour comprendre leurs fonctionnalités et leur intégration au sein du projet.

2. **Gestion des erreurs** :

   - J'ai mis en place une validation pour s'assurer que le nom de la tâche n'est pas vide lors de la création ou de la modificaion.
   - Les erreurs d'API sont gérées avec des messages d'erreur affichés à l'utilisateur.

## Améliorations possibles

1. **Tests unitaires** :
   - Ajouter des tests unitaires pour s'assurer que toutes les fonctionnalités fonctionnent correctement, tant pour le frontend que le backend.

## Conclusion

Ce projet m'a permis de mieux comprendre l'interaction entre un backend NestJS et un frontend React tout en gérant une base de données MySQL. J'ai apprécié l'aspect challenge, notamment avec Prisma et la gestion des tâches.
