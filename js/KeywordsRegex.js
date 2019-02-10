/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */
import RegexParser from "./RegexParser.js";
const keywordRegex = new RegExp(RegexParser("constructor|break|case|catch|continue|debugger|default|delete|" +
    "do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with|const|" +
    "export|extends|import|super|let|yield|of|null|true|false|from|"), "g");

export default keywordRegex;