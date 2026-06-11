/* Pixel agent figures — faithful port of the app's AgentFigure.tsx.
   1 logical pixel = 2 SVG units on a 20x30 grid -> 40x60 viewBox. */
(function () {
  const P = 2;
  const r = (x, y, w, h, c) =>
    `<rect x="${x * P}" y="${y * P}" width="${w * P}" height="${h * P}" fill="${c}" shape-rendering="crispEdges"/>`;

  const O = "#0e1a0a", SK = "#ffe0b0", WT = "#f2f0ec", NT = "#181822", SH = "#0e0e14";

  function shade(hex, amt) {
    const n = parseInt(hex.replace("#", ""), 16);
    if (Number.isNaN(n)) return hex;
    const R = Math.min(255, Math.max(0, ((n >> 16) & 0xff) + amt));
    const G = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
    const B = Math.min(255, Math.max(0, (n & 0xff) + amt));
    return "#" + (((R << 16) | (G << 8) | B) >>> 0).toString(16).padStart(6, "0");
  }

  const DEFAULT_ACCENT = {
    coder: "#4a8eff", researcher: "#e67e22", cloud: "#a78bfa",
    local: "#58a6ff", default: "#6a7a9a",
  };

  function getOutfit(a, accent) {
    switch (a) {
      case "coder": {
        const hood = shade(accent, -50), hoodHi = shade(accent, -25), glow = "#3dff90";
        return {
          garment: hood, garmentHi: hoodHi, cuff: "#1a2a1a", collar: hood,
          torso: r(8,17,4,9,"#16201c")+r(7,17,1,4,hoodHi)+r(12,17,1,4,hoodHi)
            +r(9,19,2,5,"#0a140a")+r(9,19,2,1,glow)+r(9,21,1,1,glow)+r(10,23,1,1,glow),
          hair: r(5,5,10,3,"#2b2f3a")+r(7,3,2,2,"#2b2f3a")+r(11,3,2,2,"#2b2f3a")
            +r(5,4,10,1,"#26262e")+r(4,7,1,4,"#26262e")+r(15,7,1,4,"#26262e"),
          face: r(6,9,3,1,"#101820")+r(11,9,3,1,"#101820")+r(9,9,1,1,"#101820")+r(7,9,1,1,glow),
          mouth: r(8,12,4,1,O), floating: "",
        };
      }
      case "researcher": {
        const jacket = shade(accent,-35), jacketHi = shade(accent,-10), tie = shade(accent,15);
        return {
          garment: jacket, garmentHi: jacketHi, cuff: "#f2ece0", collar: "#f2ece0",
          torso: r(9,17,2,9,"#f2ece0")+r(9,18,2,6,tie)+r(9,18,2,1,O)
            +r(6,17,2,4,jacketHi)+r(12,17,2,4,jacketHi),
          hair: r(5,5,10,3,"#5a4030")+r(5,6,2,4,"#5a4030")+r(13,6,2,4,"#5a4030")+r(7,4,6,1,"#6a5040"),
          face: r(6,9,3,1,O)+r(6,10,3,1,O)+r(6,10,1,1,"#a8d8ff")+r(11,9,3,1,O)+r(11,10,3,1,O)+r(13,10,1,1,"#a8d8ff")+r(9,10,1,1,O),
          mouth: r(7,12,6,1,O)+r(8,12,2,1,SK)+r(10,12,2,1,SK),
          floating: r(16,2,3,1,accent)+r(16,4,3,1,accent)+r(16,3,1,1,accent)+r(18,3,1,1,accent)+r(17,3,1,1,"#cfe8ff")+r(19,5,1,2,shade(accent,-25)),
        };
      }
      case "cloud": {
        const robe = shade(accent,-30), robeHi = shade(accent,-5), robeLt = shade(accent,15);
        return {
          garment: robe, garmentHi: robeHi, cuff: robeLt, collar: robe,
          torso: r(9,17,2,9,robeLt)+r(6,17,2,4,robeHi)+r(12,17,2,4,robeHi)+r(10,20,1,1,"#ffe066"),
          hair: r(5,5,10,3,"#9aa0b0")+r(5,6,2,5,"#9aa0b0")+r(13,6,2,5,"#9aa0b0")+r(6,4,8,1,"#b6bcc8"),
          face: r(6,13,8,1,"#b8bcc8")+r(7,14,6,1,"#b8bcc8"),
          mouth: r(7,12,6,1,O),
          floating: r(14,2,6,1,"#dfe6ff")+r(15,1,4,1,"#eef2ff")+r(16,0,2,1,"#ffffff")+r(13,4,1,1,"#ffe066"),
        };
      }
      case "local": {
        const sweater = shade(accent,-40), sweaterHi = shade(accent,-15);
        return {
          garment: sweater, garmentHi: sweaterHi, cuff: sweater, collar: sweater,
          torso: r(4,21,12,1,shade(accent,8))+r(8,17,4,2,sweaterHi),
          hair: r(5,4,10,4,"#4a3828")+r(5,6,2,4,"#4a3828")+r(13,6,2,4,"#4a3828"),
          face: r(6,11,1,1,"#ff9a9a")+r(13,11,1,1,"#ff9a9a"),
          mouth: r(7,11,1,1,O)+r(12,11,1,1,O)+r(7,12,6,1,O)+r(8,12,4,1,WT),
          floating: "",
        };
      }
      default: {
        const blazer = shade(accent,-45), blazerHi = shade(accent,-20);
        return {
          garment: blazer, garmentHi: blazerHi, cuff: WT, collar: blazer,
          torso: r(9,17,2,9,WT)+r(9,18,2,1,accent)+r(9,19,2,1,O)+r(9,20,2,6,accent)+r(9,18,2,1,O)
            +r(7,17,2,4,blazerHi)+r(6,17,1,2,blazerHi)+r(11,17,2,4,blazerHi)+r(13,17,1,2,blazerHi)
            +r(5,21,3,2,WT)+r(5,21,3,1,accent)+r(6,20,1,1,accent),
          hair: r(5,5,10,3,"#3a322a")+r(5,6,2,5,"#3a322a")+r(13,6,2,5,"#3a322a")
            +r(6,4,8,2,"#3a322a")+r(7,3,6,1,"#3a322a")+r(10,4,2,2,"#4a4034")
            +r(5,10,1,2,"#3a322a")+r(14,10,1,2,"#3a322a"),
          face: "",
          mouth: r(7,12,6,1,O)+r(8,12,2,1,SK)+r(10,12,2,1,SK),
          floating: "",
        };
      }
    }
  }

  /** opts: { archetype, color, state ('idle'|'working'|'thinking'), scale } */
  window.agentFigureSVG = function (opts) {
    opts = opts || {};
    const a = opts.archetype || "default";
    const accent = opts.color || DEFAULT_ACCENT[a] || DEFAULT_ACCENT.default;
    const state = opts.state || "idle";
    const scale = opts.scale || 1;
    const working = state === "working";
    const o = getOutfit(a, accent);

    const legs =
      `<g class="fn-leg-l">${r(5,25,4,3,NT)}${r(5,27,3,2,SH)}</g>` +
      `<g class="fn-leg-r">${r(11,25,4,3,NT)}${r(12,27,3,2,SH)}</g>`;
    const leftArm = r(0,18,4,8,o.garment)+r(0,24,4,2,o.cuff)+r(0,24,5,2,SK);
    const rightArm = `<g class="fn-arm-r ${working ? "working" : ""}">${r(16,18,4,8,o.garment)}${r(16,24,4,2,o.cuff)}${r(15,24,5,2,SK)}</g>`;
    const eyes = r(7,9,2,2,WT)+r(11,9,2,2,WT)+r(8,10,1,1,O)+r(12,10,1,1,O);

    let fx = "";
    if (working) {
      fx = [0,1,2].map(i =>
        `<rect x="${(14+i*3)*P}" y="0" width="${P}" height="${P}" fill="${accent}" shape-rendering="crispEdges" style="animation:fndot 0.7s ease-in-out ${i*0.2}s infinite"/>`
      ).join("");
    } else if (state === "thinking") {
      fx = `<g style="animation:fndot 1.1s ease-in-out infinite">${r(15,4,2,2,"#ffd166")}${r(17,2,2,2,"#ffd166")}${r(19,0,3,3,"#ffd166")}</g>`;
    }

    const body =
      r(4,17,12,9,o.garment)+r(4,17,1,8,o.garmentHi)+r(15,17,1,8,o.garmentHi)+o.torso;
    const neck = r(8,14,4,2,WT)+r(9,14,2,1,O)+r(7,15,6,3,SK)+r(7,15,6,1,o.collar);
    const head = r(5,7,10,9,SK);

    return `<svg class="agent-fig ${working ? "working" : ""}" width="${40*scale}" height="${60*scale}" viewBox="0 0 40 60" style="overflow:visible;image-rendering:pixelated">
      <g class="fn-root ${working ? "working" : ""}">
        <ellipse cx="20" cy="59" rx="11" ry="2" fill="rgba(0,0,0,0.28)"/>
        ${legs}${body}${leftArm}${rightArm}${neck}${head}${o.hair}${eyes}${o.face}${o.mouth}${o.floating}${fx}
      </g>
    </svg>`;
  };
})();
