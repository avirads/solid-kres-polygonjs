import { createLocalStore, getRandomColor } from 'krestianstvo'
import { loadScene } from '../js/polygon'
import Avatar from './Avatar';
import { createResource, createEffect } from 'solid-js';

const sceneAndPlayer = async () => await loadScene()

export default function App2(props) {

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