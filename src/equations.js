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

export function computeChifferiRigati() {
  const pts = []
  for (let i = 0; i <= 200; i++) {
    for (let j = 0; j <= 45; j++) {
      const x = (0.45 + 0.3 * Math.cos(i * Math.PI / 100) + 0.005 * Math.cos(2 * i * Math.PI / 5))
              * Math.cos(j * Math.PI / 45)
              + 0.15 * Math.pow(j / 45, 10) * Math.pow(Math.cos(i * Math.PI / 100), 3)
      const y = (0.35 + j / 300) * Math.sin(i * Math.PI / 100)
              + 0.005 * Math.sin(2 * i * Math.PI / 5)
      const z = (0.4 + 0.3 * Math.cos(i * Math.PI / 100)) * Math.sin(j * Math.PI / 45)
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}

export function computeCavatappi() {
  const pts = []
  for (let i = 0; i <= 70; i++) {
    for (let j = 0; j <= 150; j++) {
      const r = 3 + 2 * Math.cos(i * Math.PI / 35) + 0.1 * Math.cos(2 * i * Math.PI / 7)
      const x = r * Math.cos(j * Math.PI / 30)
      const y = r * Math.sin(j * Math.PI / 30)
      const z = 3 + 2 * Math.sin(i * Math.PI / 35) + 0.1 * Math.sin(2 * i * Math.PI / 7) + j / 6
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}

export function computeCavatelli() {
  const pts = []
  for (let i = 0; i <= 200; i++) {
    for (let j = 0; j <= 30; j++) {
      const alpha = 0.5 * Math.cos(i * Math.PI / 100)
      const beta  = (j / 60) * Math.sin(i * Math.PI / 100)
      const x = 3 * (1 - Math.sin(alpha * 2 * Math.PI)) * Math.cos(alpha * Math.PI + 0.9 * Math.PI)
      const y = 3 * Math.sin(alpha * 2 * Math.PI) * Math.sin(alpha * Math.PI + 0.63 * Math.PI)
      const z = 4 * beta * (5 - Math.sin(alpha * Math.PI))
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}

export function computeCastellane() {
  const pts = []
  for (let i = 0; i <= 60; i++) {
    for (let j = 0; j <= 120; j++) {
      const sinJ  = Math.sin(j * Math.PI / 120)
      const cosJ  = Math.cos((j + 3) * Math.PI / 6)
      const sin2J = Math.sin(2 * j * Math.PI / 300)
      const ribble = (i * i) / 720 * (sin2J * sin2J + 0.1)
      const innerPi = 0.3 * sinJ * Math.abs(cosJ) + ribble + 0.3
      const innerTh = 0.3 * sinJ * cosJ            + ribble + 0.3
      const x = innerPi * Math.cos(7 * i * Math.PI / 150)
      const y = innerTh * Math.sin(7 * i * Math.PI / 150)
      const z = 12 * Math.cos(j * Math.PI / 120)
      pts.push(x, y, z)
    }
  }
  return new Float32Array(pts)
}

export function computeColonnePompeii() {
  const pts = []
  const C28 = Math.cos(-28 * Math.PI / 3)
  const S28 = Math.sin(-28 * Math.PI / 3)
  for (let i = 0; i <= 10; i++) {
    const ci = Math.cos(i * Math.PI / 20)
    const si = Math.sin(i * Math.PI / 20)
    for (let j = 0; j <= 250; j++) {
      // Column 1: (Π, Θ, K)
      let pi, theta, k
      if (j <= 50) {
        pi = 2 * ci;  theta = 0;  k = si + 12
      } else {
        pi    = 2 * ci * Math.cos(-j * Math.PI / 25)
        theta = 2 * ci * Math.sin( j * Math.PI / 25) + 3 * Math.sin((j - 50) * Math.PI / 200)
        k     = si + 6 * j / 25
      }
      pts.push(pi, theta, k)

      // Column 2: (T, X, Ψ)
      let t, xv, psi
      if (j <= 200) {
        t   = 2 * ci * Math.cos(-j * Math.PI / 25 + 2 * Math.PI / 3)
        xv  = 2 * ci * Math.sin(-j * Math.PI / 25 + 2 * Math.PI / 3) + 3 * Math.sin(j * Math.PI / 200)
        psi = 12 + si + 6 * j / 25
      } else {
        t = 2 * ci * C28;  xv = 2 * ci * S28;  psi = si + 60
      }
      pts.push(t, xv, psi)

      // Column 3: (N, Ξ, Ψ)
      let nv, xi
      if (j <= 200) {
        nv = 2 * ci * Math.cos(-j * Math.PI / 25 + 4 * Math.PI / 3)
        xi = 2 * ci * Math.sin(-j * Math.PI / 25 + 4 * Math.PI / 3) + 3 * Math.sin(j * Math.PI / 200)
      } else {
        nv = 2 * ci * C28;  xi = 2 * ci * S28
      }
      pts.push(nv, xi, psi)
    }
  }
  return new Float32Array(pts)
}
