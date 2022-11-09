# 功能

- 使用前

```js
export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 寻找viewer
 */
export function acceptViewer(callback) {
  const time = setInterval(() => {
    if (window.viewer) {
      clearInterval(time);
      callback && callback(window.viewer);
    }
  }, 20);
}

export const a = () => {}
```

- 使用后

```js
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 寻找viewer
 */
function acceptViewer(callback) {
  const time = setInterval(() => {
    if (window.viewer) {
      clearInterval(time);
      callback && callback(window.viewer);
    }
  }, 20);
}

const a = () => {}

export { uuid, acceptViewer, a };
```

需要自行格式化