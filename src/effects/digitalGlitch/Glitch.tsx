import React from "react";
import { randomise, setCharAt } from "../utils";

type props = {
  text: string;
  speed: number;
  buffer: number;
  glitchSpeed: number;
  reverse: boolean;
  style: any;
  alphabet: boolean;
  extendedAlphabet: boolean;
  onMouseLeave: (event: any) => void;
  onMouseEnter: (event: any) => void;
  onClick: (event: any) => void;
  id: string;
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
  private timer: any = [];
  public alphabet: boolean;

  alph: string;
  style: any;
  letters: string[];
  public glitchSpeed: number;

  constructor(props: any) {
    super(props);
    this.state = {
      text: props.text,
      hasAnimated: false,
    };

    this.speed = this.props.speed ? this.props.speed : 50;
    this.buffer = this.props.buffer ? this.props.buffer : 5;
    this.total = props.text.length + this.buffer;
    this.glitchSpeed = this.props.glitchSpeed ? this.props.glitchSpeed : 5000;
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

  animate = () => {
    if (!this.state.hasAnimated) {
      for (let i = 0; i < this.total; i++) {
        let text = this.state.text;
        let timer = setTimeout(() => {
          // If we reach the buffer, start returning the word
          if (i >= this.buffer) {
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
          }

          if (i === this.total - 1) {
            this.glitch();
          }

          if (this.props.reverse) {
            for (let j = 0; j < text.length - this.start; j++) {
              text = setCharAt(text, j, this.generateRandomValue());
            }
          } else {
            for (let j = this.start; j < text.length; j++) {
              text = setCharAt(text, j, this.generateRandomValue());
            }
          }

          this.setState({
            text: text,
            hasAnimated: true,
          });
        }, i * this.speed);
        this.timer.push(timer);
      }
    }
  };

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

  glitch() {
    const glitchTimer = setTimeout(async () => {
      let word = this.state.text;
      let letter = randomise(word.length);
      // Keep glitched letter in memory
      let mem = word[letter];
      // Glitch word
      let newWord = setCharAt(word, letter, this.generateRandomValue());
      this.setState({ text: newWord });
      setTimeout(() => {
        let newWord = setCharAt(word, letter, mem);
        this.setState({ text: newWord });
        setTimeout(() => {
          let newWord = setCharAt(word, letter, this.generateRandomValue());
          this.setState({ text: newWord });
          setTimeout(() => {
            let newWord = setCharAt(word, letter, mem);
            this.setState({ text: newWord });
            this.glitch();
          }, randomise(300));
        }, randomise(100));
      }, randomise(100));
    }, randomise(this.glitchSpeed));
    this.timer.push(glitchTimer);
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    for (let i = 0; i < this.timer.length; i++) {
      clearTimeout(this.timer[i]);
    }
  }

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
