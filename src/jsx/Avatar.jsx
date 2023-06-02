import { onMount, createEffect, onCleanup, createResource } from 'solid-js'
import { createLocalStore, getRandomColor } from 'krestianstvo'
import {BaseCoreObject} from '@polygonjs/polygonjs/dist/src/core/geometry/_BaseObject'
import * as THREE from 'three'

export default function Avatar(props) {
    const three_scene = props.polygon_scene.scene.threejsScene()
    let player
    const [local, setLocal] = createLocalStore(
      {
        data: {
          type: 'Node',
          nodeID: props.nodeID,
          properties: {
            ticking: false,
            initialize: false,
            color: props.color ? props.color : "green",
            position: props.position ? props.position : { x: 0, y: 3, z: 0 },
            dynamic: props.dynamic ? props.dynamic : false,
            parentID: props.parentID ? props.parentID : null
          },
          dynamic: [
          ]
        },
      },
      props
    );


 
    const createAvatar = () => {
      if(!player){
        const geo1 = props.polygon_scene.scene.createNode('geo')
        const avatar = geo1.createNode('avatar')
        avatar.node('attribCreate1').p.name.set('krestianstvo')
        avatar.node('attribCreate1').p.string.set(props.nodeID)
        
        window.three_scene = three_scene
        console.log(three_scene)
        const node = props.polygon_scene.scene.node('geo1/avatar1/attribCreate1');
        node.compute().then((cont)=>{
          player = cont.coreContent().threejsObjects()[0] 
          console.log(player)
        })  
      }
    }
  
  
    let moveby = 1, scaleupby = 1.1, scaledownby = 0.9, rotateby = 1
  
    const setRandomColor = () => {
      let newColor = getRandomColor(props.selo)
      setLocal("data", "properties", "color", newColor);
    }
  
    const initialize = () => {
      setRandomColor()
    }
  
    props.selo.createAction(props.nodeID, "initialize", initialize)
  
  
    createEffect(() => {
  
      let color = local.data.properties.color
      if (player) {
        player.material.color.setStyle(color)
      }
  
    })
  
    createEffect(() => {
  
      let px = local.data.properties.position.x
      let pz = local.data.properties.position.z
  
      if (player) {
  
        player.position.x = px
        player.position.z = pz
  
        player.updateMatrix()
      }
  
    })
  
      //https://discourse.threejs.org/t/be-solved-how-to-find-objects-return-an-array/6685
      THREE.Object3D.prototype.getObjectsByTag = function( tag ) {
        // check the current object
        const userData = JSON.parse(JSON.stringify(this.userData))
        try{
          const krestianstvo_user = JSON.parse(JSON.stringify(userData['attributes']))["krestianstvo"]
          if(krestianstvo_user==props.nodeID){
            player = this
          }
        }catch(e){
          //console.log(e)
        }
  
        for ( var i = 0, l = this.children.length; i < l; i ++ ) {
              var child = this.children[ i ];
              child.getObjectsByTag( tag );
        }
      };

    const moveBallByKeys = (data) => {
      three_scene.getObjectsByTag("userData")
      const attribValue = BaseCoreObject.attribValue(player, "krestianstvo");
      console.log(attribValue)

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
      }
    }
  
    props.selo.createAction(props.nodeID, 'moveBallByKeys', moveBallByKeys)
  
  
    onCleanup(() => {
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
            params: [props.uuid, e.code],
            msg: "moveBallByKeys"
          })
        }
    })
  
    return (
      <></>
    )
  }