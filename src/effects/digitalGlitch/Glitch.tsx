import React from "react";
import { randomise, setCharAt } from "../utils";

type props = {
  text: string;
  speed?: number;
  buffer?: number;
  glitchSpeed?: number;
  dontGlitch?: boolean;
  reverse?: boolean;
  style?: any;
  alphabet?: boolean;
  extendedAlphabet?: boolean;
  onMouseLeave?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onClick?: (event: any) => void;
  id?: string;
};

type state = {
  text: string;
  hasAnimated: boolean;
};

export default class Glitch extends React.Component<props, state> {
  public speed: number;
  public buffer: number;
  public total: number;
  public start = 0;

  alph: string;
  style: any;
  letters: string[];

  public glitchSpeed: number;
  isGlitched: boolean;
  glitchCycleTimer!: number;
  glitchTimers!: number[];
  timer: number;
  index: number;
  glitchWord: string;
  glitchMem: string;
  glitchLetter: number;
  glitchCycleSpeed!: number;

  constructor(props: any) {
    super(props);
    this.state = {
      text: props.text,
      hasAnimated: false,
    };
    this.isGlitched = false;
    this.timer = performance.now();
    this.glitchSpeed = this.props.glitchSpeed ? this.props.glitchSpeed : 5000;
    this.setGlitchTimers();

    this.glitchWord = "";
    this.glitchMem = "";
    this.glitchLetter = 0;

    this.index = 0;

    this.speed = this.props.speed ? this.props.speed : 50;

    this.buffer = this.props.buffer ? this.props.buffer : 5;
    this.total = props.text.length + this.buffer;
    this.style = this.props.style ? this.props.style : {};

    if (this.props.extendedAlphabet) {
      this.alph =
        "aàáâäæãåābcçćčdeèéêëēėęfghiîïíīįìjklłmnñńoôöòóœøōõpqrsßśštuûüùúūvwxyÿzžźż";
    } else {
      this.alph = "abcdefghijklmnopqrstuvwxyz";
    }

    this.letters = this.alph
      .split("")
      .concat(this.alph.toUpperCase().split(""));
  }

  generateRandomValue = () => {
    if (this.props.alphabet) {
      return this.letters[randomise(this.letters.length)];
    } else {
      return randomise(2).toString();
    }
  };

  returnToNormalText = (text: string) => {
    if (this.props.reverse) {
      text = setCharAt(
        text,
        text.length - this.start,
        this.props.text[text.length - this.start]
      );
    } else {
      text = setCharAt(text, this.start, this.props.text[this.start]);
    }
    this.start++;
    return text;
  };

  randomiseRemainingText = (text: string) => {
    if (this.props.reverse) {
      for (let j = 0; j < text.length - this.start; j++) {
        text = setCharAt(text, j, this.generateRandomValue());
      }
    } else {
      for (let j = this.start; j < text.length; j++) {
        text = setCharAt(text, j, this.generateRandomValue());
      }
    }
    return text;
  };

  renderText = () => {
    // If we reach the buffer, start returning the word
    let text = this.state.text;

    if (this.index >= this.buffer) {
      text = this.returnToNormalText(text);
    }

    text = this.randomiseRemainingText(text);

    if (this.index === this.total) {
      this.setState({ hasAnimated: true });
      this.glitchCycleTimer = performance.now();
    }
    this.index++;

    this.setState({
      text: text,
    });

    this.timer = performance.now();
  };

  animate = () => {
    if (performance.now() - this.timer >= this.speed) {
      if (!this.state.hasAnimated) this.renderText();
    }

    if (performance.now() - this.glitchCycleTimer >= this.glitchCycleSpeed) {
      if (this.state.hasAnimated && !this.props.dontGlitch) this.glitch();
    }

    requestAnimationFrame(this.animate);
  };

  setGlitchTimers = () => {
    this.glitchCycleTimer = performance.now();
    this.glitchCycleSpeed = randomise(this.glitchSpeed);
    this.glitchTimers = [this.glitchCycleSpeed + randomise(100), 0, 0].map(
      (_current, i, array) => {
        if (i == 2)
          return (array[i] += array[i - 1] ? array[i - 1] + randomise(300) : 0);
        return (array[i] += array[i - 1] ? array[i - 1] + randomise(100) : 0);
      }
    );
  };

  glitch() {
    if (this.state.text === this.props.text) {
      this.glitchWord = this.state.text;
      this.glitchLetter = randomise(this.glitchWord.length);
      // Keep glitched letter in memory
      this.glitchMem = this.glitchWord[this.glitchLetter];
      // Glitch word
      let newWord = setCharAt(
        this.glitchWord,
        this.glitchLetter,
        this.generateRandomValue()
      );
      this.setState({ text: newWord });
    }

    if (
      performance.now() - this.glitchCycleTimer >= this.glitchTimers[0] &&
      this.glitchTimers[0] !== 0
    ) {
      let newWord = setCharAt(
        this.glitchWord,
        this.glitchLetter,
        this.glitchMem
      );
      this.setState({ text: newWord });
      this.glitchTimers[0] = 0;
    }
    if (
      performance.now() - this.glitchCycleTimer >= this.glitchTimers[1] &&
      this.glitchTimers[1] !== 0
    ) {
      let newWord = setCharAt(
        this.glitchWord,
        this.glitchLetter,
        this.generateRandomValue()
      );
      this.setState({ text: newWord });
      this.glitchTimers[1] = 0;
    }
    if (performance.now() - this.glitchCycleTimer >= this.glitchTimers[2]) {
      let newWord = setCharAt(
        this.glitchWord,
        this.glitchLetter,
        this.glitchMem
      );
      console.log("Stupid");

      this.setState({ text: newWord });
      this.setGlitchTimers();
    }
  }

  componentDidMount() {
    window.addEventListener("visibilitychange", () => {
      // console.log("Blurr");
    });
    // Randomise the text for the initial display
    let text = this.state.text;
    text = this.randomiseRemainingText(text);
    this.setState({ text: text });
    // start animation
    this.animate();
  }

  componentWillUnmount() {}

  render() {
    return (
      <span
        style={this.style}
        onMouseEnter={(e: any) => {
          this.props.onMouseEnter && this.props.onMouseEnter(e);
        }}
        onMouseLeave={(e: any) => {
          this.props.onMouseLeave && this.props.onMouseLeave(e);
        }}
        onClick={(e: any) => {
          this.props.onClick && this.props.onClick(e);
        }}
        id={this.props.id && this.props.id}>
        {this.state.text}
      </span>
    );
  }
}
