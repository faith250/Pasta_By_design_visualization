import { useMemo } from 'react'
import { computeTrottole, computeTubettiRigati } from './equations'
import PastaViz from './components/PastaViz'
import './App.css'

function NavBar() {
  return (
    <nav className="nav">
      <span className="nav-brand">Pasta by Design</span>
      <div className="nav-links">
        <a href="#trottole">Trottole</a>
        <a href="#tubetti-rigati">Tubetti Rigati</a>
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

function PastaSection({ id, page, name, description, primary, propItems, ranges, equations, vizPositions, cameraPos, target, pointSize, dims }) {
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
        <p className="canvas-hint">drag to rotate · scroll to zoom · (Π, Θ, K)</p>
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
  const trottolePos = useMemo(() => computeTrottole(), [])
  const tubettiPos  = useMemo(() => computeTubettiRigati(), [])

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

      <footer className="footer">
        Mathematical visualization · Based on <em>Pasta by Design</em> by George L. Legendre · Thames &amp; Hudson, 2011
      </footer>
    </>
  )
}
