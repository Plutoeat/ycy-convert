function get_num(e, t) {
  var a = 10;
  if (e >= 268850) {
    var n = e + t;
    switch (((n = (n = (n = md5(n)).substr(-1)).charCodeAt()), (n %= 10))) {
      case 0:
        a = 2;
        break;
      case 1:
        a = 4;
        break;
      case 2:
        a = 6;
        break;
      case 3:
        a = 8;
        break;
      case 4:
        a = 10;
        break;
      case 5:
        a = 12;
        break;
      case 6:
        a = 14;
        break;
      case 7:
        a = 16;
        break;
      case 8:
        a = 18;
        break;
      case 9:
        a = 20;
    }
  }
  return a;
}

function onImageLoaded(e, t, r, aid) {
  var a = t.getContext("2d"),
    n = e.width,
    d = e.naturalWidth,
    i = e.naturalHeight;
  (t.width = d),
    (t.height = i),
    (n > e.parentNode.offsetWidth || 0 == n) && (n = e.parentNode.offsetWidth),
    (t.style.width = n + "px"),
    (t.style.display = "block");
  for (var s = get_num(aid, r), l = parseInt(i % s), o = d, m = 0; m < s; m++) {
    var c = Math.floor(i / s),
      g = c * m,
      h = i - c * (m + 1) - l;
    0 == m ? (c += l) : (g += l), a.drawImage(e, 0, h, o, c, 0, g, o, c);
  }
}

var img_src = window.location.href.split("?")[1].split("=")[1];
var r = img_src.split("/")[6].split(".")[0];
var aid = img_src.split("/")[5];
var image = document.querySelector(".input");
var canvas = document.querySelector("canvas");
var target = document.querySelector(".target");
image.src = img_src;
image.crossOrigin = "*";
document.querySelector(".input").onload = function () {
  onImageLoaded(image, canvas, r, aid);
  target.src = canvas.toDataURL("image/png");
  image.style.display = "none";
  canvas.style.display = "none";
  // target.style.display = "none";
};
