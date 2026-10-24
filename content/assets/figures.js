document.querySelectorAll(".chart-box").forEach((box) => {
  const svg = box.querySelector("svg"), line = svg.querySelector(".crosshair");
  const tip = document.createElement("div"); tip.className = "tip"; box.append(tip);
  svg.querySelectorAll(".hit").forEach((hit) => {
    hit.addEventListener("pointerenter", () => {
      const x = hit.dataset.x; line.setAttribute("x1", x); line.setAttribute("x2", x);
      line.style.visibility = "visible"; tip.innerHTML = hit.dataset.tip;
      tip.style.display = "block";
      const scale = svg.clientWidth / svg.viewBox.baseVal.width;
      const left = x * scale + 12;
      tip.style.left = Math.min(left, box.clientWidth - tip.offsetWidth) + "px";
      tip.style.top = "8px";
    });
    hit.addEventListener("pointerleave", () => {
      line.style.visibility = "hidden"; tip.style.display = "none";
    });
  });
});
