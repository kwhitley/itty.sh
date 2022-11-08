export const onPaste = (dispatch) => (e) => {
  const item = e?.clipboardData?.items[0]

  if (item.kind === 'file') {
    const blob = item.getAsFile()

    dispatch('files', [blob])
  }
}
