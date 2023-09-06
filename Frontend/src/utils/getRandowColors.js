function generateRandomColorFromString(inputString) {
  // Convertir la chaîne en un nombre entier
  let seed = 0
  for (let i = 0; i < inputString.length; i++) {
    seed += inputString.charCodeAt(i)
  }

  // Utiliser le nombre entier comme graine pour générer une couleur aléatoire
  const randomColor = `#${(seed * 0x1000000 + Math.random() * 0xffffff)
    .toString(16)
    .slice(1, 7)}`

  return randomColor
}

export default generateRandomColorFromString
