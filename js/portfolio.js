// Ntswaki Mokwana — Portfolio interactions

(function () {
    "use strict";

    // Mobile nav toggle
    var toggle = document.getElementById("navToggle");
    var route = document.getElementById("routeNav");

    if (toggle && route) {
        toggle.addEventListener("click", function () {
            var isOpen = route.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    // Mark waypoints before the active one as "passed" for the route-line effect
    var links = document.querySelectorAll(".route a");
    var activeIndex = -1;
    links.forEach(function (link, i) {
        if (link.classList.contains("is-active")) activeIndex = i;
    });
    if (activeIndex > -1) {
        links.forEach(function (link, i) {
            if (i < activeIndex) link.classList.add("is-passed");
        });
    }

    // Gentle reveal for timeline items and cards as they scroll into view
    var revealTargets = document.querySelectorAll(".tl-item, .card, .proj-card");
    if ("IntersectionObserver" in window && revealTargets.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(function (el) { observer.observe(el); });
    }

    // Contact form -> opens the visitor's email client with a pre-filled message
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("fName").value.trim();
            var email = document.getElementById("fEmail").value.trim();
            var message = document.getElementById("fMessage").value.trim();

            var subject = "Portfolio contact from " + name;
            var body = message + "\n\n— " + name + " (" + email + ")";

            var mailto = "mailto:ntswakiprudence098@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mailto;
        });
    }
})();
