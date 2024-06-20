function showCaution(id) {
    var dictionaryTerms = document.getElementsByClassName('dictionary-term');
    
    for (var i = 0; i < dictionaryTerms.length; i++) {
        dictionaryTerms[i].classList.remove('active');
    }
    
    var selectedTerm = document.getElementById(id);
    selectedTerm.classList.add('active');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
