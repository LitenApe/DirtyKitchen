// https://github.com/georgedoescode/generative-utils/blob/master/src/createCoordsTransformer.js
export function createCoordsTransformer(svg: SVGSVGElement) {
  const pt = svg.createSVGPoint();

  return function (e: MouseEvent) {
    pt.x = e.clientX;
    pt.y = e.clientY;

    return pt.matrixTransform(svg.getScreenCTM()?.inverse());
  };
}
