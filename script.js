document.addEventListener('DOMContentLoaded', function () {

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    document.querySelectorAll('a[href^=""]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            if (this.getAttribute('href').startsWith('http')) return;
            
            e.preventDefault();
            const transition = document.getElementById('page-transition');
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 500);
        });
    });


    window.addEventListener('load', function() {
        const transition = document.getElementById('page-transition');
        if (transition) transition.classList.remove('active');
    });
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.content-section, .info-card, .position-card').forEach(el => {
        observer.observe(el);
    });
    

    const navIcons = {
        'index.html': 'fa-home',
        'listino.html': 'fa-list',
        'balistico.html': 'fa-bullseye',
        'lavora-con-noi.html': 'fa-briefcase',
        'poligono.html': 'fa-crosshairs'
    };
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (navIcons[href]) {
            const icon = document.createElement('i');
            icon.className = `fas ${navIcons[href]}`;
            link.insertBefore(icon, link.firstChild);
        }
    });
});
