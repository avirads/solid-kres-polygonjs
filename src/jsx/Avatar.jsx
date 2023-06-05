import { createLocalStore, getRandomColor} from 'krestianstvo'
import { onMount, onCleanup } from 'solid-js';

export default function Avatar(props) {

  function hexToRgb(hex) {
    // Remove the '#' symbol if present
    hex = hex.replace('#', '');
  
    // Convert the hex value to RGB
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
  
    // Return the RGB array
    var rgb = new Array();
    rgb.push(r)
    rgb.push(g)
    rgb.push(b)
    return rgb;
  }
  
  const [local, setLocal] = createLocalStore(
    {
      data: {
        nodeID: props.nodeID,
        type: 'Node',
        properties: {
        },
      },
    },
    props
  );

  let player

  const createAvatar = () => {

    const geo = props.sa.scene.createNode('geo')
    const avatar = geo.createNode('avatar')
    let str_node = geo._name+ '/' + avatar._name
    var hexColor = getRandomColor(props.selo)

    props.sa.scene.node(str_node).p.color.set(hexToRgb(hexColor))
    const node = props.sa.scene.node(str_node)

    node.compute().then((cont)=>{
      player = props.sa.scene.threejsScene().getObjectByName(local.data.nodeID)
      player = cont.coreContent().threejsObjects()[0]
      player.name = local.data.nodeID
      player.position.x = props.selo.random() * 10
      player.position.y = 1
      player.position.z = props.selo.random() * 10
  
    })

  }

  let moveby = 1

  const moveBallByKeys = (data) => {
    console.log(data)
    player.matrixAutoUpdate=true
    switch (data[1]) {
      case 'KeyW':
        player.position.z = player.position.z + moveby
        break
      case 'KeyS':
        player.position.z = player.position.z - moveby
        break
      case 'KeyA':
        player.position.x = player.position.x + moveby
        break
      case 'KeyD':
        player.position.x = player.position.x - moveby
        break
      case 'KeyQ':
        player.position.y = player.position.y + moveby
        break;
      case 'KeyE':
        player.position.y = player.position.y - moveby
        break
    }
    player.updateMatrix()
    player.matrixAutoUpdate=false

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