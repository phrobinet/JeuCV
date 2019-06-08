
const isPal = (word, isCaseSens = false) => isCaseSens ? [...word].reverse().join('') === word : [...word.toLowerCase()].reverse().join('') === word.toLowerCase() ;

function isPal2(word){ // anna
    let numLetters = word.length
    let reverseWord = ''
    while(numLetters--) {
        reverseWord += word[numLetters]
    }
// for(let i = 0; i<= word.length; i++){
//     console.log(word[i] +'=== '+ word[word.length - (i + 1)]);
//     if(word[i] !== word[word.length - (i +1)]){ // a === a
//         return false;
//     }
// }
//     return true;
}
console.log(isPal2('anna'))

String.prototype.myRepeat = function(param){
    if(param != Infinity && param > 0){
        let word = '';
        while(param --) {
            word += this;
        }
        return word
    }
    return [...this].join('');
}
console.log('sef'.myRepeat(-0));


function myFlat(input, output = []) {
    // LOOP sur  tableau de base à FLATTEN
    input.forEach(value => {
         // si l'element bouclé est lui meme un tableau
        if(value instanceof Array) {
    // alors je rappelle recursivement la fonction en passant le tableau/value en param
            myFlat(value, output)
        } else {
            // si l'elememt bouclé n'est pas un tableau j'ajoute dans un autre nouveau tableau vierge
            output.push(value)
        }
    })
        // je retourne le nouveau tableau vierge flat
        return output
}
console.log(myFlat(['foobar', [true, 1, [new Set('ytf', false), {}]]]))

const arr = [10, 12, 15, 21]

for (var i = 0; i < arr.length; i++) {
    // pass in the variable i so that each function
    // has access to the correct index
    (j => {
    setTimeout(() => {
      console.log('Index: ' + j + ', element: ' + arr[j]);
    }, 1000);
    })(i)
  
  }