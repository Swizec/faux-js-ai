
const corpusReader = require('./corpusReader');

function randomChar() {
    return CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));
}

//const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\"'\`~!@#$%^&*()+=_-[]{},<>:;?/\\ ";
//const CHARACTER_SET = corpusReader();
const CHARACTER_SET = "01234567890+-*/."

const MUTATE_FACTOR = 0.5,
      MUTATE_LIKELIHOOD = 0.8,
      BIGGEST_POPULATION = 200,
      N_EPOCHS = 50;

module.exports = {
    CHARACTER_SET,
    MUTATE_FACTOR,
    MUTATE_LIKELIHOOD,
    BIGGEST_POPULATION,
    N_EPOCHS,
    randomChar
};
