/**
 * HighlightES
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default function HighlightRegexParser(string) {
    return (string[string.length - 1] !== "|" ? string + "|" : string)
        .replace(/\|/g, "(?!\\w|-)|")
        .slice(0, -1);
}