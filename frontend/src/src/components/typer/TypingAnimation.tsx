import React from 'react'
import { TypeAnimation } from 'react-type-animation';

export default function TypingAnimation() {
  return (
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'Chat with AI',
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      'Build With OpenAI',
      2000,
      'Own Cutsomize GPT',
      1500,
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '60px', display: 'inline-block', color: 'white', textShadow:"1px 1px 20px #000" }}
    repeat={Infinity}
  />
  )
}
