module.exports = function (content) {
  try {
    content = eval(content + '()')
  }
  catch (e) { }

  var res = ['module.exports = ""']
  var myRegexp = /url\((.*)\)/g
  var match = myRegexp.exec(content);
  var notUrl = 0

  while (match != null) {
    if (!match[1].includes("http")) {
      var len = match.index - notUrl

      if (len) {
        res.push(' + ' + JSON.stringify(content.substr(notUrl, len)))
      }
      res.push(' + "url(" + require ("' + match[1] + '") + ")"')
      notUrl = match.index + match[0].length
    }
    match = myRegexp.exec(content);
  }

  var len = content.length - notUrl
  if (len) {
    res.push(' + ' + JSON.stringify(content.substr(notUrl, len)))
  }

  return res.join('')
};
