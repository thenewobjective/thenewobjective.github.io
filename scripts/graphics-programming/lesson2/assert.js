import AssertionError from "./AssertionError.js";

const assert = (condition, message) => {
    if(Boolean(condition) == false)
        throw new AssertionError(message);
}

export default assert