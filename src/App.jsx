import { createLocalStore } from 'krestianstvo'
import {loadScene} from './polygon'
import * as THREE from 'three'

let scene;
let player;

export default function App(props) {
  const [local, setLocal] = createLocalStore(
    {
      data: {
        type: 'Node',
        properties: {
          ticking: false,
          initialize: false,
          color:'#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
          position:[Math.random()*10,1,Math.random()*10]
        },
      },
    },
    props
  );

  const createAvatar = (data) =>{

        const geometry = new THREE.SphereGeometry( 1, 32, 16 )
        const material = new THREE.MeshBasicMaterial( { color: data[3] } );
        const avatar_instance = new THREE.Mesh( geometry, material )
        avatar_instance.name = data[1]
        avatar_instance.position.set(data[4][0],data[4][1],data[4][2])
        scene.threejsScene().add(avatar_instance)    


        props.selo.storeNode.clients.forEach(element => {
          if(element == props.selo.storeVT.moniker_){
              console.log('mee' + element)
          }else{
              console.log('not mee' + element)
          }          
        });
    }

  loadScene().then((sceneAndPlayer)=>{
    scene = sceneAndPlayer.scene;
    player = sceneAndPlayer.player;
    

    props.selo.createAction(props.nodeID, 'createAvatar', createAvatar)
      props.selo.sendExtMsg({
        id: props.nodeID,      
        params: [props.nodeID,props.selo.clientSeloID,"createAvatar",local.data.properties.color,local.data.properties.position],
        msg: "createAvatar"
        })    
  })

  let moveby = 1,scaleupby=1.1,scaledownby=0.9,rotateby=0.1
  const moveBallByKeys = (data) =>{
	  console.log(data)
    player = scene.threejsScene().getObjectByName(data[1])
	  switch (data[3]) {
      case 'KeyW':
        player.position.z = player.position.z+moveby
        break
      case 'KeyS':
        player.position.z = player.position.z-moveby
        break
      case 'KeyA':
        player.position.x = player.position.x+moveby
        break
      case 'KeyD':
        player.position.x = player.position.x-moveby   
        break   
      case 'KeyQ':
        player.position.y = player.position.y-moveby   
        break;    
      case 'KeyE':
        player.position.y = player.position.y+moveby   
        break  
      case 'Minus':
        player.scale.set(scaledownby,scaledownby,scaledownby)
        scaledownby -= 0.1
        break 
      case 'Equal':
        player.scale.set(scaleupby,scaleupby,scaleupby)
        scaleupby += 0.1
        break
      case 'ArrowUp':
        player.rotation.x = player.rotation.x+rotateby
        break
      case 'ArrowDown':
        player.rotation.x = player.rotation.x-rotateby
        break
      case 'ArrowLeft':
        player.rotation.y = player.rotation.y+rotateby
        break
      case 'ArrowRight':
        player.rotation.y = player.rotation.y-rotateby   
        break
      }
      player.updateMatrix()          
  }
  props.selo.createAction(props.nodeID, 'moveBallByKeys', moveBallByKeys)    
	document.onkeydown = function(e){
	  props.selo.sendExtMsg({
		id: props.nodeID,      
		params: [props.nodeID,props.selo.clientSeloID,"moveBallByKeys",e.code],
		msg: "moveBallByKeys"
	  })
	}	
  
  return (
    <></>
  );
}