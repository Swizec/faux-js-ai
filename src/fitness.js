
// We aim to maximize this value
function fitness(code, conditions) {
    const max = conditions.reduce((sum, { condition, weight }) => sum + weight,
                                  0),
          fit = conditions.map(({ condition, weight }) => Number(condition(code))*weight)
                          .reduce((sum, fit) => sum + fit,
                                  0);

    return fit/max;
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
// Syntactically correct
// Does not equal 4 as a string
// Returns 4
// Shorter than 10 char
// Longer than 3 char
const Conditions = [
    {
        condition: code => !(run(code) instanceof Error),
        weight: 10
    },
    {
        condition: code => run(code) === 4,
        weight: 8
    },
    {
        condition: code => code !== "4",
        weight: 2
    },
    {
        condition: code => code !== 4,
        weight: 2
    },
    {
        condition: code => code.length > 10 ? 10/code.length : 1,
        weight: 6
    },
    {
        condition: code => code.length >= 3,
        weight: 5
    }
];

function rank(population, fitness) {
    population.sort((a, b) => {
        a = fitness(a);
        b = fitness(b);

        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });

    return population;
}

const curriedFitness = (code) => fitness(code, Conditions)

module.exports = {
    fitness: curriedFitness,
    rank: (population) => rank(population, curriedFitness)
};
