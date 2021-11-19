import React from "react";
declare type props = {
    text: string;
    speed: number;
    buffer: number;
    glitchSpeed: number;
    reverse: boolean;
    style: any;
    alphabet: boolean;
    extendedAlphabet: boolean;
    onMouseLeave: (event: any) => {};
    onMouseEnter: (event: any) => {};
    onClick: (event: any) => {};
    id: string;
};
declare type state = {
    text: string;
    hasAnimated: boolean;
};
export default class Glitch extends React.Component<props, state> {
    speed: number;
    buffer: number;
    total: number;
    start: number;
    private timer;
    alphabet: boolean;
    alph: string;
    style: any;
    letters: string[];
    glitchSpeed: number;
    constructor(props: any);
    generateRandomValue: () => string;
    animate: () => void;
    glitch(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
