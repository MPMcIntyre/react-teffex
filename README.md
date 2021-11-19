# React text effects

Text Effects: Stateful React text effects for amazing websites

These effects return a `<span>` element with your text and desired effect. You can use them in links, headings, divs and spans alike.

# Effects

[Glitch](#glitch)

<a name="glitch"></a>

# Glitch

[CodeSandBox example](https://codesandbox.io/s/react-teffex-example-c759r?file=/src/App.js)

Have your text randomise between Roman alphabet letters or 1's and 0's and appear in sequence. The effect does discard timers on onMount, so for best practices be sure to remove or set the element to null on unMounting or rerendering.
### Usage


````
import React, {useEffect} from "react";
import {Glitch} from "react-teffex";

export default function AwesomeGlitchEffect(props) {

  let myGlitchEffects = (
    <div>
      <Glitch alphabet buffer={20} text={"This is glitchy text!"} />
      <Glitch
        alphabet
        reverse
        text={"This is glitchy text comming from the other side!"}
      />
      <br />
      <Glitch text={"This glitches as 1's and zeroes!"} />
      <br />
      <Glitch text={"This glitches as 1's and zeroes!"} />
    </div>
  );

  /* Best practice is to discard the effect when rerendered in order to avoid memory leaks or warnings thereof */

  useEffect(()=>{
    return (myGlitchEffects=null)
  },[])

  return (
    <div className="container">
      {myGlitchEffects}
    </div>
  );
}
````

Parameters

`<Glitch {parameters} />`

`text`:`string` The text you wish to display through the effect

`reverse`:`boolean` Reverse the direction of the glitch effect hwne it flips to the desired letter

`id`:`string` CSS id that can be added to your text for CSS modifications and events

`speed`:`number` Loop delay of the animation in ms (smaller is faster) (default = 50ms)

`glitchSpeed`: `number` Maximum delay before next glitch (the glitch timer uses a random value between 0 and the glitchSpeed in ms, smaller is faster) (default = 5000ms)

`buffer`: `number` Adds additional loops to the animation in order to delay the word revealing itself (default = 0)
  
`alphabet`: `boolean` Will use the Roman alphabet instead of 1's and 0's

`style`: `object` React styled components

`extendedAlphabet`: `boolean`; Will use the extended Roman alphabet (i.e. includes characters like ß, ę, į etc.)

`onClick`:`function` (event)=>{} Runs a function you provide with the event as the parameter

`onMouseEnter`:`function` (event)=>{} Runs a function you provide with the event as the parameter

`onMouseLeave`:`function` (event)=>{} Runs a function you provide with the event as the parameter

# Contributors

Please feel free to use, mix-up, improve, or add to the effects here. Please ensure that you use the format seen above when adding an effect, documentation is important.

Readme style:

1) Heading + Description

2) Contents (edit this when adding)

3) Effects (Be sure to include these!)
   3.1. Effect name
   3.2 CodeSandBox example
   3.3 Effect description
   3.4 Usage
   3.5 Effect parameters

How to add to the content section:

Add a `<a name="#your_effect_name_here"></a>` before your effect's section

Add `[your_effect_name_here](#your_effect_name_here)` to the content
