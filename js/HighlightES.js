/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import {} from "./ArrayFrom.js";
import RegexParser from "./RegexParser.js";
import MatchOptions from "./MatchOptions.js";
import escapeArray from "./EscapeArray.js";

export default class HighlightES {
    constructor(elemSelector) {
        this.elems = typeof elemSelector === "string" ? document.querySelectorAll(elemSelector) : elemSelector;
        this.parse();
    }

    parse() {
        Array.from(this.elems).forEach(elem => this._parse(elem));
    }

    _parse(elem) {
        this.content = HighlightES._escape(elem.innerHTML);

        let matchOptions = new MatchOptions(this),
            preRegex = "(?<=[^\\w]|^)",
            matchGroups = [
                matchOptions.newMatchGroup(/(&sol;&sol;.*)|&sol;&ast;(.*\n)+.*?&ast;&sol;/g, "comments"),
                matchOptions.newMatchGroup(/&sol;.+?&sol;\w{0,5}(?!\w|&)/g, "regex"),
                matchOptions.newMatchGroup(/&quot;.*?&quot;|'.*?'|`.*?`/g, "string"),
                matchOptions.newMatchGroup(/\d+/g, "number"),
                matchOptions.newMatchGroup(HighlightES._windowProperties, "window", preRegex),
                matchOptions.newMatchGroup(HighlightES._keywordsRegex, "keyword", preRegex),
            ];

        matchGroups.forEach(matchGroup => this._transformMatches(matchGroup));

        elem.innerHTML = this.content;
    }

    _transformMatches({ matches, css, preRegex }) {
        if (matches) {
            matches.forEach(match => {
                this.content = this.content.replace(
                    new RegExp(`${preRegex + match}(?!\">|=\"|<.+?>|\\w)`),
                    `<span class="highlight-es--${css}">${match}</span>`
                );
            });
        }
    }

    static _escape(string) {
        escapeArray.forEach(esc => string = string.replace(esc[0], esc[1]));
        return string;
    }

    static get _windowProperties() {
        return new RegExp(RegexParser(Object.getOwnPropertyNames(window).join("|")), "g");
    }

    static get _keywordsRegex() {
        return new RegExp(RegexParser("constructor|break|case|catch|continue|debugger|default|delete|" +
            "do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with|const|" +
            "export|extends|import|super|let|yield|of|null|true|false|from|class|get|set"), "g");
    }
}