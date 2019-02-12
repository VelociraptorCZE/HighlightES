/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

const escapeArray = [
    [/\|/g, "&vert;"],
    [/"/g, "&quot;"],
    [/\$/g, "&dollar;"],
    [/]/g, "&rsqb;"],
    [/\[/g, "&lsqb;"],
    [/\^/g, "&Hat;"],
    [/\*/g, "&ast;"],
    [/\//g, "&sol;"],
    [/\\/g, "&bsol;"],
    [/\?/g, "&quest;"],
    [/\+/g, "&plus;"],
    [/{/g, "&lcub;"],
    [/}/g, "&rcub;"],
    [/\(/g, "&lpar;"],
    [/\)/g, "&rpar;"],
    [/\./g, "&period;"],
    [/</g, "&lt;"],
];

export default escapeArray;