
const _ = require('lodash');

const PAIRING_STRATEGIES = {
    'top_half_pairs': (population) => _.chunk(_.take(population,
                                                     population.length/2),
                                              2),
    'top_30_superset': (population) => {
        const top30 = _.take(population, 30);

        return _.flatten(top30.map(A => top30.map(B => [A, B])))
    }
}

module.exports = PAIRING_STRATEGIES;
