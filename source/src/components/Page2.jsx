import React from "react";
import Title from "./Title.jsx";
import Code from "./Code.jsx";
import SandBox from "./SandBox.jsx";
import Container from "./Container.jsx";
import pic from "../assets/images/box_02.png";
import "../css/page2.css";

function Page2() {
  const code = `
const proton = new Proton();
const emitter = new Proton.Emitter();

//set Rate
emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);

//add Initialize
emitter.addInitialize(new Proton.Radius(1, 12));
emitter.addInitialize(new Proton.Life(2, 4));
emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));

//add Behaviour
emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
emitter.addBehaviour(new Proton.Alpha(1, 0));

//set emitter position
emitter.p.x = canvas.width / 2;
emitter.p.y = canvas.height / 2;
emitter.emit();

//add emitter to the proton
proton.addEmitter(emitter);

// add canvas renderer
const renderer = new Proton.CanvasRenderer(canvas);
proton.addRenderer(renderer); 
`.trim();

  return (
    <Container dark={true}>
      <Title>Get started</Title>
      <Title size={3}>
        Proton is very simple, just need to write a dozen lines of code to
        achieve a particle animation effect
      </Title>

      <div className="column is-12">
        <div className="columns box">
          <div className="column is-8">
            <Code>{code}</Code>
          </div>

          <div className="column is-4">
            <SandBox></SandBox>
            <div className="container">
              <img className="page2-pic" src={pic} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Page2;
