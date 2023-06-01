import { createLocalStore, getRandomColor } from 'krestianstvo'
import { loadScene } from './polygon'
import * as THREE from 'three'
import { onMount, createResource, createEffect, onCleanup, batch } from 'solid-js';


const sceneAndPlayer = async () => await loadScene()

const Avatar = (props) => {
  const [local, setLocal] = createLocalStore(
    {
      data: {
        type: 'Node',
        nodeID: props.nodeID,
        properties: {
          ticking: false,
          initialize: false,
          color: props.color ? props.color : "green",
          position: props.position ? props.position : { x: 0, y: 0, z: 0 },
          rotation: props.rotation ? props.rotation : { x: 0, y: 0, z: 0 },
          scale: props.scale ? props.scale : { x: 0, y: 0, z: 0 },
          dynamic: props.dynamic ? props.dynamic : false,
          parentID: props.parentID ? props.parentID : null
        },
        dynamic: [
        ]
      },
    },
    props
  );

  const createAvatar = (data) => {

    const geometry = new THREE.SphereGeometry(1, 32, 16)
    const material = new THREE.MeshBasicMaterial({ color: local.data.properties.color });
    const avatar_instance = new THREE.Mesh(geometry, material)
    avatar_instance.name = local.data.nodeID
    avatar_instance.position.set(local.data.properties.position.x, local.data.properties.position.y, local.data.properties.position.z)
    props.sa.scene.threejsScene().add(avatar_instance)
  }


  let moveby = 1, scaleupby = 1.1, scaledownby = 0.9, rotateby = 0.1

  const setRandomColor = () => {
    let newColor = getRandomColor(props.selo)
    setLocal("data", "properties", "color", newColor);
  }

  const initialize = () => {
    setRandomColor()
  }

  props.selo.createAction(props.nodeID, "initialize", initialize)


  createEffect(() => {

    let player = props.sa.scene.threejsScene().getObjectByName(props.nodeID)
    let color = local.data.properties.color

    if (player) {
      player.material.color.setStyle(color)
    }

  })

  createEffect(() => {

    let player = props.sa.scene.threejsScene().getObjectByName(props.nodeID)

    let px = local.data.properties.position.x
    let py = local.data.properties.position.y
    let pz = local.data.properties.position.z

    if (player) {

      player.position.x = px
      player.position.y = py
      player.position.z = pz

      player.updateMatrix()
    }

  })

  const moveBallByKeys = (data) => {
    console.log(data)

    switch (data[1]) {
      case 'KeyW':
        setLocal("data", "properties", "position", "z", (c) => c + moveby)
        break
      case 'KeyS':
        setLocal("data", "properties", "position", "z", (c) => c - moveby)
        break
      case 'KeyA':
        setLocal("data", "properties", "position", "x", (c) => c + moveby)
        break
      case 'KeyD':
        setLocal("data", "properties", "position", "x", (c) => c - moveby)
        break
      case 'KeyQ':
        setLocal("data", "properties", "position", "y", (c) => c + moveby)
        break;
      case 'KeyE':
        setLocal("data", "properties", "position", "y", (c) => c - moveby)
        break
      // case 'Minus':
      //   player.scale.set(scaledownby,scaledownby,scaledownby)
      //   scaledownby -= 0.1
      //   break 
      // case 'Equal':
      //   player.scale.set(scaleupby,scaleupby,scaleupby)
      //   scaleupby += 0.1
      //   break
      // case 'ArrowUp':
      //   player.rotation.x = player.rotation.x+rotateby
      //   break
      // case 'ArrowDown':
      //   player.rotation.x = player.rotation.x-rotateby
      //   break
      // case 'ArrowLeft':
      //   player.rotation.y = player.rotation.y+rotateby
      //   break
      // case 'ArrowRight':
      //   player.rotation.y = player.rotation.y-rotateby   
      //   break
    }
  }

  props.selo.createAction(props.nodeID, 'moveBallByKeys', moveBallByKeys)


  onCleanup(() => {
    let player = props.sa.scene.threejsScene().getObjectByName(local.data.nodeID)
    console.log("Remove: ", player)
    player.removeFromParent()
  })

  onMount(() => {
    console.log("I am created! ", local.data.nodeID)
    createAvatar()

    if (props.nodeID == props.selo.storeVT.moniker_)
      document.onkeydown = function (e) {
        props.selo.sendExtMsg({
          id: props.nodeID,
          params: [props.nodeID, e.code],
          msg: "moveBallByKeys"
        })
      }
  })

  return (
    <></>
  )
}

export default function App(props) {

  const [sa] = createResource(sceneAndPlayer);

  const [local, setLocal] = createLocalStore(
    {
      data: {
        type: 'Node',
        nodeID: props.nodeID,
        properties: {
          name: props.name ? props.name : props.nodeID,
          dynamic: props.dynamic ? props.dynamic : false,
          parentID: props.parentID ? props.parentID : null,
          ticking: false,
          initialize: false
          // color:'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
          // position:[Math.random()*10,1,Math.random()*10]
        },
        dynamic: [
        ]
      }
    },
    props
  )


  createEffect(() => {
    console.log("Scene: ", sa())
  })

  createEffect(() => {
    console.log("Clients: ", props.selo.storeNode.clients)
  })

  return (
    <>
      <div>{sa.loading && "Loading scene..."}</div>
      <Show when={sa()}>
        <For each={props.selo.storeNode.clients}
          fallback={<div>Loading...</div>}>
          {(item) =>
            <Avatar
              nodeID={item}
              selo={props.selo}
              sa={sa()}
            />
          }
        </For>
      </Show>
    </>
  )
}