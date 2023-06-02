import { onMount, createEffect, onCleanup } from 'solid-js'
import { createLocalStore, getRandomColor } from 'krestianstvo'
import * as THREE from 'three'

export default function Avatar(props) {
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
            rotation: props.rotation ? props.rotation : { x: 0, y: 0, z: 0 },
            scale: props.scale ? props.scale : { x: 0, y: 0, z: 0 },
            avatar:null,
            dynamic: props.dynamic ? props.dynamic : false,
            parentID: props.parentID ? props.parentID : null
          },
          dynamic: [
          ]
        },
      },
      props
    );

    //https://discourse.threejs.org/t/be-solved-how-to-find-objects-return-an-array/6685
    THREE.Object3D.prototype.getObjectsByTag = function( tag ) {
      // check the current object
      const userData = JSON.parse(JSON.stringify(this.userData))
      try{
        const krestianstvo_user = JSON.parse(JSON.stringify(userData['attributes']))["krestianstvo"]
        if(krestianstvo_user==props.nodeID){
          console.log(this)
          setLocal("data", "properties", "avatar", this)
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
  
    const createAvatar = () => {

      const avatar  = props.polygon_scene.scene.createNode('geo').createNode('avatar')
      window.tsc = props.polygon_scene.scene.threejsScene()
      avatar.node('attribCreate1').p.name.set('krestianstvo')
      avatar.node('attribCreate1').p.string.set(props.nodeID)
      setLocal("data", "properties", "avatar", avatar);

      props.polygon_scene.scene.threejsScene().getObjectsByTag('attributes')      

      window.tsc.children[4].children[1].children[0].matrixAutoUpdate=true
      

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
  
      let player = props.polygon_scene.scene.threejsScene().getObjectByName(props.nodeID)
      let color = local.data.properties.color
  
      if (player) {
        player.material.color.setStyle(color)
      }
  
    })
  
    createEffect(() => {
  
      //let player = props.polygon_scene.scene.threejsScene().getObjectByName(props.nodeID)
      let player = local.data.properties.avatar
      console.log(player)
      window.player = player
     // let px = local.data.properties.position.x
     // let pz = local.data.properties.position.z
  
      if (player) {
  
      //  player.position.x = px
      //  player.position.z = pz
  
     //   player.updateMatrix()
      }
  
    })
  
    createEffect(() => {
  
      let player = props.polygon_scene.scene.threejsScene().getObjectByName(props.nodeID)
  
      let ry = local.data.properties.rotation.y
  
      if (player) {
  
        player.rotation.y = ry
  
        player.updateMatrix()
      }
  
    })
  
    const moveBallByKeys = (data) => {
      console.log(data)
  
      switch (data[1]) {
        case 'KeyW':
          player.matrixAutoUpdate=true
          player.position.z += moveby
          player.updateMatrix()
          player.matrixAutoUpdate=false

          break
        case 'KeyS':
          player.matrixAutoUpdate=true
          player.position.z -= moveby
          player.updateMatrix()
          player.matrixAutoUpdate=false

          //setLocal("data", "properties", "avatar", "position" , "z", (c) => c - moveby)    
           //console.log(local.data.properties.avatar.position.z + 'twita')      
          break
        case 'KeyA':
          setLocal("data", "properties", "position", "x", (c) => c + moveby)
          break
        case 'KeyD':
          setLocal("data", "properties", "position", "x", (c) => c - moveby)
          break
        case 'KeyQ':
          //setLocal("data", "properties", "position", "y", (c) => c + moveby)
          //break;
        case 'KeyE':
          //setLocal("data", "properties", "position", "y", (c) => c - moveby)
          //break
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
         case 'ArrowLeft':
          setLocal("data", "properties", "rotation", "y", (c) => c - rotateby)
           break
         case 'ArrowRight':
          setLocal("data", "properties", "rotation", "y", (c) => c + rotateby)
           break
      }
    }
  
    props.selo.createAction(props.nodeID, 'moveBallByKeys', moveBallByKeys)
  
  
    onCleanup(() => {
      let player = props.polygon_scene.scene.threejsScene().getObjectByName(local.data.nodeID)
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