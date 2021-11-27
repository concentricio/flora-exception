"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Read = void 0;
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const q = __importStar(require("faunadb/query"));
const Flora_2 = require("../Flora");
const Read = (ref, $Predicate = FloraTypes_1.$Any) => {
    return (0, Flora_1.Fx)([[ref, (0, FloraTypes_1.$Ref)($Predicate)]], (0, FloraTypes_1.$Document)($Predicate), (ref) => q.If(q.Exists(ref), q.Get(ref), (0, Flora_1.Raise)((0, Flora_2.FloraException)({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    }))));
};
exports.Read = Read;