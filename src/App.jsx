import { useMemo } from 'react'
import { computeTrottole, computeTubettiRigati, computeChifferiRigati, computeCavatappi, computeCavatelli, computeCastellane, computeColonnePompeii, computeCasarecce, computeCapellini, computeCappelletti, computeCannelloni, computeCannolicchiRigati } from './equations'
import PastaViz from './components/PastaViz'
import './App.css'

function NavBar() {
  return (
    <nav className="nav">
      <span className="nav-brand">Pasta by Design</span>
      <div className="nav-links">
        <a href="#trottole">Trottole</a>
        <a href="#tubetti-rigati">Tubetti Rigati</a>
        <a href="#chifferi-rigati">Chifferi Rigati</a>
        <a href="#cavatappi">Cavatappi</a>
        <a href="#cavatelli">Cavatelli</a>
        <a href="#castellane">Castellane</a>
        <a href="#colonne-pompeii">Colonne Pompeii</a>
        <a href="#casarecce">Casarecce</a>
        <a href="#capellini">Capellini</a>
        <a href="#cappelletti">Cappelletti</a>
        <a href="#cannelloni">Cannelloni</a>
        <a href="#cannolicchi-rigati">Cannolicchi Rigati</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero">
      <p className="hero-tag">Mathematical Form</p>
      <h1>Pasta <em>by Design</em></h1>
      <p className="hero-sub">Each pasta shape encoded as a parametric surface — three equations mapping two integer indices to three-dimensional space.</p>
      <p className="hero-credit">George L. Legendre · Thames &amp; Hudson, 2011</p>
    </header>
  )
}

function Properties({ primary, items }) {
  return (
    <ul className="props">
      <li className="prop-primary"><span className="prop-arrow">&gt;</span> {primary}</li>
      {items.map(item => (
        <li key={item} className="prop-item">
          <span className="prop-check">&#10003;</span> {item}
        </li>
      ))}
    </ul>
  )
}

function EqPanel({ ranges, equations }) {
  return (
    <div className="eq-panel">
      <span className="eq-section-label">_ranges</span>
      <pre className="eq-pre">{ranges}</pre>
      <span className="eq-section-label" style={{ marginTop: 16 }}>equations</span>
      <pre className="eq-pre">{equations}</pre>
    </div>
  )
}

