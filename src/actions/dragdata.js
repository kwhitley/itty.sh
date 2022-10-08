// receives data set with use:dragData={someData}
// USAGE: use:drop
export function dragdata(node, data) {
  const addPayload = event => {
    event.dataTransfer.setData('draggable:data', JSON.stringify(data))
  }

  node.addEventListener('dragstart', addPayload, true)
  node.addEventListener('touchdragstart', addPayload, true)

	return {
    update(newData) {
      data = newData
		},
		destroy() {
			node.removeEventListener('dragstart', addPayload, true)
			node.removeEventListener('touchdragstart', addPayload, true)
		}
	}
}
