var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import { randomise, setCharAt } from "../utils";
var Glitch = /** @class */ (function (_super) {
    __extends(Glitch, _super);
    function Glitch(props) {
        var _this = _super.call(this, props) || this;
        _this.start = 0;
        _this.timer = [];
        _this.generateRandomValue = function () {
            if (_this.props.alphabet) {
                return _this.letters[randomise(_this.letters.length)];
            }
            else {
                return randomise(2).toString();
            }
        };
        _this.animate = function () {
            if (!_this.state.hasAnimated) {
                var _loop_1 = function (i) {
                    var text = _this.state.text;
                    var timer = setTimeout(function () {
                        // If we reach the buffer, start returning the word
                        if (i >= _this.buffer) {
                            if (_this.props.reverse) {
                                text = setCharAt(text, text.length - _this.start, _this.props.text[text.length - _this.start]);
                            }
                            else {
                                text = setCharAt(text, _this.start, _this.props.text[_this.start]);
                            }
                            _this.start++;
                        }
                        if (i === _this.total - 1) {
                            _this.glitch();
                        }
                        if (_this.props.reverse) {
                            for (var j = 0; j < text.length - _this.start; j++) {
                                text = setCharAt(text, j, _this.generateRandomValue());
                            }
                        }
                        else {
                            for (var j = _this.start; j < text.length; j++) {
                                text = setCharAt(text, j, _this.generateRandomValue());
                            }
                        }
                        _this.setState({
                            text: text,
                            hasAnimated: true,
                        });
                    }, i * _this.speed);
                    _this.timer.push(timer);
                };
                for (var i = 0; i < _this.total; i++) {
                    _loop_1(i);
                }
            }
        };
        _this.state = {
            text: props.text,
            hasAnimated: false,
        };
        _this.speed = _this.props.speed ? _this.props.speed : 50;
        _this.buffer = _this.props.buffer ? _this.props.buffer : 5;
        _this.total = props.text.length + _this.buffer;
        _this.glitchSpeed = _this.props.glitchSpeed ? _this.props.glitchSpeed : 5000;
        _this.style = _this.props.style ? _this.props.style : {};
        if (_this.props.extendedAlphabet) {
            _this.alph =
                "aàáâäæãåābcçćčdeèéêëēėęfghiîïíīįìjklłmnñńoôöòóœøōõpqrsßśštuûüùúūvwxyÿzžźż";
        }
        else {
            _this.alph = "abcdefghijklmnopqrstuvwxyz";
        }
        _this.letters = _this.alph
            .split("")
            .concat(_this.alph.toUpperCase().split(""));
        return _this;
    }
    // deAnimate() {
    //   this.start = 0;
    //   for (let i = 0; i < this.total; i++) {
    //     let text = this.state.text;
    //     let timer = setTimeout(() => {
    //       // If we reach the buffer, start returning the word
    //       if (i >= this.buffer) {
    //         text = setCharAt(text, this.start, this.generateRandomValue());
    //         this.start++;
    //       }
    //       if (i === this.total - 1) {
    //         this.glitchSpeed && this.glitch();
    //       }
    //       this.setState({
    //         text: text,
    //       });
    //     }, i * this.speed);
    //     this.timer.push(timer);
    //   }
    // }
    Glitch.prototype.glitch = function () {
        var _this = this;
        var glitchTimer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var word, letter, mem, newWord;
            var _this = this;
            return __generator(this, function (_a) {
                word = this.state.text;
                letter = randomise(word.length);
                mem = word[letter];
                newWord = setCharAt(word, letter, this.generateRandomValue());
                this.setState({ text: newWord });
                setTimeout(function () {
                    var newWord = setCharAt(word, letter, mem);
                    _this.setState({ text: newWord });
                    setTimeout(function () {
                        var newWord = setCharAt(word, letter, _this.generateRandomValue());
                        _this.setState({ text: newWord });
                        setTimeout(function () {
                            var newWord = setCharAt(word, letter, mem);
                            _this.setState({ text: newWord });
                            _this.glitch();
                        }, randomise(300));
                    }, randomise(100));
                }, randomise(100));
                return [2 /*return*/];
            });
        }); }, randomise(this.glitchSpeed));
        this.timer.push(glitchTimer);
    };
    Glitch.prototype.componentDidMount = function () {
        this.animate();
    };
    Glitch.prototype.componentWillUnmount = function () {
        for (var i = 0; i < this.timer.length; i++) {
            clearTimeout(this.timer[i]);
        }
    };
    Glitch.prototype.render = function () {
        var _this = this;
        return (React.createElement("span", { style: this.style, onMouseEnter: function (e) {
                _this.props.onMouseEnter && _this.props.onMouseEnter(e);
            }, onMouseLeave: function (e) {
                _this.props.onMouseLeave && _this.props.onMouseLeave(e);
            }, onClick: function (e) {
                _this.props.onClick && _this.props.onClick(e);
            }, id: this.props.id && this.props.id }, this.state.text));
    };
    return Glitch;
}(React.Component));
export default Glitch;
