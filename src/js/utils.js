export function getRandomInt(minimum, maximum) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    // The max is exclusive and the min is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}

//https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
export const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);