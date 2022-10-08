const setDraggable = (node, enabled) => {
  if (enabled) {
    node.draggable = true
    node.classList.add('draggable')
  } else {
    Reflect.deleteProperty(node, 'draggable')
    node.classList.remove('draggable')
  }
}

// receives data set with use:dragData={someData}
// USAGE: use:drop
export function draggable(node, options = {}) {
  let {
    enabled = true,
  } = options

  const block = e => e.preventDefault()

  // set over flag to true when dragging over this element
  const dragOver = () => node.classList.add('over')

  // set over flag to false when not dragging over this element
  const dragOut = () => node.classList.remove('over')

  // add dragging class to dragging elements
  const dragStart = () => node.classList.add('dragging')
  const dragEnd = () => node.classList.remove('dragging')

  setDraggable(node, enabled)

	node.addEventListener('dragover', block, true)
	node.addEventListener('dragenter', dragOver, true)
	node.addEventListener('dragleave', dragOut, true)
	node.addEventListener('drop', dragOut, true)
  node.addEventListener('dragstart', dragStart, true)
  node.addEventListener('dragend', dragEnd, true)
  // touch
  node.addEventListener('touchdragover', block, true)
	node.addEventListener('touchdragenter', dragOver, true)
	node.addEventListener('touchdragleave', dragOut, true)
	node.addEventListener('touchdrop', dragOut, true)
  node.addEventListener('touchdragstart', dragStart, true)
  node.addEventListener('touchdragend', dragEnd, true)

	return {
    update(options) {
      setDraggable(node, options.enabled)
		},
		destroy() {
			node.removeEventListener('dragover', block, true)
      node.removeEventListener('dragenter', dragOver, true)
	    node.removeEventListener('dragleave', dragOut, true)
	    node.removeEventListener('drop', dragOut, true)
      node.removeEventListener('dragstart', dragStart, true)
      node.removeEventListener('dragend', dragEnd, true)
      // touch
      node.removeEventListener('touchdragover', block, true)
      node.removeEventListener('touchdragenter', dragOver, true)
	    node.removeEventListener('touchdragleave', dragOut, true)
	    node.removeEventListener('touchdrop', dragOut, true)
      node.removeEventListener('touchdragstart', dragStart, true)
      node.removeEventListener('touchdragend', dragEnd, true)
		}
	}
}
