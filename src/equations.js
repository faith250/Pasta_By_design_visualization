export function computeTrottole() {
  const pts = []
  for (let i = 0; i <= 160; i++) {
    for (let j = 0; j <= 60; j++) {
      const alpha = 0.17 - 0.15 * Math.sin(j * Math.PI / 120)
                  - 0.25 * Math.pow((60 - j) / 60, 10) * Math.sin(j * Math.PI / 30)
      const beta  = 0.17 - 0.15 * Math.sin(j * Math.PI / 120)
                  + 0.25 * Math.pow((60 - j) / 60, 10) * Math.sin(j * Math.PI / 30)
      const gamma = 0.25 * Math.pow((60 - j) / 60, 5)
                  * (1 - Math.sin((i - 128) * Math.PI / 160))
                  * Math.cos(j * Math.PI / 30)
      const zeta  = 7 * i / 400
                  - (48 / 25) * gamma
                  - (j / 120) * (1 - Math.sin((i - 128) * Math.PI / 64))
      let x, y, z
      if (i >= 128) {
        x = alpha * (1 - Math.sin((i - 128) * Math.PI / 320)) * Math.cos(7 * i * Math.PI / 160)
        y = alpha * (1 - Math.sin((i - 128) * Math.PI / 160)) * Math.sin(7 * i * Math.PI / 160)
        z = zeta
      } else {
        x = beta * Math.cos(7 * i * Math.PI / 160)
        y = beta * Math.sin(7 * i * Math.PI / 160)
        z = i / 400 + j / 100 + 0.25 * Math.pow((60 - j) / 60, 5) * Math.cos(j * Math.PI / 30)
      }
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}

export function computeTubettiRigati() {
  const pts = []
  for (let i = 0; i <= 150; i++) {
    for (let j = 0; j <= 30; j++) {
      const x = 2 * Math.cos(i * Math.PI / 75)
              + 0.03 * Math.sin((4 * i + 7.5) * Math.PI / 15)
              + 0.5  * Math.cos(j * Math.PI / 60)
      const y = 2 * Math.sin(i * Math.PI / 75)
              + 0.03 * Math.sin(4 * i * Math.PI / 15)
              + 0.5  * Math.sin(j * Math.PI / 60)
      const z = j / 3
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}
