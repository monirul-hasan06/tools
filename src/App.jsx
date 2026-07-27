import { useMemo, useState } from 'react'

const tools = [
  { name: 'ChatGPT', category: 'Writing', description: 'Great for writing, brainstorming, and everyday AI help.', link: 'https://chatgpt.com', icon: '✍️', featured: true },
  { name: 'Perplexity', category: 'Research', description: 'Helpful for fast research and clear answers.', link: 'https://www.perplexity.ai', icon: '🔍' },
  { name: 'Claude', category: 'Writing', description: 'Excellent for long-form writing and thoughtful AI conversations.', link: 'https://claude.ai', icon: '🧠' },
  { name: 'Canva AI', category: 'Design', description: 'Create presentations and graphics with AI assistance.', link: 'https://www.canva.com/ai-image-generator/', icon: '🎨' },
  { name: 'Midjourney', category: 'Design', description: 'Generate impressive images from text prompts.', link: 'https://www.midjourney.com', icon: '🖼️', featured: true },
  { name: 'DALL·E', category: 'Design', description: 'Generate unique images from detailed descriptions.', link: 'https://openai.com/dall-e-3', icon: '✨' },
  { name: 'GitHub Copilot', category: 'Coding', description: 'Boost coding speed with smart code suggestions.', link: 'https://github.com/features/copilot', icon: '💻', featured: true },
  { name: 'Notion AI', category: 'Productivity', description: 'Organize work and generate notes in one place.', link: 'https://www.notion.so/product/ai', icon: '📅' },
  { name: 'Runway', category: 'Productivity', description: 'Create and edit videos with AI-powered tools.', link: 'https://runwayml.com', icon: '🎬' },
]

const categories = ['All', 'Writing', 'Design', 'Coding', 'Productivity', 'Research']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const visibleTools = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      const matchesSearch =
        query === '' ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  return (
    <div className="page-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#" className="nav-brand">
          <span className="brand-mark mono-ibm">AI</span>
          <span className="brand-text mono-ibm">ToolsHub</span>
        </a>
        <div className="nav-links">
          <a href="#tools" className="nav-link mono-ibm">Tools</a>
          <a href="#categories" className="nav-link mono-ibm">Categories</a>
          <a href="#footer" className="nav-link mono-ibm">About</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-card">
          <p className="eyebrow mono-ibm">AI Tools Directory</p>
          <h1 className="mono-jetbrains">Explore the best AI web tools in one place.</h1>
          <p className="hero-text">
            Discover useful AI tools for writing, design, coding, productivity, research, and more.
          </p>
          <div className="hero-actions">
            <a href="#tools" className="btn btn-primary">Browse Tools</a>
            <a href="#categories" className="btn btn-secondary">Explore Categories</a>
          </div>
        </div>
      </header>

      <main>
        <section className="intro-strip">
          <div className="intro-card">
            <h2>Discover the right AI tool for every task</h2>
            <p>
              This collection helps you quickly explore writing, design, coding, productivity, and research tools in one clean place.
            </p>
          </div>
          <div className="stats-card">
            <div>
              <strong>9+</strong>
              <span>AI tools</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Search</span>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-heading">
            <h3 className="mono-cascadia">Featured tools</h3>
            <p>Popular picks for writing, design, and coding.</p>
          </div>
          <div className="featured-grid">
            {tools.filter((tool) => tool.featured).map((tool) => (
              <article className="featured-card" key={tool.name}>
                <div className="tool-card-top">
                  <div className="tool-icon">{tool.icon}</div>
                  <span className="tool-tag featured-badge">Popular</span>
                </div>
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
                <a href={tool.link} target="_blank" rel="noreferrer">
                  Visit tool →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="filters" id="categories">
          <div className="filters-header">
            <h2 className="mono-cascadia">Browse by category</h2>
            <p>Choose the kind of task you want to improve.</p>
          </div>

          <div className="filter-controls">
            <label className="search-box">
              <span aria-hidden="true">🔎</span>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <div className="chip-row">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`chip ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tools-section" id="tools">
          <div className="tools-grid">
            {visibleTools.map((tool) => (
              <article className="tool-card" key={tool.name}>
                <div className="tool-card-top">
                  <div className="tool-icon">{tool.icon}</div>
                  <span className="tool-tag">{tool.category}</span>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <a href={tool.link} target="_blank" rel="noreferrer">
                  Open Tool →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-left">
              <p className="footer-copyright small-text">
                © {new Date().getFullYear()} <a href="https://me-at-portfolio-web.vercel.app" target="_blank" rel="noreferrer">Monirul Hasan Mithu</a>
              </p>
            </div>

            <div className="footer-center">
              <p className="footer-role">Web Developer &amp; CSE Undergraduate | Dhaka, Bangladesh</p>
            </div>

            <div className="footer-right">
              <p className="footer-note small-text">
                I’m also collaborating with{' '}
                <a href="https://www.facebook.com/techcanvix" target="_blank" rel="noreferrer">
                  TechCanvix
                </a>{' '}
                · Developer Team.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
