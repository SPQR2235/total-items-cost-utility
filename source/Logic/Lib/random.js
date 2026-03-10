export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor(lighten, amount) {
  const max = 256 - amount
  let r = random(0, max)
  let g = random(0, max)
  let b = random(0, max)

  const base = `rgb(${r}, ${g}, ${b})`

  if (!lighten) return { base, lighter: null}

  const lighter = `rgb(
    ${r + amount},
    ${g + amount},
    ${b + amount}
  )`

  return { base, lighter }
}