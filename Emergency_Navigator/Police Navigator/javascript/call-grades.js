function showCallGrade(id) {
    const terms = document.querySelectorAll('.dictionary-term');
    terms.forEach(term => {
        if (term.id === id) {
            term.style.display = 'block';
        } else {
            term.style.display = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const terms = document.querySelectorAll('.dictionary-term');
    terms.forEach(term => term.style.display = 'none');
    
    const dictionaryLinks = document.querySelectorAll('#dictionary-list li a');
    dictionaryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showCallGrade(targetId);
        });
    });
});
