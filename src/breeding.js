
const {
    CHARACTER_SET,
    MUTATE_FACTOR,
    MUTATE_LIKELIHOOD,
    BIGGEST_POPULATION,
    N_EPOCHS,
    randomChar
} = require('./config');

function randomUpTo(n) {
    return Math.floor(Math.random()*n);
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

    const Apivot = randomUpTo(a.length),
          Bpivot = randomUpTo(b.length);

    let child = [a.slice(Apivot, Apivot+randomUpTo(a.length)),
                 b.slice(Bpivot, Bpivot+randomUpTo(b.length))].join("");

    if (Math.random() > MUTATE_LIKELIHOOD) {
        child = mutate(child);
    }

    return child.trim();
}

function breedPairs(pairs) {
    return pairs.map(([a, b]) => a && b ? breedPair(a, b) : a);
}

module.exports = breedPairs;
