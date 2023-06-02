import { createResource, createEffect } from 'solid-js';
import { createLocalStore } from 'krestianstvo'
import { loadScene } from '../js/polygon'
import  Avatar  from './Avatar'

const scene = async () => await loadScene()

export default function App(props) {

  const [polygon_scene] = createResource(scene);

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
        },
        dynamic: [
        ]
      }
    },
    props
  )


  createEffect(() => {
    console.log("Scene: ", polygon_scene())
  })

  createEffect(() => {
    console.log("Clients: ", props.selo.storeNode.clients)
  })

  return (
    <>
      <div>{polygon_scene.loading && "Loading scene..."}</div>
      <Show when={polygon_scene()}>
        <For each={props.selo.storeNode.clients}
          fallback={<div>Loading...</div>}>
          {(item) =>
            <Avatar
              nodeID={item}
              selo={props.selo}
              polygon_scene={polygon_scene()}
             />
          }
        </For>
      </Show>
    </>
  )
}