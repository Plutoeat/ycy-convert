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

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]),
     n = bstr.length,
     u8arr = new Uint8Array(n);
 while (n--) {
     u8arr[n] = bstr.charCodeAt(n);
 }
 return new Blob([u8arr], { type: mime });
}

window.onload = function () {
  var img_src = window.location.href.split("?")[1].split("&")[0].split("=")[1];
  var myaccessKeyId = window.location.href
    .split("?")[1]
    .split("&")[1]
    .split("=")[1];
  var myaccessKeySecret = window.location.href
    .split("?")[1]
    .split("&")[2]
    .split("=")[1];
  var aid = img_src.split("/")[5];
  var r = img_src.split("/")[6].split(".")[0];
  var image = document.querySelector(".input");
  var canvas = document.querySelector("canvas");
  var pathname = aid+'/'+r+'.png';
  image.src = img_src;
  image.crossOrigin = "*";
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "oss-cn-chengdu",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: myaccessKeyId,
    accessKeySecret: myaccessKeySecret,
    // 填写Bucket名称。
    bucket: "jmtt",
  });
  async function putObject(pathname, data) {
    try {
      // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
      // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
      // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
      const result = await client.put(
        pathname,
        data
        //{headers}
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  image.onload = function () {
    onImageLoaded(image, canvas, r, aid);
    const blob = dataURLtoBlob(canvas.toDataURL("image/png"));
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload=function(event){
      const buffer = new OSS.Buffer(event.target.result);
      // putObject(pathname, buffer);
    }
  };
};
