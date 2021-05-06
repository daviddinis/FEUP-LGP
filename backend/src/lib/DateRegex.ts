const yearNums = '([\\d]{4}|[\\d]{2})';
const monthNums = '[\\d]{1,2}';
const dayNums = '[\\d]{1,2}(st|nd|rd)?';
const sep = '\\s*(\\/|-|,| |day of)\\s*'
const monthNames = '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\w*'
const monthRegex = `(${monthNums}|${monthNames})`;

module.exports = new RegExp(
    `\\b${yearNums}${sep}${monthRegex}${sep}${dayNums}\\b` + '|' +
    `\\b${dayNums}${sep}${monthRegex}${sep}${yearNums}\\b` + '|' +
    `\\b${monthRegex}${sep}${dayNums}${sep}${yearNums}\\b`
    , 'g'
);