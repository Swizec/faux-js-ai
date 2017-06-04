
const _ = require('lodash');

const PAIRING_STRATEGIES = {
    'top_half_pairs': (population) => _.chunk(_.take(population,
                                                     population.length/2),
                                              2)
}

module.exports = PAIRING_STRATEGIES;
