(function () {
  "use strict";
  let navbar = document.querySelector("nav");
  let offsetY;
  window.addEventListener("scroll", () => {
    offsetY = window.pageYOffset;
    if (offsetY > 50) {
      navbar.style.cssText = "border-bottom: 2px solid #fff";
    }else{
        navbar.style.cssText = "border-bottom: unset";
    }
  });
})();
