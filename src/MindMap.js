import React, { createRef, useEffect } from "react";
import renderMindMap from "./renderMindMap";

export default function MindMap() {
  const divRef = createRef();
  useEffect(() => renderMindMap(divRef.current), [divRef]);
  return <div ref={divRef} />;
}
