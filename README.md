# aframe-vrm-component

Use [VRM](https://vrm.dev/) on [A-Frame](https://aframe.io/)

# Usage

```html
<html>
  <head>
    <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
    <script src="../dist/aframe-vrm.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-plane>
      <a-entity
        vrm-model="src: ./models/AliciaSolid.vrm"
        position="0 0 -5"
        rotation="0 180 0"
        animation="property: rotation; to: 0 -180 0; dur: 1000; loop: true; easing: easeOutCubic"
      ></a-entity>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```
