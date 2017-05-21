
const _eval = require('eval');

// We aim to maximize this value
function fitness(code, conditions) {
    const N = conditions.length,
          fulfilled = conditions.map(condition => condition(_eval(code), code))
                                .filter(b => b)
                                .length;

    return fulfilled/N;
}

// We want code that calculates 4
// Conditions:
// Does not equal 4 as a string
// Returns 4
const Conditions = [
    (result, code) => result === 4,
    (result, code) => code !== "4",
    (result, code) => code !== 4
];

const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\"'\`~!@#$%^&*()+=_-[]{},<>:;?/\\";


function memberMaker(memberLength) {
    let member = new Array(memberLength);

    for (let i = 0; i < memberLength; i++) {
        member[i] = CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));
    }

    return member.join("");
}

function initialPopulation({ N, memberLength }) {
    let population = new Array(N);

    for (let i = 0; i < N; i++) {
        population[i] = memberMaker(memberLength);
    }

    return population;
}

let population = initialPopulation({ N: 50, memberLength: 50 });

console.log(population);
