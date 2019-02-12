/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class MatchOptions {
    constructor(context) {
        this.context = context;
    }

    newMatchGroup(pattern, css, preRegex = "") {
        return {
            matches: this.context.content.match(pattern),
            css: css,
            preRegex: MatchOptions._checkRegex(preRegex),
        };
    }

    static _checkRegex(regex) {
        return navigator.userAgent.indexOf("Trident") !== -1 && regex.indexOf("?<=") !== -1 ? "" : regex;
    }
}