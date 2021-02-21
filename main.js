import fs from 'fs'
import { join } from 'path'
import axios from 'axios'

async function main() {
  const titles = [];
  const filePath = join(__dirname, 'out-new.txt')
  const file = fs.openSync(filePath, 'w');
  axios
    .get('http://scubapedia.ca/api.php?action=query&generator=allpages&gaplimit=20000&gapfilterredir=nonredirects&prop=revisions&rvprop=content&format=json&formatversion=2')
    .then(response => response.data)
    .then(data => {
      try {
        data.query.pages.forEach(page => {
          titles.push(page.title)
        })
        console.log(titles.join('\n'))
        fs.writeFileSync(filePath, titles.sort().join('\n'))
        fs.closeSync(filePath)
      } catch (e) {
        console.error('Importation failed: %o', e)
      }
    })
}

main();