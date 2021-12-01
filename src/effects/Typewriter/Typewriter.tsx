import React from "react";
import { randomise } from "../utils";

type props = {
  text?: string;
  style?: any;
  cycle?: string[];
  cycleDelay?: number;
  loop?: boolean;
  typeSettings?: {
    stutterTime?: number;
    typeDelay?: number;
    initialDelay?: number;
    stutterChance: number;
  };
  cursorSettings?: {
    cursorBlinkSpeed?: number;
    color?: string;
  };
  onMouseLeave?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onClick?: (event: any) => void;
  id?: string;
};
type states = {
  text: string[];
  cursor: boolean;
  typing: boolean;
  reverseType: boolean;
  hasCycled: boolean;
  cycleEnded: boolean;
};
export default class Typewriter extends React.Component<props, states> {
  cursorNormalStyle: any;
  cursorInvisibleStyle: any;
  cursorBlinkTimer: number;
  typeTimer: number;
  typeDelay: number;
  index: number;
  cursorBlinkSpeed: number;
  backgroundColor: any;
  stutterInterval: number;
  stutterTime: number;
  text: string;
  cycleIndex: number;
  cycleDelay: number;
  cycleTimer: number;
  initialDelay: number;
  isActive: any;

  constructor(props: props) {
    super(props);
    this.state = {
      text: [], // The text currently being typed
      cursor: true, // Blinking options
      typing: false,
      reverseType: false,
      hasCycled: false,
      cycleEnded: false,
    };

    // Error checking:
    checkPropsForErrors(this.props);

    // isMounted check
    this.isActive = React.createRef();

    // Type settings
    this.index = 0;
    this.stutterTime = this.props.typeSettings?.stutterTime
      ? this.props.typeSettings.stutterTime
      : 0;
    this.typeTimer = window.performance.now();
    this.stutterInterval = 0;
    this.text = this.props.text ? this.props.text : "";
    this.typeDelay = this.props.typeSettings?.typeDelay
      ? this.props.typeSettings.typeDelay
      : 100;
    this.initialDelay = this.props.typeSettings?.initialDelay
      ? this.props.typeSettings.initialDelay
      : 0;

    // Cycle settings
    this.cycleIndex = 0;
    this.cycleDelay = this.props.cycleDelay ? this.props.cycleDelay : 1000;
    this.cycleTimer = 0;

    // Cursor settings
    this.cursorBlinkTimer = window.performance.now();
    this.cursorBlinkSpeed = this.props.cursorSettings?.cursorBlinkSpeed
      ? this.props.cursorSettings.cursorBlinkSpeed
      : 500;

    // Cursor styles
    this.cursorInvisibleStyle = {
      opacity: "0",
      overflow: "hidden",
    };

    this.cursorNormalStyle = {
      backgroundColor: this.props.cursorSettings?.color
        ? this.props.cursorSettings.color
        : "black",
      color: this.props.cursorSettings?.color
        ? this.props.cursorSettings.color
        : "black",
      overflow: "hidden",
    };
  }

  // This function adds a delay (or stutter) while typing based on the chance that a random value with a maximum of 10 is smaller than the prescribed chance variable (default is 1)
  shouldIStutter = () => {
    let chance = this.props.typeSettings?.stutterChance
      ? this.props.typeSettings.stutterChance
      : 2;
    // Chance
    if (randomise(10) < chance) {
      this.stutterInterval = this.stutterTime;
    } else {
      this.stutterInterval = 0;
    }
  };

  // This function appends the next letter to the text state and runs the should I stutter function
  type = () => {
    if (this.isActive.current) {
      let newText: string[] = [];
      if (this.state.reverseType) {
        newText = this.state.text;
        newText.pop();
      } else {
        newText = [...this.state.text, this.text.split("")[this.index]];
      }
      this.setState({
        text: newText,
        typing: true,
        cursor: true,
      });
      this.index++;
      if (this.state.reverseType) {
        this.stutterInterval = 0;
      } else {
        this.shouldIStutter();
      }
    }
  };

