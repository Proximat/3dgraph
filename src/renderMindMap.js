import React from "react";
import initializeScene from "./initializeScene";
import ThreeForceGraph from "three-forcegraph";
import renderToSprite from "./renderToSprite";
import MindMapNode from "./MindMapNode";
import * as THREE from "three";
import colorsByLevel from "./colorsByLevel";
import {
  AdobeXDSVG,
  AngularSVG,
  ArtificialIntelligenceSVG,
  AzureSVG,
  BlazorSVG,
  CSharpSVG,
  DevOpsSVG,
  DockerSVG,
  DotnetSVG,
  GitSVG,
  GoSVG,
  GraphQLSVG,
  JavaScriptSVG,
  KubernetesSVG,
  MongoDBSVG,
  PostgresqlSVG,
  PythonSVG,
  ReactSVG,
  TailwindCssSVG,
  TypeScriptSVG,
  VueSVG,
  CircleSVG,
  SqlServerSVG
} from "./components";

// import updateLinkPosition from "./updateLinkPosition";

const data = {
  nodes: [
    {
      id: "1",
      name: <CircleSVG />,
      val: 2,
      level: 0
    },
    {
      id: "2",
      name: <DotnetSVG />,
      val: 1,
      level: 2
    },
    {
      id: "3",
      name: <CSharpSVG />,
      val: 1,
      level: 2
    },
    {
      id: "4",
      name: <AzureSVG />,
      val: 1,
      level: 2
    },
    {
      id: "5",
      name: <ReactSVG />,
      val: 1,
      level: 2
    },
    {
      id: "6",
      name: <VueSVG />,
      val: 1,
      level: 2
    },
    {
      id: "7",
      name: <JavaScriptSVG />,
      val: 1,
      level: 2
    },
    {
      id: "8",
      name: <MongoDBSVG />,
      val: 1,
      level: 2
    },
    {
      id: "9",
      name: <GitSVG />,
      val: 1,
      level: 2
    },
    {
      id: "10",
      name: <BlazorSVG />,
      val: 1,
      level: 2
    },
    {
      id: "11",
      name: <AngularSVG />,
      val: 1,
      level: 2
    },
    {
      id: "12",
      name: <ArtificialIntelligenceSVG />,
      val: 1,
      level: 2
    },
    {
      id: "13",
      name: <AdobeXDSVG />,
      val: 1,
      level: 2
    },
    {
      id: "14",
      name: <DevOpsSVG />,
      val: 1,
      level: 2
    },
    {
      id: "15",
      name: <DockerSVG />,
      val: 1,
      level: 2
    },
    {
      id: "16",
      name: <KubernetesSVG />,
      val: 1,
      level: 2
    },
    {
      id: "17",
      name: <GoSVG />,
      val: 1,
      level: 2
    },
    {
      id: "18",
      name: <GraphQLSVG />,
      val: 1,
      level: 2
    },
    {
      id: "19",
      name: <PostgresqlSVG />,
      val: 1,
      level: 2
    },
    {
      id: "20",
      name: <PythonSVG />,
      val: 1,
      level: 2
    },
    {
      id: "21",
      name: <TailwindCssSVG />,
      val: 1,
      level: 2
    },
    {
      id: "22",
      name: <TypeScriptSVG />,
      val: 1,
      level: 2
    },
    {
      id: "23",
      name: <SqlServerSVG />,
      val: 1,
      level: 2
    }
  ],
  links: [
    {
      source: "1",
      target: "2",
      level: 0
    },
    {
      source: "1",
      target: "3",
      level: 0
    },
    {
      source: "1",
      target: "4",
      level: 0
    },
    {
      source: "1",
      target: "5",
      level: 0
    },
    {
      source: "1",
      target: "6",
      level: 0
    },
    {
      source: "1",
      target: "7",
      level: 0
    },
    {
      source: "1",
      target: "8",
      level: 0
    },
    {
      source: "1",
      target: "9",
      level: 0
    },
    {
      source: "1",
      target: "10",
      level: 0
    },
    {
      source: "1",
      target: "11",
      level: 0
    },
    {
      source: "1",
      target: "12",
      level: 0
    },
    {
      source: "1",
      target: "13",
      level: 0
    },
    {
      source: "1",
      target: "14",
      level: 0
    },
    {
      source: "1",
      target: "15",
      level: 0
    },
    {
      source: "1",
      target: "16",
      level: 0
    },
    {
      source: "1",
      target: "17",
      level: 0
    },
    {
      source: "1",
      target: "18",
      level: 0
    },
    {
      source: "1",
      target: "19",
      level: 0
    },
    {
      source: "1",
      target: "20",
      level: 0
    },
    {
      source: "1",
      target: "21",
      level: 0
    },
    {
      source: "1",
      target: "22",
      level: 0
    },
    {
      source: "1",
      target: "23",
      level: 0
    }
  ]
};

export default async function renderMindMap(div) {
  const { scene, renderer, camera, controls } = initializeScene(div, data);
  data.nodes = await Promise.all(
    data.nodes.map((node) =>
      renderToSprite(<MindMapNode label={node.name} level={node.level} />, {
        width: 128,
        height: 64
      }).then((sprite) => {
        sprite.renderOrder = 999;
        sprite.onBeforeRender = (renderer) => renderer.clearDepth();
        return { ...node, sprite };
      })
    )
  );
  const graph = new ThreeForceGraph().graphData(data);
  graph.nodeThreeObject(({ sprite }) => sprite);
  graph.linkMaterial(
    ({ level }) => new THREE.MeshBasicMaterial({ color: colorsByLevel[level] })
  );
  // graph.linkPositionUpdate(updateLinkPosition);
  // graph.numDimensions(2);
  graph.linkWidth(0.05);
  graph.scale.set(0.005, 0.005, 0.005);
  scene.add(graph);
  camera.lookAt(graph.position);

  (function animate() {
    graph.tickFrame();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    graph.rotation.y += 0.003;
  })();
}
