export type Browser = {
    version: string
    webkit: boolean
    playbook: boolean
    silk: boolean
    chrome: boolean
    firefox: boolean
    ie: boolean
    safari: boolean
    webview: boolean
  }
  
export type Os = {
    android: boolean
    ios: boolean
    wp: boolean
    webos: boolean
    blackberry: boolean
    touchpad: boolean
    bb10: boolean
    rimtabletos: boolean
    kindle: boolean
    firefoxos: boolean
    tablet: boolean
    phone: boolean
    iphone: boolean
    ipad: boolean
    ipod: boolean
    version: string | null
  }
  
export function detectInfo() {
  const ua = navigator.userAgent
  const platform = navigator.platform
  const os = {} as Os,
    browser = {} as Browser,
    // eslint-disable-next-line
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    // eslint-disable-next-line
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    // eslint-disable-next-line
      osx = !!ua.match(/\(Macintosh\; Intel /),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    // eslint-disable-next-line
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    win = /Win\d{2}|Windows/.test(platform),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    // eslint-disable-next-line
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
  
  if (webkit) {
    browser.webkit = !!webkit
    browser.version = webkit[1]
  }
  
  if (android) {
    os.android = true
    os.version = android[2]
  }
  if (iphone && !ipod) {
    os.ios = os.iphone = true
    os.version = iphone[2].replace(/_/g, '.')
  }
  if (ipad) {
    os.ios = os.ipad = true
    os.version = ipad[2].replace(/_/g, '.')
  }
  if (ipod) {
    os.ios = os.ipod = true
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  }
  if (wp) {
    os.wp = true
    os.version = wp[1]
  }
  if (webos) {
    os.webos = true
    os.version = webos[2]
  }
  if (touchpad) os.touchpad = true
  if (blackberry) {
    os.blackberry = true
    os.version = blackberry[2]
  }
  if (bb10) {
    os.bb10 = true
    os.version = bb10[2]
  }
  if (rimtabletos) {
    os.rimtabletos = true
    os.version = rimtabletos[2]
  }
  if (playbook) browser.playbook = true
  if (kindle) {
    os.kindle = true
    os.version = kindle[1]
  }
  if (silk) {
    browser.silk = true
    browser.version = silk[1]
  }
  if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
  if (chrome) {
    browser.chrome = true
    browser.version = chrome[1]
  }
  if (firefox) {
    browser.firefox = true
    browser.version = firefox[1]
  }
  if (firefoxos) {
    os.firefoxos = true
    os.version = firefoxos[1]
  }
  if (ie) {
    browser.ie = true
    browser.version = ie[1]
  }
  if (safari && (osx || os.ios || win)) {
    browser.safari = true
    if (!os.ios) browser.version = safari[1]
  }
  if (webview) browser.webview = true
  
  os.tablet = !!(
    ipad ||
      playbook ||
      (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) ||
      (ie && !ua.match(/Phone/) && ua.match(/Touch/))
  )
  os.phone = !!(
    !os.tablet &&
      !os.ipod &&
      (android ||
        iphone ||
        webos ||
        blackberry ||
        bb10 ||
        (chrome && ua.match(/Android/)) ||
        (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) ||
        (ie && ua.match(/Touch/)))
  )
  return { os, browser }
}
  