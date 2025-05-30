## References

- <https://rosettacode.org/wiki/Amb>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols>
- <https://web.archive.org/web/20110413061723/http://mihai.bazon.net/blog/amb-in-javascript/take-two>
- <https://patricklogan.blogspot.com/2011/04/implementing-mccarthys-amb-operator-in.html>
- <https://matt.might.net/articles/programming-with-continuations--exceptions-backtracking-search-threads-generators-coroutines/>
- <https://github.com/patrickdlogan/ambjs/blob/master/public/scripts/amb.js>

## Notes

<https://web.archive.org/web/20120112161809/http://patrickdlogan.github.com/ambjs/docs/amb-test.html#section-4>

// Generates a random integer between min_inclusive (inclusive) and max_exclusive (exclusive)
const randomIntegerBetween = (min_inclusive, max_exclusive) =>
    Math.floor(Math.random() * (max_exclusive - min_inclusive)) + min_inclusive;

// Selects a random choice from an array
const randomChoice = (choices) => choices[randomIntegerBetween(0, choices.length)];

// AMB function that takes an array of choices, a function, and a failure result
const amb = (choices, fn, failure_result) => {
    let cs = [...choices]; // Using spread operator to clone the choices array
    const fail_token = Symbol('fail'); // Using Symbol for unique fail token
    const fail = () => fail_token;

    while (cs.length > 0) {
        const c = randomChoice(cs);
        const r = fn(c, fail);
        if (r === fail_token) {
            cs = cs.filter(choice => choice !== c); // Using filter to remove the failed choice
        } else {
            return r;
        }
    }
    return failure_result;
};

// Example usage
const choices = [1, 2, 3, 4, 5];
const exampleFunction = (choice, fail) => {
    if (choice % 2 === 0) return choice;
    return fail();
};
const failureResult = 'No valid choices';

console.log(amb(choices, exampleFunction, failureResult)); // It will print one of the even numbers or 'No valid choices'