function PastaSection({ id, page, name, description, primary, propItems, ranges, equations, vizPositions, cameraPos, target, pointSize, dims, coordsLabel }) {
  return (
    <section id={id} className="pasta-section">
      <div className="section-inner">
        <div className="pasta-top">
          <div className="pasta-left">
            <span className="pasta-page">{page}</span>
            <h2 className="pasta-name">{name}</h2>
            <p className="pasta-desc">{description}</p>
          </div>
          <Properties primary={primary} items={propItems} />
        </div>
        <EqPanel ranges={ranges} equations={equations} />
        <PastaViz
          positions={vizPositions}
          cameraPos={cameraPos}
          target={target}
          pointSize={pointSize}
        />
        <p className="canvas-hint">drag to rotate · scroll to zoom · {coordsLabel || '(Π, Θ, K)'}</p>
        <div className="dims">
          {dims.map(d => (
            <span key={d.label} className="dim-item">
              <strong>{d.label}</strong> {d.value}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const trottolePos       = useMemo(() => computeTrottole(), [])
  const tubettiPos        = useMemo(() => computeTubettiRigati(), [])
  const chifferiPos       = useMemo(() => computeChifferiRigati(), [])
  const cavatappiPos      = useMemo(() => computeCavatappi(), [])
  const cavatelliPos      = useMemo(() => computeCavatelli(), [])
  const castellanePos     = useMemo(() => computeCastellane(), [])
  const colonnePompeiiPos    = useMemo(() => computeColonnePompeii(), [])
  const casareccePos         = useMemo(() => computeCasarecce(), [])
  const capelliniPos         = useMemo(() => computeCapellini(), [])
  const cappellettiPos       = useMemo(() => computeCappelletti(), [])
  const cannelloniPos        = useMemo(() => computeCannelloni(), [])
  const cannolicchiRigatiPos = useMemo(() => computeCannolicchiRigati(), [])

  return (
    <>
      <NavBar />
      <Hero />

      <PastaSection
        id="trottole"
        page="p. 192"
        name="Trottole"
        description="A pasta corta (short pasta) comprised of rings that curl up about a central stalk. Ideal for salads, or with pumpkin, leek, pine nuts and Parmigiano-Reggiano."
        primary="Helicoidal Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 160\nj  :=  0, 1 … 60`}
        equations={
`α(i,j)  :=  0.17 - 0.15·sin(j·π/120) - 0.25·((60-j)/60)¹⁰·sin(j·π/30)
β(i,j)  :=  0.17 - 0.15·sin(j·π/120) + 0.25·((60-j)/60)¹⁰·sin(j·π/30)
γ(i,j)  :=  0.25·((60-j)/60)⁵·(1 - sin((i-128)·π/160))·cos(j·π/30)
ζ(i,j)  :=  7i/400 - (48/25)·γ(i,j) - (j/120)·(1 - sin((i-128)·π/64))

Π(i,j)  :=  i ≥ 128 :  α(i,j)·(1 - sin((i-128)·π/320))·cos(7·i·π/160)
             else    :  β(i,j)·cos(7·i·π/160)

Θ(i,j)  :=  i ≥ 128 :  α(i,j)·(1 - sin((i-128)·π/160))·sin(7·i·π/160)
             else    :  β(i,j)·sin(7·i·π/160)

K(i,j)  :=  i ≥ 128 :  ζ(i,j)
             else    :  i/400 + j/100 + 0.25·((60-j)/60)⁵·cos(j·π/30)`}
        vizPositions={trottolePos}
        cameraPos={[0.8, 0.8, 3.5]}
        target={[0, 0, 1.5]}
        pointSize={0.006}
        dims={[
          { label: 'Length', value: '28 mm' },
          { label: 'Diameter', value: '15 mm' },
          { label: 'Cooking Time', value: '8–9 min' }
        ]}
      />

      <PastaSection
        id="tubetti-rigati"
        page="p. 194"
        name="Tubetti Rigati"
        description="Smallest members of the pasta corta clan, first created in Campania, southern Italy. Ideal e fagioli (with beans) for filling soups or a light marinara sauce."
        primary="Bent Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Striated Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 150\nj  :=  0, 1 … 30`}
        equations={
`Π(i,j)  :=  2·cos(i·π/75) + 0.03·sin((4i + 7.5)·π/15) + 0.5·cos(j·π/60)

Θ(i,j)  :=  2·sin(i·π/75) + 0.03·sin(4i·π/15)          + 0.5·sin(j·π/60)

K(i,j)  :=  j / 3`}
        vizPositions={tubettiPos}
        cameraPos={[12, 6, 6]}
        target={[0, 0, 5]}
        pointSize={0.15}
        dims={[
          { label: 'Length', value: '11 mm' },
          { label: 'Diameter', value: '5 mm' },
          { label: 'Cooking Time', value: '11 min' }
        ]}
      />

      <PastaSection
        id="chifferi-rigati"
        page="p. 041"
        name="Chifferi Rigati"
        description="Available in both rigati (grooved) and lisci (smooth) forms. Typically cooked in broth or served in ragù alla bolognese. Bears resemblance to the Austrian 'kipfel' sweet."
        primary="Bent Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Striated Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 200\nj  :=  0, 1 … 45`}
        equations={
`Π(i,j)  :=  (0.45 + 0.3·cos(i·π/100) + 0.005·cos(2i·π/5))·cos(j·π/45)
             + 0.15·(j/45)¹⁰·cos(i·π/100)³

Θ(i,j)  :=  (0.35 + j/300)·sin(i·π/100) + 0.005·sin(2i·π/5)

K(i,j)  :=  (0.4 + 0.3·cos(i·π/100))·sin(j·π/45)`}
        vizPositions={chifferiPos}
        cameraPos={[2, 1.5, 1.5]}
        target={[0.3, 0.1, 0.3]}
        pointSize={0.004}
        dims={[
          { label: 'Length', value: '17 mm' },
          { label: 'Width', value: '10 mm' },
          { label: 'Diameter', value: '7 mm' },
          { label: 'Cooking Time', value: '7 min' }
        ]}
      />

      <PastaSection
        id="cavatappi"
        page="p. 019"
        name="Cavatappi"
        description="Perfect with chunky sauces made from lamb or pork, cavatappi (corkscrews) are 36mm-long hollow helicoidal tubes. Also used in oven-baked cheese-topped dishes or in salads with pesto."
        primary="Helicoidal Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Striated Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 70\nj  :=  0, 1 … 150`}
        equations={
`Π(i,j)  :=  (3 + 2·cos(i·π/35) + 0.1·cos(2i·π/7))·cos(j·π/30)

Θ(i,j)  :=  (3 + 2·cos(i·π/35) + 0.1·cos(2i·π/7))·sin(j·π/30)

K(i,j)  :=  3 + 2·sin(i·π/35) + 0.1·sin(2i·π/7) + j/6`}
        vizPositions={cavatappiPos}
        cameraPos={[20, 20, 14]}
        target={[0, 0, 14]}
        pointSize={0.1}
        dims={[
          { label: 'Length', value: '36 mm' },
          { label: 'Width', value: '13 mm' },
          { label: 'Diameter', value: '6 mm' },
          { label: 'Cooking Time', value: '11 min' }
        ]}
      />

      <PastaSection
        id="cavatelli"
        page="p. 040"
        name="Cavatelli"
        description="Popular in the south of Italy. Can be served alla puttanesca (with chilli, garlic, capers and anchovies) or added to a salad with olive oil, sautéed crushed garlic and soft cheese."
        primary="Straight Longitudinal Profile"
        propItems={['Semi-Open Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 200\nj  :=  0, 1 … 30`}
        equations={
`α(i)    :=  0.5·cos(i·π/100)
β(i,j)  :=  (j/60)·sin(i·π/100)

Π(i,j)  :=  3·(1 - sin(α·2π))·cos(α·π + 0.9·π)

Θ(i,j)  :=  3·sin(α·2π)·sin(α·π + 0.63·π)

K(i,j)  :=  4·β·(5 - sin(α·π))`}
        vizPositions={cavatelliPos}
        cameraPos={[20, 15, 0]}
        target={[0, 0, 0]}
        pointSize={0.05}
        dims={[
          { label: 'Length', value: '28 mm' },
          { label: 'Width', value: '12 mm' },
          { label: 'Thickness', value: '2 mm' },
          { label: 'Cooking Time', value: '14–16 min' }
        ]}
      />

      <PastaSection
        id="castellane"
        page="p. 036"
        name="Castellane"
        description="Created by Barilla. Originally called paguri (hermit crabs), renamed castellane (castle dwellers). The sturdy form and rich nutty taste stand up to hearty meats and full-flavoured sauces."
        primary="Pinched Longitudinal Profile"
        propItems={['Semi-Open Cross-Section', 'Striated Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 60\nj  :=  0, 1 … 120`}
        equations={
`Π(i,j)  :=  [0.3·sin(j·π/120)·|cos((j+3)·π/6)| + i²/720·(sin(2j·π/300)² + 0.1) + 0.3]·cos(7i·π/150)

Θ(i,j)  :=  [0.3·sin(j·π/120)·cos((j+3)·π/6)   + i²/720·(sin(2j·π/300)² + 0.1) + 0.3]·sin(7i·π/150)

K(i,j)  :=  12·cos(j·π/120)`}
        vizPositions={castellanePos}
        cameraPos={[15, 12, 0]}
        target={[0, 0, 0]}
        pointSize={0.05}
        dims={[
          { label: 'Length', value: '35 mm' },
          { label: 'Width', value: '13 mm' },
          { label: 'Cooking Time', value: '9 min' }
        ]}
      />

      <PastaSection
        id="colonne-pompeii"
        page="p. 044"
        name="Colonne Pompeii"
        description="Ornate pasta originally from Campania, similar to fusilloni but substantially longer. Best served with fresh basil, pine nuts, finely sliced garlic and olive oil, topped with freshly grated Parmigiano-Reggiano."
        primary="Twisted Longitudinal Profile"
        propItems={['Solid Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 10\nj  :=  0, 1 … 250`}
        equations={
`Π(i,j)  :=  j ≤ 50  :  2·cos(i·π/20)
              else    :  2·cos(i·π/20)·cos(-j·π/25)

Θ(i,j)  :=  j ≤ 50  :  0
              else    :  2·cos(i·π/20)·sin(j·π/25) + 3·sin((j-50)·π/200)

K(i,j)  :=  j ≤ 50  :  sin(i·π/20) + 12
              else    :  sin(i·π/20) + 6·j/25

T(i,j)  :=  j ≤ 200 :  2·cos(i·π/20)·cos(-j·π/25 + 2π/3)
              else    :  2·cos(i·π/20)·cos(-28π/3)

X(i,j)  :=  j ≤ 200 :  2·cos(i·π/20)·sin(-j·π/25 + 2π/3) + 3·sin(j·π/200)
              else    :  2·cos(i·π/20)·sin(-28π/3)

Ψ(i,j)  :=  j ≤ 200 :  12 + sin(i·π/20) + 6·j/25
              else    :  sin(i·π/20) + 60

N(i,j)  :=  j ≤ 200 :  2·cos(i·π/20)·cos(-j·π/25 + 4π/3)
              else    :  2·cos(i·π/20)·cos(-28π/3)

Ξ(i,j)  :=  j ≤ 200 :  2·cos(i·π/20)·sin(-j·π/25 + 4π/3) + 3·sin(j·π/200)
              else    :  2·cos(i·π/20)·sin(-28π/3)`}
        vizPositions={colonnePompeiiPos}
        cameraPos={[60, 50, 60]}
        target={[0, 0, 36]}
        pointSize={0.3}
        coordsLabel="(Π, Θ, K) · (T, X, Ψ) · (N, Ξ, Ψ)"
        dims={[
          { label: 'Length', value: '300 mm' },
          { label: 'Width', value: '20 mm' },
          { label: 'Cooking Time', value: '9 min' }
        ]}
      />

      <PastaSection
        id="casarecce"
        page="p. 034"
        name="Casarecce"
        description="Easily identified by their unique s-shaped cross-section, casarecce (home-made) are best cooked as pastasciutta (pasta boiled, drained and dished up with a sauce). Often served with a classic ragù topped with pepper and Parmigiano-Reggiano."
        primary="Twisted Longitudinal Profile"
        propItems={['Semi-Open Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 60\nj  :=  0, 1 … 60`}
        equations={
`Π(i,j)  :=  i ≤ 30 :  0.5·cos(j·π/30) + 0.5·cos((2i+j+16)·π/40)
             else   :  cos(j·π/40) + 0.5·cos(j·π/30) + 0.5·sin((2i-j)·π/40)

Θ(i,j)  :=  i ≤ 30 :  0.5·sin(j·π/30) + 0.5·sin((2i+j+16)·π/40)
             else   :  sin(j·π/40) + 0.5·sin(j·π/30) + 0.5·cos((2i-j)·π/40)

K(i,j)  :=  j / 4`}
        vizPositions={casareccePos}
        cameraPos={[5, 5, 8]}
        target={[0.5, 0, 8]}
        pointSize={0.025}
        dims={[
          { label: 'Length', value: '43 mm' },
          { label: 'Width', value: '7 mm' },
          { label: 'Cooking Time', value: '11 min' }
        ]}
      />

      <PastaSection
        id="capellini"
        page="p. 031"
        name="Capellini"
        description="An extra-fine rod-like pasta. Capellini (thin hair) may be served in a light broth, or combine perfectly with butter, nutmeg or lemon. Its slender relative, capelli d'angelo (angel hair), forms the basis of an unusual sweet pasta dish called torta ricciolina."
        primary="Straight Longitudinal Profile"
        propItems={['Solid Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 15\nj  :=  0, 1 … 100`}
        equations={
`Π(i,j)  :=  0.05·cos(2i·π/15) + 0.6·cos(j·π/100)

Θ(i,j)  :=  0.05·sin(2i·π/15) + 0.5·sin(j·π/100)

K(i,j)  :=  7j / 100`}
        vizPositions={capelliniPos}
        cameraPos={[3, 1, 3.5]}
        target={[0.6, 0, 3.5]}
        pointSize={0.006}
        dims={[
          { label: 'Length', value: '260 mm' },
          { label: 'Diameter', value: '1 mm' },
          { label: 'Cooking Time', value: '2 min' }
        ]}
      />

      <PastaSection
        id="cappelletti"
        page="p. 032"
        name="Cappelletti"
        description="Customarily served as the first course of a traditional north Italian Christmas meal, dished up in a chicken brodo (broth). Cappelletti (little hats) are prepared by children of the household on Christmas Eve, filled with mixed meats or soft cheeses such as ricotta."
        primary="Helicoidal Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 40\nj  :=  0, 1 … 120`}
        equations={
`Π(i,j)  :=  (0.1 + sin(3i·π/160))·cos(2.3j·π/120)

Θ(i,j)  :=  (0.1 + sin(3i·π/160))·sin(2.3j·π/120)

K(i,j)  :=  0.1 - j/400 + (0.3 - 0.231·i/40)·cos(i·π/20)`}
        vizPositions={cappellettiPos}
        cameraPos={[2, 2, 0.5]}
        target={[0, 0, 0.4]}
        pointSize={0.004}
        dims={[
          { label: 'Diameter', value: '20 mm' },
          { label: 'Thickness', value: '9 mm' },
          { label: 'Cooking Time', value: '9 min' }
        ]}
      />

      <PastaSection
        id="cannelloni"
        page="p. 027"
        name="Cannelloni"
        description="Made with wheat flour, eggs and olive oil, cannelloni (big tubes) originate as strips of pasta shaped into perfect cylinders. Stuffed with meat, vegetables or ricotta. The stuffed cannelloni are covered with besciamella sauce, Parmigiano-Reggiano and oven-baked."
        primary="Straight Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Smooth Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 110\nj  :=  0, 1 … 50`}
        equations={
`Π(i,j)  :=  (1 + j/100)·cos(i·π/55) + 0.5·cos(j·π/100) + 0.1·cos(i·π/55 + j·π/125)

Θ(i,j)  :=  1.3·sin(i·π/55) + 0.3·sin(j·π/100)

K(i,j)  :=  7j / 50`}
        vizPositions={cannelloniPos}
        cameraPos={[8, 8, 3.5]}
        target={[0, 0, 3.5]}
        pointSize={0.03}
        dims={[
          { label: 'Length', value: '100 mm' },
          { label: 'Diameter', value: '23 mm' },
          { label: 'Cooking Time', value: '20 min' }
        ]}
      />

      <PastaSection
        id="cannolicchi-rigati"
        page="p. 028"
        name="Cannolicchi Rigati"
        description="Known as 'little tubes', cannolicchi exist in rigati (grooved) and lisci (smooth) form. These hollow pasta corta (short pasta) come in various diameters and are often served with seafood. Cannolicchi hail from Campania in southern Italy."
        primary="Straight Longitudinal Profile"
        propItems={['Hollow Cross-Section', 'Striated Surface', 'Smooth Edges']}
        ranges={`i  :=  0, 1 … 140\nj  :=  0, 1 … 50`}
        equations={
`Π(i,j)  :=  8·cos(i·π/70) + 0.2·cos(2i·π/7) + 5·cos(j·π/100)

Θ(i,j)  :=  8·sin(i·π/70) + 0.2·sin(2i·π/7) + 4·sin(j·π/100)

K(i,j)  :=  6j / 5`}
        vizPositions={cannolicchiRigatiPos}
        cameraPos={[40, 30, 30]}
        target={[5, 0, 30]}
        pointSize={0.2}
        dims={[
          { label: 'Length', value: '41 mm' },
          { label: 'Diameter', value: '8 mm' },
          { label: 'Cooking Time', value: '11 min' }
        ]}
      />

      <footer className="footer">
        Mathematical visualization · Based on <em>Pasta by Design</em> by George L. Legendre · Thames &amp; Hudson, 2011
      </footer>
    </>
  )
}