  handleCycle = () => {
    if (this.isActive.current) {
      // If the cycle index is larger than the array length, loop ? set index to 0 : updateState
      if (this.cycleIndex > this.props.cycle!.length - 1) {
        if (this.props.loop) {
          this.cycleIndex = 0;
        } else {
          this.isActive.current && this.setState({ cycleEnded: true });
        }
      }
      // If it is the first index, do not pause, continue typing
      if (!this.state.hasCycled) {
        this.text = this.props.cycle![0];
        this.index = 0;
        this.isActive.current && this.setState({ hasCycled: true });
        this.cycleTimer = 0;
      } else {
        // If not the first value
        if (window.performance.now() - this.cycleTimer >= this.cycleDelay) {
          this.cycleTimer = 0;
          this.index = 0;
          this.text = this.props.cycle![this.cycleIndex];
          if (this.state.reverseType) {
            this.isActive.current && this.setState({ reverseType: false });
            if (
              this.cycleIndex === this.props.cycle!.length - 1 &&
              !this.props.loop
            )
              this.cycleIndex++;
          } else {
            this.cycleIndex++;
            this.isActive.current && this.setState({ reverseType: true });
          }
        }
      }
    }
  };

  animate = () => {
    if (this.isActive.current) {
      // Type
      if (
        window.performance.now() - this.typeTimer >=
        this.typeDelay + this.stutterInterval + this.initialDelay
      ) {
        if (this.initialDelay) this.initialDelay = 0;
        this.typeTimer = window.performance.now();
        // If the current text is not done typing, continue typing
        if (this.index <= this.text.length - 1) {
          this.type();
        } else {
          if (this.cycleTimer === 0) {
            // this.setState({ reverseType: false });
            this.cycleTimer = window.performance.now();
          }
          /* If the current text is done typing:
        1) Check for cycled components
          - False : Blink (setState({typing:false}))
          - True : if the delay time is larger than the cursor blink time -- blink -- then run cycler 

        */
          // Catch the first time that the type rotation has completed

          this.props.cycle && !this.state.cycleEnded && this.handleCycle();

          // We should not be typing whenm the index exceeds the length of the string
          if (this.state.typing) {
            this.isActive.current && this.setState({ typing: false });
          }
        }
      }

      // Cursor blink
      if (
        window.performance.now() - this.cursorBlinkTimer >=
        this.cursorBlinkSpeed
      ) {
        this.cursorBlinkTimer = window.performance.now();
        if (!this.state.typing) {
          this.isActive.current &&
            this.setState({ cursor: !this.state.cursor });
        }
      }

      this.isActive.current && requestAnimationFrame(this.animate);
    }
  };

  componentDidMount() {
    this.isActive.current = true;
    this.animate();
  }

  componentWillUnmount() {
    this.isActive.current = false;
  }

  render() {
    return (
      <span
        onClick={this.props.onClick && this.props.onClick}
        onMouseEnter={this.props.onMouseEnter && this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave && this.props.onMouseLeave}
        id={this.props.id && this.props.id}
        style={this.props.style && this.props.style}>
        {this.state.text.join("")}
        {this.state.cursor ? (
          <span
            style={this.cursorNormalStyle}
            onSelect={(e) => {
              e.preventDefault();
            }}>
            {/* blank space */}
            ‏‏‎ ‎
          </span>
        ) : (
          <span
            style={this.cursorInvisibleStyle}
            onSelect={(e) => {
              e.preventDefault();
            }}>
            {/* blank space */}
            ‏‏‎ ‎
          </span>
        )}
      </span>
    );
  }
}

function checkPropsForErrors(props: props) {
  if (props.cycle && !Array.isArray(props.cycle))
    throw new TypeError("Exected an array for 'cycle' prop");
  if (props.text && typeof props.text !== "string")
    throw new TypeError("Exected a string for 'text' prop");
  if (props.text && typeof props.text !== "string")
    throw new TypeError("Exected a string for 'text' prop");
  if (props.onMouseLeave && typeof props.onMouseLeave !== "function")
    throw new TypeError("Exected a function for 'onMouseLeave' prop");
  if (props.onMouseEnter && typeof props.onMouseEnter !== "function")
    throw new TypeError("Exected a function for 'onMouseEnter' prop");
  if (props.onClick && typeof props.onClick !== "function")
    throw new TypeError("Exected a function for 'onClick' prop");
  if (props.loop && !props.cycle)
    throw new TypeError("Cannot loop when no cycle is provided");
}
