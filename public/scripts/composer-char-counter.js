$(document).ready(function() {
  let counter = $('.counter');
  let icon = $('.fa-solid.fa-flag');
  let tweet = $('single-tweet');

  icon.on('mouseover', function() {
    $(this).css({ color: 'gold', transition: '100ms, ease-in-out'})
  });

  tweet.on('mouseout', function() {
    $(this).css({ color: '#4056A1', transition: '100ms, ease-in-out'})
  });
  
  tweet.on('mouseover', function() {
    $('overlay').show();
  });

  icon.on('mouseout', function() {
    $('overlay').hide();
  });

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
