export const messages = {
    // Messages pour la société
    user: {
        CREATE: {
            SUCCESS: "User créée avec succès",
            ERROR: "Erreur lors de la création del'user",
            ALREADY_EXISTS: "Un user avec ce nom existe déjà",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
        DELETE: {
            SUCCESS: "user supprimée avec succès",
            NOT_FOUND: "user non trouvée",
            ERROR: "Erreur lors de la suppression de l'user",
        },
        UPDATE: {
            SUCCESS: "user mise à jour avec succès",
            NOT_FOUND: "user introuvable",
            ERROR: "Erreur lors de la mise à jour de l'user",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
    },

    // Messages pour le département
    department: {
        CREATE: {
            SUCCESS: "Département créé avec succès",
            ERROR: "Erreur lors de la création du département",
            ALREADY_EXISTS: "Un département avec ce nom existe déjà",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
        DELETE: {
            SUCCESS: "Département supprimé avec succès",
            NOT_FOUND: "Département non trouvé",
            ERROR: "Erreur lors de la suppression du département",
        },
        UPDATE: {
            SUCCESS: "Département mis à jour avec succès",
            NOT_FOUND: "Département introuvable",
            ERROR: "Erreur lors de la mise à jour du département",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
    },
    depot: {
        CREATE: {
            SUCCESS: "Depot créé avec succès",
            ERROR: "Erreur lors de la création du Depot",
            ALREADY_EXISTS: "Un Depot avec ce nom existe déjà",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
        DELETE: {
            SUCCESS: "Depot supprimé avec succès",
            NOT_FOUND: "Depot non trouvé",
            ERROR: "Erreur lors de la suppression du Depot",
        },
        UPDATE: {
            SUCCESS: "Depot mis à jour avec succès",
            NOT_FOUND: "Depot introuvable",
            ERROR: "Erreur lors de la mise à jour du Depot",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
    },

    // Messages pour les rôles
    role: {
        CREATE: {
            SUCCESS: "Rôle créé avec succès",
            ERROR: "Erreur lors de la création du rôle",
            ALREADY_EXISTS: "Un rôle avec ce nom existe déjà",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
        DELETE: {
            SUCCESS: "Rôle supprimé avec succès",
            NOT_FOUND: "Rôle non trouvé",
            ERROR: "Erreur lors de la suppression du rôle",
        },
        UPDATE: {
            SUCCESS: "Rôle mis à jour avec succès",
            NOT_FOUND: "Rôle introuvable",
            ERROR: "Erreur lors de la mise à jour du rôle",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },
    },

    // Messages pour les agens
    agent: {
        CREATE: {
            SUCCESS: "Agent créé avec succès.",
            ALREADY_EXISTS: "Un agent avec l'email fourni existe déjà.",
            INVALID_FIELDS: "Champs de saisie invalides.",
            ERROR: "Une erreur s'est produite lors de la création de l'agent.",
        },
        DELETE: {
            SUCCESS: "Agent supprimé avec succès",
            NOT_FOUND: "Agent non trouvé",
            ERROR: "Erreur lors de la suppression de l'agent",
        },
        UPDATE: {
            SUCCESS: "Agent mis à jour avec succès",
            NOT_FOUND: "Agent introuvable",
            ERROR: "Erreur lors de la mise à jour de l'agent",
            INVALID_FIELDS: "Champ(s) invalide(s)",
        },

    },
    // Messages pour les agens
    credential: {
        CREATE: {
            INVALID_FIELDS: "Les champs fournis sont invalides. Veuillez vérifier les informations et réessayer.",
            ALREADY_EXISTS: "Un utilisateur avec ces identifiants existe déjà.",
            USERNAME_EXISTS: "Le nom d'utilisateur existe déjà. Veuillez en générer un autre.",
            SUCCESS: "Les identifiants ont été créés avec succès.",
            UPDATED_SUCCESS: "Les identifiants ont été mis à jour avec succès.",
            ERROR: "Une erreur est survenue lors de la création ou de la mise à jour des identifiants.",
        },
        GET: {
            NOT_FOUND: "Aucun identifiant trouvé pour cet utilisateur.",
            RETRIEVE_ERROR: "Une erreur est survenue lors de la récupération des identifiants.",
        },
    },

    contacts:{
        CREATE: {
            SUCCESS: "Contact créé avec succès.",
            ALREADY_EXISTS: "Un contact avec ce numéro de téléphone existe déjà.",
            INVALID_FIELDS: "Champs de saisie invalides.",
            ERROR: "Une erreur s'est produite lors de la création du contact.",
        },
        DELETE: {
            SUCCESS: "Contact supprimé avec succès.",
            NOT_FOUND: "Contact non trouvé.",
            ERROR: "Erreur lors de la suppression du contact.",
        },
        UPDATE: {
            SUCCESS: "Contact mis à jour avec succès.",
            NOT_FOUND: "Contact introuvable.",
            ERROR: "Erreur lors de la mise à jour du contact.",
            INVALID_FIELDS: "Champ(s) invalide(s).",
        },
        CONFIRMATION: {
            TITLE: "Ce contact existe déjà!",
            DESCRIPTION: "Un contact avec ce numéro de téléphone existe déjà.",
        },
    },

    events: {
        CREATE: {
          SUCCESS: "L'événement a été créé avec succès.",
          ERROR: "Une erreur s'est produite lors de la création de l'événement.",
          INVALID_FIELDS: "Les champs fournis ne sont pas valides.",
        },
      },
    // Ajoutez d'autres catégories pour les autres modules si nécessaire
};
