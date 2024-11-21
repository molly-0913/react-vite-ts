import Pages from 'vite-plugin-pages'

export default function createPages() {
  return Pages({
    exclude: ['**/components/**/*.vue']
  })
}
