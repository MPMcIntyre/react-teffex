# React text effects

Text Effects: Stateful React text effects for amazing websites

These effects return a `<span>` element with your text and desired effect. You can use them in links, headings, divs and spans alike. These effects use RAF (request animation frame) for optimal performance and less reliance on setTimeout/setInterval.

# Effects

[Glitch](#glitch)

[Typewriter](#typewriter)


<a name="glitch"></a>

# Glitch

[CodeSandBox example](https://codesandbox.io/s/react-teffex-example-c759r)

Have your text randomise between Roman alphabet letters or 1's and 0's and appear in sequence. The effect does discard timers on onMount, so for best practices be sure to remove or set the element to null on unMounting or rerendering.

Note: For the best effect, use a font-family with consistent letter spacing e.g. Courier New, Courier, monospace
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

`dontGlitch`:`boolean` specify if you do not want the text to glitch after initial animation

`buffer`: `number` Adds additional loops to the animation in order to delay the word revealing itself (default = 0)
  
`alphabet`: `boolean` Will use the Roman alphabet instead of 1's and 0's

`style`: `object` React styled components

`extendedAlphabet`: `boolean`; Will use the extended Roman alphabet (i.e. includes characters like ß, ę, į etc.)

`onClick`:`function` (event)=>{} Runs a function you provide with the event as the parameter

`onMouseEnter`:`function` (event)=>{} Runs a function you provide with the event as the parameter

`onMouseLeave`:`function` (event)=>{} Runs a function you provide with the event as the parameter

<a name="typewriter"></a>

# Typewriter

[CodeSandBox example](https://codesandbox.io/s/react-teffex-typewriter-example-wx8ib)

One of the most elegant typewriter effects for react. No setTimeout or setInterfals used, everything is based on RAF with indexed values for a super lightweight interface. Highly customizable, from the initial delay, to the stutter delay, stutter chance,  

### Usage


````
import React from "react";
import {Typewriter} from "react-teffex";

export default function AwesomeGlitchEffect(props) {

  return (
    <div>
      <Typewriter text={"This is a general typewriter"} />
      <Typewriter
        cycle={["This will cycle", "and stop"]}
      />
      <Typewriter
        typeSettings={{ initialDelay: 1000 }}
        text={"This will cycle "}
        cycle={["forever", "and ever"]}
        loop
      />
    </div>
  );

}
````

Parameters

`<Typewriters {parameters} />`

`text`:`string` The text you wish to display through the effect (persistant)

`cycle`:`string[]` Arrays that will display, backspace after cycleDelay time, then display the next item. If it is the last item and no loop prop is provided, it will persist.

`cycleDelay`:`number` Amount of time between each cycle in ms

`id`:`string` CSS id that can be added to your text for CSS modifications and events

`loop`: `boolean` if true, will continuously loop through each cycle provided

`typeSettings.stutterTime`: `number` The delay when stuttering (pause typing) in ms

`typeSettings.stutterChance`: `number` Chance out of 10 (actually 9) to stutter

`typeSettings.typeDelay`: `number` The delay between each character being typed in ms (determines the type speed)

`typeSettings.initialDelay`: `number` Initial delay before effect starts in ms

`cursorSettings.color`: `string` Colour of the cursor

`cursorSettings.cursorBlinkSpeed`: `string` Delay time between cursor blinking in ms

`style`: `object` React styled components

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
