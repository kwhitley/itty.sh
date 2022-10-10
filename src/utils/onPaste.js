export const onPaste = dispatch => (e) => {
  const item = e?.clipboardData?.items[0]
  console.log('paste event detected', e)
  console.log('paste item', item)

  if (item.kind === 'file') {
    var blob = item.getAsFile()

    console.log('blob is', blob)

    dispatch('file', blob)
  }
}
