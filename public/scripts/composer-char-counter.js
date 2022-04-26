$(document).ready(function() {
  let counter = $('.counter');

  const characterCount = function(characters) {
    characterLimit = 140;

    const result = characters <= characterLimit ? characterLimit - characters : -(characters - characterLimit);
    
    return result;
  };

  const countCheck = function(characterCheck) {
    if (characterCheck > 0) {
      counter.css('color', '#545149');
      counter.text(characterCheck);
    }

    if (characterCheck <= 0) {
      counter.css('color', '#f13a19');
      counter.text(characterCheck);
    }
  };

  $('#tweet-text').on('input', function() {
    const characters = this.value.length;

    const characterCheck = characterCount(characters);

    return countCheck(characterCheck);
  });

});
