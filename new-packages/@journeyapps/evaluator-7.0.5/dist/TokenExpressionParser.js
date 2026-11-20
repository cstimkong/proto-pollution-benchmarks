"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpressionParser = void 0;
const babelParser = __importStar(require("@babel/parser"));
const lodash_1 = require("lodash");
const lru_cache_1 = __importDefault(require("lru-cache"));
const FormatStringContext_1 = require("./context/FormatStringContext");
const FunctionExpressionContext_1 = require("./context/FunctionExpressionContext");
const parsers_1 = require("./parsers");
const FallbackExpressionParser_1 = require("./parsers/FallbackExpressionParser");
class TokenExpressionParser {
    static get() {
        if (!this.instance) {
            this.instance = new TokenExpressionParser();
        }
        return this.instance;
    }
    constructor() {
        this.getParser = (0, lodash_1.memoize)((nodeType) => {
            for (const factory of this.parserFactories) {
                if (factory.canParse(nodeType)) {
                    return factory.getParser();
                }
            }
            console.warn(`[TokenExpressionParser] No parser found for node type '${nodeType}', using FallbackExpressionParser`);
            return new FallbackExpressionParser_1.FallbackExpressionParser();
        });
        this.cache = new lru_cache_1.default({ max: 1000 });
        // Parser factories
        this.parserFactories = [];
        this.registerParserFactory(new parsers_1.ArrayExpressionParserFactory());
        this.registerParserFactory(new parsers_1.BlockStatementParserFactory());
        this.registerParserFactory(new parsers_1.CallExpressionParserFactory());
        this.registerParserFactory(new parsers_1.ConditionalExpressionParserFactory());
        this.registerParserFactory(new parsers_1.IdentifierExpressionParserFactory());
        this.registerParserFactory(new parsers_1.ExpressionNodeParserFactory());
        this.registerParserFactory(new parsers_1.LogicalExpressionParserFactory());
        this.registerParserFactory(new parsers_1.LiteralExpressionParserFactory());
        this.registerParserFactory(new parsers_1.MemberExpressionParserFactory());
        this.registerParserFactory(new parsers_1.ObjectExpressionParserFactory());
        // ParseContext factories
        this.contextFactories = [];
        this.registerContextFactory(new FunctionExpressionContext_1.FunctionExpressionContextFactory());
        this.registerContextFactory(new FormatStringContext_1.FormatStringContextFactory());
    }
    // TODO: Better lifecycle control and dispose it afterwards
    parse(event) {
        var _a;
        if (event.source.trim() === '') {
            return null;
        }
        if (!event.context) {
            event.context = this.inferContext(event.source);
        }
        const source = this.transformSource(event);
        if (this.cache.has(source)) {
            return this.cache.get(source);
        }
        const { program, errors } = babelParser.parse(source, {
            errorRecovery: true,
            allowAwaitOutsideFunction: true,
            allowReturnOutsideFunction: true
        });
        if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
            console.warn(`[TokenExpressionParser] Error parsing source: ${source}`, errors);
        }
        const node = (_a = program.body[0]) !== null && _a !== void 0 ? _a : program.directives[0];
        const parsed = this.parseNode({ node, source: source, context: event.context });
        this.cache.set(source, parsed);
        return parsed;
    }
    parseNode(event) {
        const parser = this.getParser(event.node.type);
        return parser.parse(Object.assign(Object.assign({}, event), { parseNode: this.parseNode.bind(this) }));
    }
    registerParserFactory(factory) {
        this.parserFactories.push(factory);
    }
    registerContextFactory(factory) {
        this.contextFactories.push(factory);
    }
    transformSource(event) {
        var _a;
        if (!((_a = event.context) === null || _a === void 0 ? void 0 : _a.hasTransformers())) {
            return event.source;
        }
        return event.context.transformSource(event.source);
    }
    inferContext(source) {
        for (const factory of this.contextFactories) {
            const context = factory.inferParseContext(source);
            if (context != null) {
                return context;
            }
        }
        return null;
    }
}
exports.TokenExpressionParser = TokenExpressionParser;
//# sourceMappingURL=TokenExpressionParser.js.map