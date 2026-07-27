import { useMemo, useState } from 'react'

const tools = [
  { name: 'ChatGPT', category: 'Writing', description: 'Great for writing, brainstorming, and everyday AI help.', link: 'https://chatgpt.com', icon: '✍️' },
  { name: 'Perplexity', category: 'Research', description: 'Helpful for fast research and clear answers.', link: 'https://www.perplexity.ai', icon: '🔍' },
  { name: 'Claude', category: 'Writing', description: 'Excellent for long-form writing and thoughtful AI conversations.', link: 'https://claude.ai', icon: '🧠' },
  { name: 'Canva AI', category: 'Design', description: 'Create presentations and graphics with AI assistance.', link: 'https://www.canva.com/ai-image-generator/', icon: '🎨' },
  { name: 'Midjourney', category: 'Design', description: 'Generate impressive images from text prompts.', link: 'https://www.midjourney.com', icon: '🖼️' },
  { name: 'DALL·E', category: 'Design', description: 'Generate unique images from detailed descriptions.', link: 'https://openai.com/dall-e-3', icon: '✨' },
  { name: 'GitHub Copilot', category: 'Coding', description: 'Boost coding speed with smart code suggestions.', link: 'https://github.com/features/copilot', icon: '💻' },
  { name: 'Notion AI', category: 'Productivity', description: 'Organize work and generate notes in one place.', link: 'https://www.notion.so/product/ai', icon: '📅' },
  { name: 'Runway', category: 'Productivity', description: 'Create and edit videos with AI-powered tools.', link: 'https://runwayml.com', icon: '🎬' },
]

const categories = ['All', 'Writing', 'Design', 'Coding', 'Productivity', 'Research']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleTools = useMemo(() => {
    if (activeCategory === 'All') return tools
    return tools.filter((tool) => tool.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-card">
          <p className="eyebrow">AI Tools Directory</p>
          <h1>Explore the best AI web tools in one place.</h1>
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
        <section className="filters" id="categories">
          <div className="filters-header">
            <h2>Browse by category</h2>
            <p>Choose the kind of task you want to improve.</p>
          </div>
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

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-left">
              <p className="footer-copyright small-text">
                © {new Date().getFullYear()} <a href="https://www.facebook.com/monirul.hasan06" target="_blank" rel="noreferrer">Monirul Hasan Mithu</a>
              </p>
            </div>

            <div className="footer-center">
              <a className="portfolio-link" href="https://me-at-portfolio-web.vercel.app" target="_blank" rel="noreferrer">
                Monirul Hasan Mithu
              </a>
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
