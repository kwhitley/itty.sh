// receives data set with use:dragData={someData}
// USAGE: use:drop
export function tooltip(node, content) {
  let tip

  const show = () => {
    // create element
    tip = document.createElement('div')
    tip.classList.add('tooltip')
    tip.innerHTML = content
    node.appendChild(tip)
  }
  const hide = () => {
    tip && node.removeChild(tip)
  }

  // const targetBounds = node.getBoundingClientRect()
  window.el = node



	node.addEventListener('mouseenter', show)
	node.addEventListener('mouseleave', hide)

	return {
    // update(newFunction) {
		// 	fn = newFunction
		// },
		destroy() {
			node.removeEventListener('mouseenter', show, true)
			node.removeEventListener('mouseleave', hide, true)
		}
	}
}
