// ===== GESTIONNAIRE DE THÈME =====

class ThemeManager {
	constructor() {
		this.currentTheme = localStorage.getItem('theme') || 'light';
		this.init();
	}

	init() {
		// Appliquer le thème sauvegardé
		this.applyTheme(this.currentTheme);

		// Créer le bouton de switch si il n'existe pas
		this.createThemeSwitch();

		// Écouter les changements de préférence système
		this.listenForSystemPreference();
	}

	createThemeSwitch() {
		// Vérifier si le switch existe déjà
		if (document.querySelector('.theme-switch')) return;

		// Créer le bouton de switch
		const themeSwitch = document.createElement('div');
		themeSwitch.className = 'theme-switch';
		themeSwitch.innerHTML = `
            <i class="fas fa-sun sun-icon"></i>
            <i class="fas fa-moon moon-icon"></i>
        `;

		// Ajouter l'événement de clic
		themeSwitch.addEventListener('click', () => {
			this.toggleTheme();
		});

		// Trouver un endroit approprié pour placer le switch
		const navbar = document.querySelector('.navbar-nav');
		const userMenu = document.querySelector('.dropdown-menu');
		const header = document.querySelector('header');

		if (navbar) {
			// Ajouter dans la navbar
			const navItem = document.createElement('li');
			navItem.className = 'nav-item d-flex align-items-center ms-3';
			navItem.appendChild(themeSwitch);
			navbar.appendChild(navItem);
		} else if (userMenu) {
			// Ajouter dans le menu utilisateur
			const menuItem = document.createElement('div');
			menuItem.className = 'dropdown-item d-flex align-items-center';
			menuItem.innerHTML = `
                <span class="me-2">Thème</span>
                ${themeSwitch.outerHTML}
            `;
			userMenu.appendChild(menuItem);
		} else if (header) {
			// Ajouter dans le header
			header.appendChild(themeSwitch);
		} else {
			// Ajouter dans le body en position fixe
			themeSwitch.style.position = 'fixed';
			themeSwitch.style.top = '20px';
			themeSwitch.style.right = '20px';
			themeSwitch.style.zIndex = '9999';
			document.body.appendChild(themeSwitch);
		}
	}

	toggleTheme() {
		const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
		this.applyTheme(newTheme);
		this.saveTheme(newTheme);

		// Animation de transition
		this.animateThemeChange();
	}

	applyTheme(theme) {
		this.currentTheme = theme;
		document.documentElement.setAttribute('data-theme', theme);

		// Mettre à jour l'icône du switch
		const sunIcon = document.querySelector('.sun-icon');
		const moonIcon = document.querySelector('.moon-icon');

		if (sunIcon && moonIcon) {
			if (theme === 'dark') {
				sunIcon.style.opacity = '0';
				moonIcon.style.opacity = '1';
			} else {
				sunIcon.style.opacity = '1';
				moonIcon.style.opacity = '0';
			}
		}
	}

	saveTheme(theme) {
		localStorage.setItem('theme', theme);
	}

	animateThemeChange() {
		// Ajouter une classe pour l'animation
		document.body.classList.add('theme-transitioning');

		// Retirer la classe après l'animation
		setTimeout(() => {
			document.body.classList.remove('theme-transitioning');
		}, 300);
	}

	listenForSystemPreference() {
		// Écouter les changements de préférence système
		if (window.matchMedia) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			mediaQuery.addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					// Seulement si l'utilisateur n'a pas choisi manuellement
					const newTheme = e.matches ? 'dark' : 'light';
					this.applyTheme(newTheme);
				}
			});
		}
	}

	// Méthode pour obtenir le thème actuel
	getCurrentTheme() {
		return this.currentTheme;
	}

	// Méthode pour forcer un thème
	setTheme(theme) {
		this.applyTheme(theme);
		this.saveTheme(theme);
	}
}

// ===== INITIALISATION =====

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
	// Initialiser le gestionnaire de thème
	window.themeManager = new ThemeManager();

	// Ajouter des styles pour la transition
	const style = document.createElement('style');
	style.textContent = `
        .theme-transitioning * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
    `;
	document.head.appendChild(style);
});

// ===== FONCTIONS UTILITAIRES =====

// Fonction pour changer le thème depuis la console
function changeTheme(theme) {
	if (window.themeManager) {
		window.themeManager.setTheme(theme);
	}
}

// Fonction pour obtenir le thème actuel
function getCurrentTheme() {
	if (window.themeManager) {
		return window.themeManager.getCurrentTheme();
	}
	return 'light';
}

// ===== EXPORT POUR UTILISATION EXTERNE =====
if (typeof module !== 'undefined' && module.exports) {
	module.exports = ThemeManager;
} 