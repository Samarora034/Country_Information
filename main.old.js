
    function showCountryInfo(countryCode) {
      var countryInfo = document.getElementById(countryCode);
      var displayStyle = countryInfo.style.display;
      if (displayStyle === 'none') {
        countryInfo.style.display = 'block';
      } else {
        countryInfo.style.display = 'none';
      }
    }