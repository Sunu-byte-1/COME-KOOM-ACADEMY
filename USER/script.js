document.addEventListener("DOMContentLoaded", function () {
	const bellIcon = document.getElementById("bell-icon");
	const body = document.body;

	const menuToggle = document.createElement("div");
	menuToggle.className = "menu-toggle";
	menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
	body.appendChild(menuToggle);

	const menuOverlay = document.createElement("div");
	menuOverlay.className = "menu-overlay";
	body.appendChild(menuOverlay);

	const sideBar = document.querySelector(".barre");

	menuToggle.addEventListener("click", function () {
		sideBar.classList.toggle("show-menu");
		menuOverlay.classList.toggle("active");
	});

	// Frmtr mn lat lors clock sur link le menu latéral quand on clique sur un lien
	const menuLinks = document.querySelectorAll(".barre a");
	menuLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			if (window.innerWidth <= 768) {
				sideBar.classList.remove("show-menu");
				menuOverlay.classList.remove("active");
			}
		});
	});

	window.addEventListener("resize", function () {
		adjustHeight();
	});

	adjustHeight();
});