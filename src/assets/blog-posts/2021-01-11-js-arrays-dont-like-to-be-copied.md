---
title: "JS arrays don't like to be copied"
categories:
  - Blog
  - coding practice
tags:
  - javascript
  - arrays
  - variable reassignment
  - debugging

---

Yesterday, I was reminded that arrays in JavaScript really don't like to be copied but love to take all the names they can get for themselves.

I was going through a few vanilla JavaScript projects on codecademy to refresh and consolidate the basics and I got stuck for quite a long time on an issue I had where the program gave me as its output completely new arrays with values nowhere present in the "raw data". And the program did that even though I was expecting it just to push those arrays that pass a test into a new array.

To illustrate what I mean, this is a small snippet from the raw data that codecademy provided as a basis for this project:
```javascript
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
```

This first snippet represents two arrays of digits that - if you join the digits together - form dummy credit card numbers.

The general idea of the project is to build a credit card checker that is able to run the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) to determine if the credit card number can be a valid one or if e.g. someone made a typo and accidentally changed one digit or something like that. The educational goal of the project is, as I said, to train basic JavaScript skills with regard to functions, loops, objects and arrays.

So, after reading up a bit on the Luhn algorithm, I got to it and wrote the function that just checks whether according to that algorithm the credit card number you give it as an argument is valid or not and return `true` for a valid card and `false` for an invalid card.
```javascript
// This function that checks the validity of the input card number
const validateCred = (creditCard) => {
  let internalArr = creditCard; 
  for (let i = internalArr.length - 2; i >= 0; i-=2) {
    let currentValue = internalArr[i] * 2;
    if (currentValue > 9) {
      currentValue -= 9;
    }
    internalArr[i] = currentValue;
  }
  let sum = internalArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}
```

And it worked well when I tested it. For those numbers that were listed as valid, my function returned `true` and for those that were invalid, it returned `false`. So I went on to write the next function, which should accept a nested input array (all those arrays like the two above grouped together in another array like so: `[valid1, valid2, ... , invalid5, ...]`) as an argument and should return a new array that only contains the invalid card numbers - again as a nested array. 

```javascript
// This function returns an array with all the invalid numbers from an input array.
const findInvalidCards = (creditCards) => {
  let invalidCards = [];

  for (let card of creditCards) {
    if (! validateCred(card)) {
      invalidCards.push(card);
    }
  }
  return invalidCards;
}
```

And ... **nice!** It worked ...  
Or did it? It actually only worked on the first glance. The strange thing is, it returned me an array with card numbers nowhere to be found in the provided data set. It was completely different numbers! I vividly remember the first number in my output starting with an 8. But there was no credit card number starting with an 8 in the provided arrays. What was this madness? Spooky numbers haunting the editor and terminal?

I really didn't get it. Where in the world - or where in the code for that matter - did those new numbers come from? After checking my code a few times, changing variable names here and there because I suspected I might have assigned the same name multiple times and thereby accidentally produced some interference, I ... well, I checked it again for a few more times. 
At some point I even copied and ran it all on my machine, suspecting it to be a strange bug on codecademy's side who might still have displayed different arrays of numbers in the frontend editor while using a changed data set in the backend (after reworking parts of the course maybe) to return me those dubious numbers. 

I mean, **I** did definitely not change anything in those arrays provided by codecademy. I had wisely copied the input array at the start of the validation function and only worked on that copy afterwards not on the original arrays. Plus, this copy was even in function scope. So, as long as I would not just reassign new values to the original array (no matter if in global scope or function scope), there was no way, I was messing with the original numbers.

After quite some time of just scratching my head and wondering about ghosts in the machine, I turned to the codecademy forums to see if anybody else had the same issue of receiving mysterious numbers as an output. And finally, I found a very helpful reply to someone else who seems to have had a similar issue. 

And, you might have guessed it already: **I was actually still working with the original arrays** even though I tried to make a copy at the start of the function. It turns out that if you simply declare a new variable and assign it an existing array as its value, what happens is - somewhat counterintuitively - that the existing array just takes on the new name in addition to the old one. Or to state it a bit more correctly: the newly declared variable name just points to the same existing array. So, instead of making a copy you can safely work on, you will perform operations on the existing array when you tell it to perform operations on the supposedly new array (which actually is just a new name... a bit like "cognitive science" for "cybernetics" :wink: ).

Finally, I knew where the ghostly numbers emenated from and fixed the issue by actually initializing a new array with a new name that contains the copied values from the existing array by using the `.map()` method on the input array like so:
```javascript
const validateCred = (creditCard) => {
  let internalArr = creditCard.map(el => el); // Just a less intuitive but working way to actually "copy" an array.
  
  for (let i = internalArr.length - 2; i >= 0; i-=2) {
    let currentValue = internalArr[i] * 2;
    if (currentValue > 9) {
      currentValue -= 9;
    }
    internalArr[i] = currentValue;
  }
  let sum = internalArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
}
```
And this time, it did work. I could finish the rest of the project without any trouble and go to sleep, not worrying about ghosts manipulating numbers in my terminal anymore.

Retrospectively, I could have become more suspicious of the fact that I might be reassigning new values to the original arrays when presented with that 8 at the start of at least one number, since part of the operation in the Luhn algorithm is multiplying every second digit by two (starting from the end) and a 4 was, of course, present at the zero index of at least one number. But that did not occur to me in time... Too bad.

But I will remember: JavaScript arrays don't like copycats and if they can, they will take all the names for all the fames.