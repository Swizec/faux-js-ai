
const _eval = require('eval');
const _ = require('lodash');

const PAIRING_STRATEGIES = require('./pairing');
const breedPairs = require('./breeding');
const { fitness, rank } = require('./fitness');

const {
    CHARACTER_SET,
    MUTATE_FACTOR,
    MUTATE_LIKELIHOOD,
    BIGGEST_POPULATION,
    N_EPOCHS,
    randomChar
} = require('./config');

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

function pairingStrategy(type) {
    return PAIRING_STRATEGIES[type];
}

function* generation({ population, fitness, N }) {
    while (true) {
        population = rank(population, fitness);

        // pairwise breed top 50% of population
        population = population.concat(
            breedPairs(pairingStrategy('top_half_pairs')(population))
        );

        population = rank(population);

        population = _.take(population, BIGGEST_POPULATION);

        yield {
            fitness: fitness(population[0]),
            code: population[0],
            fitnessLast: fitness(population[population.length-1]),
            codeLast: population[population.length-1],
            size: population.length
        };
    }
}



let population = initialPopulation({ N: 50, memberLength: 20 }),
    newGen = generation({ population, fitness, N: 50 });

// Run for N epochs
for (let i = 0; i < N_EPOCHS; i++) {
    console.log(i);
    console.log(newGen.next().value);
}
