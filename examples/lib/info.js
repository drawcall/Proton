(function() {
  function substrUrl(url) {
    if (url.indexOf("?") !== -1) {
      return url.split("?")[0];
    }
    return url;
  }

  function createCon() {
    var con = document.createElement("div");
    con.style.position = "absolute";
    con.style.right = "20px";
    con.style.top = "10px";
    con.style.zIndex = 999;
    con.style.color = "#fff";

    return con;
  }

  function createText(text, style) {
    var span = document.createElement("span");
    span.style.color = style || "#fff";
    span.innerText = text;
    return span;
  }

  function createSourceLink(url, style) {
    var link = document.createElement("a");
    link.style.color = style || "#999";
    link.target = "_blank";
    link.href = url;
    link.innerText = substrUrl(url);
    return link;
  }

  function createEs5Link(url, style) {
    var icon = document.createElement("div");
    icon.style.marginLeft = "8px";
    icon.style.padding = "0 6px";
    icon.style.fontSize = "10px";
    icon.style.cursor = "pointer";
    icon.style.display = "inline-block";
    icon.style.backgroundColor = style || "#1e90ff";

    var link = document.createElement("a");
    link.style.color = "#000";
    link.style.textDecoration = "none";
    link.target = "_blank";
    link.href = url;
    link.innerText = "es5";
    icon.appendChild(link);

    return icon;
  }

  function isMobile() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isMiniScreen() {
    var w = 780;
    if (window.innerWidth <= w) {
      return true;
    } else {
      return false;
    }
  }

  window.appendInfo = function(source, es5, conf) {
    if (isMobile() || isMiniScreen()) return;

    conf = conf || {};
    var con = createCon();
    var text = createText("Online code editing is here ", conf.title);
    var sourceLink = createSourceLink(source, conf.source);
    var es5Link = createEs5Link(es5, conf.es5);

    con.appendChild(text);
    con.appendChild(sourceLink);
    con.appendChild(es5Link);

    document.body.appendChild(con);
  };
})();
