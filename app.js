// Function to load content based on the hash
function loadContent() {
    const hash = window.location.hash || "#home";
    const app = document.getElementById("app");
    document.body.classList.toggle("home-active", hash === "#home");

    fetch(`views/${hash.substring(1)}.html`)
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;

            if (hash === "#home") {
                initHomeAnimation();
            }
        })
        .catch(err => {
            app.innerHTML = "<h1>Page Not Found</h1>";
        });
}

function initHomeAnimation() {
    const roleText = document.getElementById("role-text");
    if (!roleText) return;

    const roles = [
        "Software Engineer",
        "Backend Engineer",
        "Forward Deployed Engineer",
        "GraphRAG Engineer"
    ];

    let roleIndex = 0;
    let charIndex = 0;

    function typeRole() {
        const current = roles[roleIndex];
        if (charIndex < current.length) {
            roleText.textContent += current[charIndex];
            charIndex++;
            setTimeout(typeRole, 90);
        } else {
            setTimeout(eraseRole, 1200);
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            roleText.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 40);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 400);
        }
    }

    roleText.textContent = "";
    typeRole();
}

window.addEventListener("load", loadContent);
window.addEventListener("hashchange", loadContent);
