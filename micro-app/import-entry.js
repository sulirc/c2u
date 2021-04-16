const scriptCache = new Map();
const styleCache = new Map();

function prefetch(scripts = [], styles = []) {
  const requestIdleCallback = window.requestIdleCallback || (() => {});

  requestIdleCallback(async () => {
    requestIdleCallback(() => getExternalScripts(scripts));
    requestIdleCallback(() => getExternalStyleSheets(styles));
  });
}

function getExternalScripts(scripts, errorCallback = () => {}) {
  const fetchScript = (scriptUrl) => {
    if (scriptCache.has(scriptUrl)) {
      return scriptCache.get(scriptUrl);
    }
    const prom = fetch(scriptUrl).then((response) => {
      if (response.status >= 400) {
        errorCallback();
        throw new Error(
          `${scriptUrl} load failed with status ${response.status}`
        );
      }
      return response.text();
    });

    scriptCache.set(scriptUrl, prom);
    return prom;
  };

  return Promise.all(scripts.map(fetchScript));
}

function getExternalStyleSheets(styles) {
  const fetchStyleSheet = (styleLink) => {
    if (styleCache.has(styleLink)) {
      return styleCache.get(styleLink);
    }
    const prom = fetch(styleLink).then((response) => {
      return response.text();
    });

    styleCache.set(styleLink, prom);
    return prom;
  };

  return Promise.all(styles.map(fetchStyleSheet));
}
