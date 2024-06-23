function toggleDefinition(termId) {
  var term = document.getElementById(termId);
  var allTerms = document.querySelectorAll('.dictionary-term');
  
  term.classList.toggle('active');
  
  allTerms.forEach(function(item) {
      if (item.id !== termId) {
          item.classList.remove('active');
      }
  });
}