/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import {} from "./ArrayFrom.js";
import RegexParser from "./RegexParser.js";
import MatchOptions from "./MatchOptions.js";

export default class HighlightES {
    constructor(elemSelector) {
        this.elems = typeof elemSelector === "string" ? document.querySelectorAll(elemSelector) : elemSelector;
        this.parse();
    }

    parse() {
        Array.from(this.elems).forEach(elem => this._parse(elem));
    }

    _parse(elem) {
        this.content = elem.innerHTML.replace(/\|/g, "&vert;");

        let matchOptions = new MatchOptions(this),
            beforeRegex = "(?<=[^\\w]|^)",
            matchGroups = [
                matchOptions.newOption(/".*?"|'.*?'|`.*?`/g, "string"),
                matchOptions.newOption(/\/\/.+/g, "comments"),
                matchOptions.newOption(/\d+|\.?\d/g, "number"),
                matchOptions.newOption(HighlightES._windowProperties, "window", beforeRegex),
                matchOptions.newOption(HighlightES._keywordsRegex, "keyword", beforeRegex),
            ];

        matchGroups.forEach(matchGroup => this._transformMatches(matchGroup));

        elem.innerHTML = this.content;
    }

    _transformMatches({ matches, css, beforeRegex }) {
        if (matches) {
            matches.forEach(match => {
                if (match) {
                    this.content = this.content.replace(
                        new RegExp(`(?!<.+)${beforeRegex + match}(?!">|="|<.+>|\\w)`),
                        `<span class="highlight-es--${css}">${match}</span>`
                    );
                }
            });
        }
    }

    static get _windowProperties() {
        return new RegExp(RegexParser(Object.getOwnPropertyNames(window).join("|")), "g");
    }

    static get _keywordsRegex() {
        return new RegExp(RegexParser("constructor|break|case|catch|continue|debugger|default|delete|" +
            "do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with|const|" +
            "export|extends|import|super|let|yield|of|null|true|false|from|class"), "g");
    }
}