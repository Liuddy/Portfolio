// Iterates through each file path so that the import source can be resolved dinamically.
async function importFilesAndSavePath(importList, pathList) {
  for (let importFn of Object.values(importList)) {
    let src = await importFn()
    pathList.push(src.default)
  }
}

const logoPath = []
const logoImport = import.meta.glob('@/assets/logo/*')
await importFilesAndSavePath(logoImport, logoPath)

const imagesPath = []
const imagesImport = import.meta.glob('@/assets/images/*')
await importFilesAndSavePath(imagesImport, imagesPath)

const iconsPath = []
const iconsImport = import.meta.glob('@/assets/icons/*')
await importFilesAndSavePath(iconsImport, iconsPath)

const filesPath = []
const filesImport = import.meta.glob('@/assets/files/*')
await importFilesAndSavePath(filesImport, filesPath)

export function getImgPath(type, name) {
  let folder = ''
  if (type === 'logo') folder = logoPath
  else if (type === 'images') folder = imagesPath
  else if (type === 'icons') folder = iconsPath
  else if (type === 'files') folder = filesPath

  name = name.toLowerCase()
  name = name.replace(/ |::/g, '_')
  name = name.replaceAll('+', 'plus')
  name = name.replaceAll('.', 'dot')

  if (name === 'c' || name === 'java' || name === 'sql') name += 'og'

  for (let src of folder) {
    let path = src.split('/')
    if (path[path.length - 1].split('.')[0].includes(name)) return src
  }
}
