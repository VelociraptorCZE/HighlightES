/**
 * HighlightES / Wolfuix array polyfills
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!Array.from) {
    Array.from = function(target) {
        let result = [];
        if (typeof target === "string") {
            result = target.split("");
        }
        else {
            for (let i = 0; i < target.length; i++) {
                result.push(target[i]);
            }
        }
        return result;
    }
}