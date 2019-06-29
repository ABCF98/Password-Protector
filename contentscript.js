x = document.body;
console.log(x)
x.onload = myfunction;

function myfunction(){
    
    var x = document.querySelector("input[type = 'password']");
    console.log('password:' + x);
    x.onchange = function(){console.log('change:'+ x.value)}
    x.onblur = function(){console.log('change:'+ x.value);
    x.onfocus = function(){x.value = ""}
    var z =  get_pass(x.value);
    console.log(z);
	   x.value = z;
    console.log('changed:'+ x.value);

	}
}

function get_pass(pass){
    key = window.location.hostname;
    console.log(key);
    var new_pass = encrypt(pass,key);
    console.log(new_pass);
    return new_pass;
}



function convertFromHex(hex) {
    var hex = hex.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    console.log(str);
    return str;
}

function convertToHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    console.log(hex);
    return hex;
}


// Vigenere Cipher
_tabulaRecta =  {
    'a': "abcdefghijklmnopqrstuvwxyz",
    'b': "bcdefghijklmnopqrstuvwxyza",
    'c': "cdefghijklmnopqrstuvwxyzab",
    'd': "defghijklmnopqrstuvwxyzabc",
    'e': "efghijklmnopqrstuvwxyzabcd",
    'f': "fghijklmnopqrstuvwxyzabcde",
    'g': "ghijklmnopqrstuvwxyzabcdef",
    'h': "hijklmnopqrstuvwxyzabcdefg",
    'i': "ijklmnopqrstuvwxyzabcdefgh",
    'j': "jklmnopqrstuvwxyzabcdefghi",
    'k': "klmnopqrstuvwxyzabcdefghij",
    'l': "lmnopqrstuvwxyzabcdefghijk",
    'm': "mnopqrstuvwxyzabcdefghijkl",
    'n': "nopqrstuvwxyzabcdefghijklm",
    'o': "opqrstuvwxyzabcdefghijklmn",
    'p': "pqrstuvwxyzabcdefghijklmno",
    'q': "qrstuvwxyzabcdefghijklmnop",
    'r': "rstuvwxyzabcdefghijklmnopq",
    's': "stuvwxyzabcdefghijklmnopqr",
    't': "tuvwxyzabcdefghijklmnopqrs",
    'u': "uvwxyzabcdefghijklmnopqrst",
    'v': "vwxyzabcdefghijklmnopqrstu",
    'w': "wxyzabcdefghijklmnopqrstuv",
    'x': "xyzabcdefghijklmnopqrstuvw",
    'y': "yzabcdefghijklmnopqrstuvwx",
    'z': "zabcdefghijklmnopqrstuvwxy"
  }

   function encrypt (plainText, keyword){
    if( typeof(plainText) !== "string" ){
      return "invalid plainText. Must be string, not " + typeof(plainText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    plainText = plainText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var encryptedText = "";//sailenthuntersailenthunter
    var specialCharacterCount = 0;

    for( var i = 0; i < plainText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keywordIndex = _tabulaRecta.a.indexOf(keyword[keyLetter]);

      if( _tabulaRecta[plainText[i]] ){
        encryptedText += _tabulaRecta[plainText[i]][keywordIndex];
      }else{
        encryptedText += plainText[i];
        specialCharacterCount++;
      }
    }

    return encryptedText;
  }

  function decrypt(encryptedText, keyword){
    if( typeof(encryptedText) !== "string" ){
      return "invalid encryptedText. Must be string, not " + typeof(encryptedText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    encryptedText = encryptedText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var decryptedText = "";
    var specialCharacterCount = 0;

    for( var i = 0; i < encryptedText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keyRow = _tabulaRecta[keyword[keyLetter]];

      if( keyRow.indexOf(encryptedText[i]) !== -1 ){
        decryptedText += _tabulaRecta.a[keyRow.indexOf(encryptedText[i])];
      }else{
        decryptedText += encryptedText[i];
        specialCharacterCount++;
      }
    }

    return decryptedText;
  }
