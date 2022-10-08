// receives data set with use:dragData={someData}
// USAGE: use:drop
export function dropzone(node, fn) {
  const receivePayload = event => {
    let data

    try {
      data = JSON.parse(event.dataTransfer.getData('draggable:data'))
    } catch (err) {}

    fn(data)
  }

	node.addEventListener('drop', receivePayload, true)
	node.addEventListener('touchdrop', receivePayload, true)

	return {
    update(newFunction) {
			fn = newFunction
		},
		destroy() {
			node.removeEventListener('drop', receivePayload, true)
			node.removeEventListener('touchdrop', receivePayload, true)
		}
	}
}
