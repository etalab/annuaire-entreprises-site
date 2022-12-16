import React from 'react';

export const SimpleSeparator = () => (
  <>
    <div className="simple-horizontal-separator">
      <span className="line" />
    </div>
    <style jsx>{`
      div.simple-horizontal-separator {
        width: 100%;
        padding: 40px 0;
      }
      div.simple-horizontal-separator > span.line {
        width: 50px;
        background-color: #dfdff1;
        height: 2px;
        margin: 0 10px;
      }
    `}</style>
  </>
);

export const HorizontalSeparator = () => (
  <>
    <div className="horizontal-separator layout-center">
      <span className="line" />
      <span className="circle" />
      <span className="line" />
    </div>
    <style jsx>{`
      div.horizontal-separator {
        width: 100%;
        padding: 40px 0;
      }
      div.horizontal-separator > span.line {
        width: 50px;
        background-color: #dfdff1;
        height: 2px;
        margin: 0 10px;
      }
      div.horizontal-separator > span.circle {
        width: 7px;
        height: 7px;
        border-radius: 20px;
        background-color: #dfdff1;
      }
    `}</style>
  </>
);
