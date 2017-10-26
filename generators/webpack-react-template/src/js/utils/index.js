const loadImageAsync = (url) => {
  if (Array.isArray(url)) {
    return url.map((src, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onerror = function(err) {
          reject(new Error("Network Error"));
        };
        img.onload = function(...arg) {
          resolve(arg)
        }
      });
    })
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onerror = function(err) {
      reject(new Error("Network Error"));
    };
    img.onload = function(...arg) {
      resolve(arg)
    }
  });
};

module.exports = {
  loadImageAsync
}