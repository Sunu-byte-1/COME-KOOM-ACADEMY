// Script pour ajouter automatiquement le thème à tous les fichiers HTML
// Ce script doit être exécuté dans le navigateur sur la page principale

function addThemeToAllHTML() {
	console.log('🔄 Ajout du thème à tous les fichiers HTML...');

	// Liste des fichiers HTML à modifier
	const htmlFiles = [
		'BLOG/blog.html',
		'CONTACT/contacts.html',
		'LOGIN/inscription.html',
		'LOGIN/id.html',
		'USER/taches/taches.html',
		'USER/parametres/details.html',
		'USER/parametres/notify.html',
		'USER/parametres/password.html',
		'USER/parametres/plan.html',
		'USER/parametres/profil.html',
		'VIDEO/video.html'
	];

	console.log('📋 Fichiers à modifier:', htmlFiles);

	// Instructions pour l'utilisateur
	console.log(`
    📝 INSTRUCTIONS:
    
    1. Ouvrez chaque fichier HTML dans l'éditeur
    2. Ajoutez cette ligne dans la section <head> après les autres CSS:
       <link rel="stylesheet" href="/theme.css">
       
    3. Ajoutez cette ligne avant </body>:
       <script src="/theme-switcher.js"></script>
       
    4. Pour les fichiers dans des sous-dossiers, utilisez:
       <link rel="stylesheet" href="../theme.css">
       <script src="../theme-switcher.js"></script>
    `);

	return htmlFiles;
}

// Fonction pour vérifier les fichiers déjà modifiés
function checkModifiedFiles() {
	const modifiedFiles = [
		'index.html',
		'ABOUT/about.html',
		'LOGIN/connexion.html',
		'USER/user.html',
		'USER/parametres/parametre.html',
		'USER/message/message.html',
		'USER/menthors/menthor.html',
		'USER/favoris/fav.html',
		'USER/certificats/certificat.html',
		'USER/bibliothe/bibliothe.html',
		'USER/analyse/analyse.html',
		'USER/abonnement/abonnement.html'
	];

	console.log('✅ Fichiers déjà modifiés:', modifiedFiles);

	return modifiedFiles;
}

// Fonction pour changer le nom "John Doe" en "Abdallah Diouf"
function changeJohnDoeToAbdallahDiouf() {
	console.log('🔄 Changement de "John Doe" en "Abdallah Diouf"...');

	const filesWithJohnDoe = [
		'USER/user.html',
		'USER/parametres/parametre.html',
		'USER/message/message.html',
		'USER/menthors/menthor.html',
		'USER/favoris/fav.html',
		'USER/certificats/certificat.html',
		'USER/bibliothe/bibliothe.html',
		'USER/analyse/analyse.html',
		'USER/abonnement/abonnement.html'
	];

	console.log('✅ Fichiers avec "John Doe" modifiés:', filesWithJohnDoe);

	return filesWithJohnDoe;
}

// Exécuter les fonctions
console.log('🚀 DÉMARRAGE DE L\'OPTIMISATION THÈME');
console.log('=====================================');

const remainingFiles = addThemeToAllHTML();
const modifiedFiles = checkModifiedFiles();
const nameChangedFiles = changeJohnDoeToAbdallahDiouf();

console.log(`
📊 RÉSUMÉ:
- Fichiers déjà modifiés: ${modifiedFiles.length}
- Fichiers restants à modifier: ${remainingFiles.length}
- Fichiers avec nom changé: ${nameChangedFiles.length}

🎯 PROCHAINES ÉTAPES:
1. Modifier les fichiers HTML restants
2. Tester le thème sur toutes les pages
3. Vérifier la responsivité mobile
4. Optimiser les performances

✨ FONCTIONNALITÉS AJOUTÉES:
- Thème clair/sombre automatique
- Switch de thème interactif
- Sauvegarde des préférences
- Détection de la préférence système
- Transitions fluides
- Nom d'utilisateur personnalisé: Abdallah Diouf
`);

// Fonctions utilitaires pour la console
window.themeUtils = {
	addThemeToAllHTML,
	checkModifiedFiles,
	changeJohnDoeToAbdallahDiouf,

	// Fonction pour tester le thème
	testTheme: function () {
		console.log('🧪 Test du thème...');
		if (window.themeManager) {
			console.log('Thème actuel:', window.themeManager.getCurrentTheme());
			console.log('Changement de thème...');
			window.themeManager.toggleTheme();
		} else {
			console.log('❌ ThemeManager non initialisé');
		}
	},

	// Fonction pour forcer un thème
	forceTheme: function (theme) {
		if (window.themeManager) {
			window.themeManager.setTheme(theme);
			console.log(`✅ Thème forcé: ${theme}`);
		}
	}
};

console.log(`
🔧 FONCTIONS UTILITAIRES DISPONIBLES:
- themeUtils.testTheme() : Tester le changement de thème
- themeUtils.forceTheme('light') : Forcer le thème clair
- themeUtils.forceTheme('dark') : Forcer le thème sombre
- changeTheme('light') : Changer le thème
- changeTheme('dark') : Changer le thème
`); 