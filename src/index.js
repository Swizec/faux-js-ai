
const _eval = require('eval');
const _ = require('lodash');

// We aim to maximize this value
function fitness(code, conditions) {
    const N = conditions.length,
          fulfilled = conditions.map(condition => condition(code))
                                .filter(b => b)
                                .length;

    return fulfilled/N;
}

function run(code) {
    try {
        return _eval(code)
    }catch (e) {
        return e;
    }
}

// We want code that calculates 4
// Conditions:
// Does not equal 4 as a string
// Returns 4
const Conditions = [
    code => !(run(code) instanceof Error),
    code => run(code) === 4,
    code => code !== "4",
    code => code !== 4
];

const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\"'\`~!@#$%^&*()+=_-[]{},<>:;?/\\ ";

const MUTATE_FACTOR = 0.1,
      MUTATE_LIKELIHOOD = 0.3;

function randomChar() {
    return CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));
}

function memberMaker(memberLength) {
    let member = new Array(memberLength);

    for (let i = 0; i < memberLength; i++) {
        member[i] = randomChar();
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

function rank(population, fitness) {
    population.sort((a, b) => {
        a = fitness(a, Conditions);
        b = fitness(b, Conditions);

        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    return population;
}

function mutate(member) {
    const N = member.length*MUTATE_FACTOR;

    for (let i = 0; i < Math.round(N); i++) {
        member[Math.floor(Math.random()*member.length)] = randomChar();
    }

    return member;
}

function breedPair(a, b) {
    a = a.trim();
    b = b.trim();

    let child = a.slice(0, a.length/2) + b.slice(b.length/2);

    if (Math.random() > MUTATE_LIKELIHOOD) {
        child = mutate(child);
    }

    return child;
}

function breedPairs(pairs) {
    return pairs.map(breedPair);
}

function* generation({ population, fitness, N }) {
    while (true) {
        population = rank(population, fitness);

        // pairwise breed top 50% of population
        population = population.concat(
            breedPairs(_.chunk(_.take(population,
                                 population.length/2),
                          2)
            ));

        population = rank(population, fitness);

        yield _.take(population, N);
    }
}



let population = initialPopulation({ N: 50, memberLength: 50 }),
    newGen = generation({ population, fitness, N: 50 });

console.log(newGen.next());
