keys = rawKeys.split('\n').map((key) => key.split('|'))
codes = rawCodes.split('\n').map((code) => code.split(','))


generateRuleset = function(onlyOrderThese) {
	orderedKeys = []
	for (k = 0; k < keys.length; k++) {
		if (!orderedKeys.includes(keys[k][1]) && onlyOrderThese.includes(keys[k][1])) {
      orderedKeys.push(keys[k][1]);
    }
		if (onlyOrderThese.includes(keys[k][0]) || orderedKeys.includes(keys[k][0])) {
      if (orderedKeys.includes(keys[k][0])) {
        if (orderedKeys.includes(keys[k][1])) {
          if (orderedKeys.indexOf(keys[k][0]) > orderedKeys.indexOf(keys[k][1])) {
            orderedKeys.splice(orderedKeys.indexOf(keys[k][0]), 1)
            orderedKeys.splice(orderedKeys.indexOf(keys[k][1]), 0, keys[k][0])
          }
        }
      } else if (orderedKeys.includes(keys[k][1])) {
        orderedKeys.splice(orderedKeys.indexOf(keys[k][1]), 0, keys[k][0])		
      } else {
        orderedKeys.push(keys[k][0]);
      }
  	}
	}
	// DO IT AGAIN TO PICK UP ORDERINGS THAT SLIPPED THROUGH THE CRACKS
  for (k = 0; k < keys.length; k++) {
		if (!orderedKeys.includes(keys[k][1]) && onlyOrderThese.includes(keys[k][1])) {
      orderedKeys.push(keys[k][1]);
    }
		if (onlyOrderThese.includes(keys[k][0]) || orderedKeys.includes(keys[k][0])) {
      if (orderedKeys.includes(keys[k][0])) {
        if (orderedKeys.includes(keys[k][1])) {
          if (orderedKeys.indexOf(keys[k][0]) > orderedKeys.indexOf(keys[k][1])) {
            orderedKeys.splice(orderedKeys.indexOf(keys[k][0]), 1)
            orderedKeys.splice(orderedKeys.indexOf(keys[k][1]), 0, keys[k][0])
          }
        }
      } else if (orderedKeys.includes(keys[k][1])) {
        orderedKeys.splice(orderedKeys.indexOf(keys[k][1]), 0, keys[k][0])		
      } else {
        orderedKeys.push(keys[k][0]);
      }
  	} 
	}
	return orderedKeys;
}

 validateCode = function(codes, code) {
	for (i = 0; i < keys.length; i++) {
    if (code === keys[i][0]) {
      if (codes.includes(keys[i][1])) {
      	if (codes.indexOf(keys[i][0]) > codes.indexOf(keys[i][1])) {
        	return false;
      	}	    
      }
		}
		if (code === keys[i][1]) {
      if (codes.includes(keys[i][0])) {
      	if (codes.indexOf(keys[i][0]) > codes.indexOf(keys[i][1])) {
        	return false;
      	}	    
      }
		}
  }
	return true;
}

fixCode = function(codes, orderedKeys) {
	return codes.slice().sort((a, b) => orderedKeys.indexOf(a) - orderedKeys.indexOf(b));
}

counter = 0
for (j = 0; j < codes.length; j++) {
  test = codes[j].map((code) => validateCode(codes[j], code))
	if (!test.every(v => v === true)) {
		keysToUse = generateRuleset(codes[j])
    fixed = fixCode(codes[j], keysToUse)
		counter += parseInt(fixed[Math.floor(fixed.length/2)])
  }
}
console.log(counter)
