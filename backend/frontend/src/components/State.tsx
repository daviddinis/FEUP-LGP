export function stateToClass(percentage: number | undefined) {
    if(!percentage) return "analysing";
    if(percentage < 0 || percentage > 100) throw new RangeError();
    if(percentage < 50) return "bad";
    if(percentage < 80) return "medium";

    return "good";

}

export function stateToString(percentage: number | undefined) {
    if(!percentage) return "analysing";
    if(percentage < 0 || percentage > 100) throw new RangeError();

    return percentage + "%";

}