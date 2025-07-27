// Global JavaScript for Come'Koom Academy

document.addEventListener('DOMContentLoaded', function () {

	// Initialize all components
	initScrollToTop();
	initAnimations();
	initFormValidation();
	initTooltips();
	initLazyLoading();
	initSmoothScrolling();

	// Add scroll to top button
	addScrollToTopButton();

	// Initialize Bootstrap components
	initBootstrapComponents();
});

// Scroll to Top Functionality
function initScrollToTop() {
	const scrollToTopBtn = document.querySelector('.scroll-to-top');

	if (scrollToTopBtn) {
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 300) {
				scrollToTopBtn.classList.add('show');
			} else {
				scrollToTopBtn.classList.remove('show');
			}
		});

		scrollToTopBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
}

// Add scroll to top button to the page
function addScrollToTopButton() {
	const scrollToTopBtn = document.createElement('button');
	scrollToTopBtn.className = 'scroll-to-top';
	scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
	scrollToTopBtn.setAttribute('aria-label', 'Retour en haut de page');
	document.body.appendChild(scrollToTopBtn);
}

// Animation on scroll
function initAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
			}
		});
	}, observerOptions);

	// Observe elements for animation
	const animatedElements = document.querySelectorAll('.card, .feature-card, .blog-card, .team-card');
	animatedElements.forEach(el => {
		observer.observe(el);
	});
}

// Form validation
function initFormValidation() {
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		form.addEventListener('submit', function (e) {
			const requiredFields = form.querySelectorAll('[required]');
			let isValid = true;

			requiredFields.forEach(field => {
				if (!field.value.trim()) {
					isValid = false;
					field.classList.add('is-invalid');
				} else {
					field.classList.remove('is-invalid');
				}
			});

			if (!isValid) {
				e.preventDefault();
				showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
			}
		});
	});
}

// Initialize Bootstrap tooltips
function initTooltips() {
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
}

// Lazy loading for images
function initLazyLoading() {
	const images = document.querySelectorAll('img[data-src]');

	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove('lazy');
				imageObserver.unobserve(img);
			}
		});
	});

	images.forEach(img => imageObserver.observe(img));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
	const links = document.querySelectorAll('a[href^="#"]');

	links.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});
}

// Initialize Bootstrap components
function initBootstrapComponents() {
	// Initialize all Bootstrap components
	if (typeof bootstrap !== 'undefined') {
		// Initialize popovers
		const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
		popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl);
		});

		// Initialize modals
		const modalTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="modal"]'));
		modalTriggerList.forEach(modalTriggerEl => {
			modalTriggerEl.addEventListener('click', function (e) {
				e.preventDefault();
				const targetModal = document.querySelector(this.getAttribute('data-bs-target'));
				if (targetModal) {
					const modal = new bootstrap.Modal(targetModal);
					modal.show();
				}
			});
		});
	}
}

// Notification system
function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
	notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
	notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

	document.body.appendChild(notification);

	// Auto remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.remove();
		}
	}, 5000);
}

// Loading state for buttons
function setLoadingState(button, isLoading) {
	if (isLoading) {
		button.disabled = true;
		button.innerHTML = '<span class="loading"></span> Chargement...';
	} else {
		button.disabled = false;
		button.innerHTML = button.dataset.originalText || 'Envoyer';
	}
}

// Form submission handler
function handleFormSubmission(form, successMessage = 'Message envoyé avec succès !') {
	const submitBtn = form.querySelector('button[type="submit"]');
	const originalText = submitBtn.innerHTML;

	setLoadingState(submitBtn, true);

	// Simulate form submission (replace with actual form handling)
	setTimeout(() => {
		setLoadingState(submitBtn, false);
		showNotification(successMessage, 'success');
		form.reset();
	}, 2000);
}

// Course card interaction
function initCourseCards() {
	const courseCards = document.querySelectorAll('.course-card');

	courseCards.forEach(card => {
		const button = card.querySelector('.btn');
		if (button) {
			button.addEventListener('click', function (e) {
				e.preventDefault();
				const courseTitle = card.querySelector('.card-title').textContent;
				showNotification(`Cours "${courseTitle}" ajouté à votre liste de souhaits !`, 'success');
			});
		}
	});
}

// Newsletter subscription
function initNewsletterSubscription() {
	const newsletterForm = document.querySelector('form[data-newsletter]');

	if (newsletterForm) {
		newsletterForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const email = this.querySelector('input[type="email"]').value;

			if (email) {
				showNotification('Merci de votre inscription à notre newsletter !', 'success');
				this.reset();
			}
		});
	}
}

// Search functionality
function initSearch() {
	const searchInput = document.querySelector('#searchInput');
	const searchResults = document.querySelector('#searchResults');

	if (searchInput && searchResults) {
		searchInput.addEventListener('input', function () {
			const query = this.value.toLowerCase();

			if (query.length > 2) {
				// Simulate search results
				const results = [
					{ title: 'HTML & CSS', url: '/courses/html-css' },
					{ title: 'JavaScript', url: '/courses/javascript' },
					{ title: 'React.js', url: '/courses/react' }
				].filter(item => item.title.toLowerCase().includes(query));

				displaySearchResults(results);
			} else {
				searchResults.innerHTML = '';
				searchResults.style.display = 'none';
			}
		});
	}
}

function displaySearchResults(results) {
	const searchResults = document.querySelector('#searchResults');

	if (results.length > 0) {
		searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="dropdown-item">
                <i class="fas fa-search me-2"></i>${result.title}
            </a>
        `).join('');
		searchResults.style.display = 'block';
	} else {
		searchResults.innerHTML = '<div class="dropdown-item text-muted">Aucun résultat trouvé</div>';
		searchResults.style.display = 'block';
	}
}

// Mobile menu toggle
function initMobileMenu() {
	const navbarToggler = document.querySelector('.navbar-toggler');
	const navbarCollapse = document.querySelector('.navbar-collapse');

	if (navbarToggler && navbarCollapse) {
		// Close mobile menu when clicking on a link
		const navLinks = navbarCollapse.querySelectorAll('.nav-link');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (window.innerWidth < 992) {
					navbarCollapse.classList.remove('show');
				}
			});
		});
	}
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function () {
	initCourseCards();
	initNewsletterSubscription();
	initSearch();
	initMobileMenu();

	// Add loading animation to page
	document.body.classList.add('loaded');
});

// Performance optimization
window.addEventListener('load', function () {
	// Remove loading states
	const loadingElements = document.querySelectorAll('.loading');
	loadingElements.forEach(el => el.classList.remove('loading'));

	// Preload critical images
	const criticalImages = [
		'/images/logo.png',
		'/images/code.jpg'
	];

	criticalImages.forEach(src => {
		const img = new Image();
		img.src = src;
	});
});

// Error handling
window.addEventListener('error', function (e) {
	console.error('JavaScript error:', e.error);
	showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js')
			.then(function (registration) {
				console.log('ServiceWorker registration successful');
			})
			.catch(function (err) {
				console.log('ServiceWorker registration failed');
			});
	});
} 