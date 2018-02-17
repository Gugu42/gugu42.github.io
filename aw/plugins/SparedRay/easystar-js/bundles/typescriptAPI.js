(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/// <reference path="../../../default/typescript/typescriptAPI/TypeScriptAPIPlugin.d.ts" />

SupCore.system.registerPlugin("typescriptAPI", "EasyStar", {
    code: "",
    defs: "// Type definitions for EasyStar.js 0.1.6\r\n// Project: http://easystarjs.com/\r\n// Definitions by: Magnus Gustafsson <https://github.com/borundin>\r\n// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped  \r\n\r\n/*\r\n easystarjs.d.ts may be freely distributed under the MIT license.\r\n */\r\n\r\ndeclare namespace EasyStar\r\n{\r\n    class js\r\n    {\r\n        new (): js;\r\n        setGrid(grid: number[][]): void;\r\n        setAcceptableTiles(tiles: number[]): void;\r\n        findPath(startX: number, startY: number, endX: number, endY: number, callback: (path: Position[]) => void): void;\r\n        calculate(): void;\r\n        setIterationsPerCalculation(iterations: number): void;\r\n        avoidAdditionalPoint(x: number, y: number): void;\r\n        stopAvoidingAdditionalPoint(x: number, y: number): void;\r\n        stopAvoidingAllAdditionalPoints(): void;\r\n        enableDiagonals(): void;\r\n        disableDiagonals(): void;\r\n        setTileCost(tileType: number, multiplicativeCost: number): void;\r\n    }\r\n\r\n    interface Position\r\n    {\r\n        x: number;\r\n        y: number;\r\n    }\r\n}\r\n\r\ndeclare module \"EasyStar\" {\r\n    export = EasyStar;\r\n}\r\n",
});

},{}]},{},[1]);
