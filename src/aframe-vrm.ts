import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
import { registerComponent } from 'aframe'

registerComponent('vrm-model', {
  schema: {
    src: { type: 'string' }
  },
  init() {
    const loader = new GLTFLoader()
    loader.load(
      this.data.src,
      gltf => {
        VRM.from(gltf).then(vrm => {
          this.el.object3D.add(vrm.scene)
        })
      },
      progress => {
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%'
        )
      },
      error => console.error(error)
    )
  }
})
