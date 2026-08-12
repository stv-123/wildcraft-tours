/* =========================================
   WILDCRAFT TOURS
   MAIN JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

        });


        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

            });

        });

    }


    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);


    /* =========================================
       FAVORITE BUTTONS
    ========================================= */

    const favoriteButtons =
        document.querySelectorAll(".favorite");

    favoriteButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                button.textContent = "♥";

            } else {

                button.textContent = "♡";

            }

        });

    });


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value;

            const message =
                document.getElementById("message").value.trim();


            if (!name || !email || !subject || !message) {

                formMessage.textContent =
                    "Please complete all fields.";

                return;

            }


            formMessage.textContent =
                `Thank you, ${name}. Your enquiry has been received. We'll get back to you shortly.`;


            contactForm.reset();

        });

    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       SMOOTH INTERNAL LINKS
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.offsetTop - headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});