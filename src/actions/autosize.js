import autosizer from 'autosize'

export function autosize(node) {
	autosizer(node)

	return {
		destroy() {
			autosizer.destroy(node)
		},
	}
}
