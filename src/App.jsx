import { useEffect, useMemo, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem('theme')
      const initialTheme = storedTheme === 'light' ? 'light' : 'dark'
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    } catch {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem('theme', nextTheme)
      } catch {
        // Ignore storage errors and keep the UI responsive.
      }
      document.documentElement.setAttribute('data-theme', nextTheme)
      return nextTheme
    })
  }

  return { theme, toggleTheme }
}

const getLogoUrl = (url) => {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '')
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return '/ai-tools-logo.svg'
  }
}

const tools = [
  { name: 'ChatGPT', category: 'Writing', description: 'Great for writing, brainstorming, and everyday AI help.', link: 'https://chatgpt.com', icon: '✍️', featured: true },
  { name: 'Gemini', category: 'General', description: 'A strong all-round assistant for research, writing, and productivity.', link: 'https://gemini.google.com/', icon: '✨', featured: true },
  { name: 'DeepSeek', category: 'General', description: 'Fast and flexible for coding, explanation, and content tasks.', link: 'https://www.deepseek.com/', icon: '🧩' },
  { name: 'Grok', category: 'General', description: 'Useful for conversational assistance and quick knowledge discovery.', link: 'https://x.ai/', icon: '⚡' },
  { name: 'Microsoft Copilot', category: 'General', description: 'A polished assistant that helps with searches, writing, and daily work.', link: 'https://www.microsoft.com/en-us/microsoft-copilot', icon: '🪄' },
  { name: 'Poe', category: 'General', description: 'Explore multiple models in one polished chat experience.', link: 'https://poe.com/', icon: '💬' },
  { name: 'HuggingChat', category: 'General', description: 'A community-friendly chat experience for trying AI models.', link: 'https://huggingface.co/chat/', icon: '🤖' },
  { name: 'Perplexity', category: 'Research', description: 'Helpful for fast research and clear answers.', link: 'https://www.perplexity.ai', icon: '🔍' },
  { name: 'Claude', category: 'Writing', description: 'Excellent for long-form writing and thoughtful AI conversations.', link: 'https://claude.ai', icon: '🧠' },
  { name: 'Canva AI', category: 'Design', description: 'Create presentations and graphics with AI assistance.', link: 'https://www.canva.com/ai-image-generator/', icon: '🎨' },
  { name: 'Midjourney', category: 'Design', description: 'Generate impressive images from text prompts.', link: 'https://www.midjourney.com', icon: '🖼️', featured: true },
  { name: 'DALL·E', category: 'Design', description: 'Generate unique images from detailed descriptions.', link: 'https://openai.com/dall-e-3', icon: '✨' },
  { name: 'Leonardo AI', category: 'Design', description: 'Great for detailed image generation and creative visual workflows.', link: 'https://leonardo.ai/', icon: '🖌️' },
  { name: 'Stable Diffusion', category: 'Design', description: 'A powerful open image generation platform for artists and creators.', link: 'https://stability.ai/stable-diffusion', icon: '🌀' },
  { name: 'Ideogram', category: 'Design', description: 'Create polished text-in-image visuals with strong typography support.', link: 'https://ideogram.ai/', icon: '📝' },
  { name: 'Adobe Firefly', category: 'Design', description: 'Useful for generating and editing creative assets inside Adobe workflows.', link: 'https://www.adobe.com/products/firefly.html', icon: '🔥' },
  { name: 'GitHub Copilot', category: 'Coding', description: 'Boost coding speed with smart code suggestions.', link: 'https://github.com/features/copilot', icon: '💻', featured: true },
  { name: 'Cursor', category: 'Coding', description: 'An AI-first coding editor designed for faster development.', link: 'https://www.cursor.com/', icon: '⌨️', featured: true },
  { name: 'Windsurf', category: 'Coding', description: 'A modern IDE experience with AI-assisted workflows.', link: 'https://windsurf.com/', icon: '🌊' },
  { name: 'Replit', category: 'Coding', description: 'Build, test, and collaborate with AI from the browser.', link: 'https://replit.com/', icon: '🧪' },
  { name: 'Bolt.new', category: 'Coding', description: 'Quickly turn ideas into working web apps using AI prompts.', link: 'https://bolt.new/', icon: '⚙️' },
  { name: 'Lovable', category: 'Coding', description: 'Generate polished app experiences with AI-assisted building.', link: 'https://lovable.dev/', icon: '💡' },
  { name: 'v0', category: 'Coding', description: 'Create UI components and frontend interfaces with natural language.', link: 'https://v0.dev/', icon: '🧱' },
  { name: 'Cline', category: 'Coding', description: 'An AI coding assistant focused on developer productivity.', link: 'https://cline.bot/', icon: '🛠️' },
  { name: 'Aider', category: 'Coding', description: 'A command-line AI coding partner for software developers.', link: 'https://aider.chat/', icon: '🧠' },
  { name: 'Codeium', category: 'Coding', description: 'Fast AI completion and coding support for many languages.', link: 'https://codeium.com/', icon: '⚡' },
  { name: 'Sourcegraph Cody', category: 'Coding', description: 'AI assistance tailored for searching and editing large codebases.', link: 'https://sourcegraph.com/cody', icon: '🔎' },
  { name: 'Amazon Q Developer', category: 'Coding', description: 'Helpful for developer workflows and AWS-related coding tasks.', link: 'https://aws.amazon.com/q/developer/', icon: '☁️' },
  { name: 'Google Code Assist', category: 'Coding', description: 'Useful AI support for coding and software development workflows.', link: 'https://cloud.google.com/products/ai/code-assist', icon: '🧭' },
  { name: 'Grammarly', category: 'Writing', description: 'Polish grammar, clarity, and tone in your writing instantly.', link: 'https://www.grammarly.com/', icon: '✍️' },
  { name: 'Jasper', category: 'Writing', description: 'Create marketing copy and content at scale with AI help.', link: 'https://www.jasper.ai/', icon: '📝' },
  { name: 'Copy.ai', category: 'Writing', description: 'Generate short-form content quickly for blogs, ads, and social posts.', link: 'https://www.copy.ai/', icon: '📢' },
  { name: 'Quillbot', category: 'Writing', description: 'Paraphrase and refine text with an easy-to-use AI editor.', link: 'https://quillbot.com/', icon: '🪶' },
  { name: 'Sudowrite', category: 'Writing', description: 'Great for fiction writing and storytelling with AI support.', link: 'https://sudowrite.com/', icon: '📚' },
  { name: 'Rytr', category: 'Writing', description: 'Create marketing content and polished copy in minutes.', link: 'https://rytr.me/', icon: '⚪' },
  { name: 'Jenni AI', category: 'Writing', description: 'Support writing workflows with AI-driven drafting and editing.', link: 'https://jenni.ai/', icon: '📄' },
  { name: 'Runway', category: 'Video', description: 'Create and edit videos with AI-powered tools.', link: 'https://runwayml.com', icon: '🎬' },
  { name: 'HeyGen', category: 'Video', description: 'Generate realistic AI video presenters and talking avatars.', link: 'https://www.heygen.com/', icon: '🎥' },
  { name: 'Synthesia', category: 'Video', description: 'Create multilingual video content with AI-generated presenters.', link: 'https://www.synthesia.io/', icon: '🎞️' },
  { name: 'Descript', category: 'Video', description: 'Edit audio and video with text-based AI workflows.', link: 'https://www.descript.com/', icon: '🎙️' },
  { name: 'ElevenLabs', category: 'Video', description: 'Create natural-sounding voiceovers and audio content.', link: 'https://elevenlabs.io/', icon: '🔊' },
  { name: 'Murf AI', category: 'Video', description: 'Generate professional voiceovers and narration with AI voices.', link: 'https://murf.ai/', icon: '🎤' },
  { name: 'Suno AI', category: 'Video', description: 'Turn ideas into music and audio with AI generation.', link: 'https://suno.com/', icon: '🎵' },
  { name: 'Pika Labs', category: 'Video', description: 'Create short AI-generated videos from prompts and images.', link: 'https://pika.art/', icon: '📽️' },
  { name: 'NotebookLM', category: 'Research', description: 'A smart research workspace for summarizing and exploring notes.', link: 'https://notebooklm.google/', icon: '📘', featured: true },
  { name: 'Elicit', category: 'Research', description: 'Find relevant papers and research insights with AI support.', link: 'https://elicit.com/', icon: '🧪' },
  { name: 'Consensus', category: 'Research', description: 'Search evidence-backed answers from scientific literature.', link: 'https://consensus.app/', icon: '✅' },
  { name: 'ResearchRabbit', category: 'Research', description: 'Map and discover academic literature with AI-powered recommendations.', link: 'https://www.researchrabbit.ai/', icon: '🗺️' },
  { name: 'Scite', category: 'Research', description: 'Discover how papers are cited and supported by AI analysis.', link: 'https://scite.ai/', icon: '📊' },
  { name: 'Scholarcy', category: 'Research', description: 'Summarize academic papers into concise, useful overviews.', link: 'https://www.scholarcy.com/', icon: '📚' },
  { name: 'Rayyan', category: 'Research', description: 'Organize and screen research work with AI-assisted review.', link: 'https://www.rayyan.ai/', icon: '🔬' },
  { name: 'Airtable', category: 'Productivity', description: 'Organize projects and data with AI-enhanced planning workflows.', link: 'https://airtable.com/', icon: '📋' },
  { name: 'Miro', category: 'Productivity', description: 'Collaborate visually and brainstorm with AI-powered boards.', link: 'https://miro.com/', icon: '🧠' },
  { name: 'Gamma', category: 'Productivity', description: 'Turn ideas into presentations and docs in seconds.', link: 'https://gamma.app/', icon: '📈' },
  { name: 'n8n', category: 'Productivity', description: 'Automate tasks and connect apps with flexible AI workflows.', link: 'https://n8n.io/', icon: '🔁' },
  { name: 'Zapier', category: 'Productivity', description: 'Connect apps and automate repetitive work with ease.', link: 'https://zapier.com/', icon: '🔗' },
  { name: 'Make', category: 'Productivity', description: 'Build visual automations for marketing, operations, and productivity.', link: 'https://www.make.com/', icon: '⚒️' },
  { name: 'Otter.ai', category: 'Productivity', description: 'Transcribe meetings and conversations with AI accuracy.', link: 'https://otter.ai/', icon: '🗣️' },
  { name: 'Fireflies.ai', category: 'Productivity', description: 'Capture notes and action items from meetings automatically.', link: 'https://fireflies.ai/', icon: '📝' },
  { name: 'Motion', category: 'Productivity', description: 'Plan work and schedules with AI-driven productivity support.', link: 'https://www.usemotion.com/', icon: '⏰' },
  { name: 'Monica', category: 'Productivity', description: 'Stay organized and interact with AI in everyday workflows.', link: 'https://monica.im/', icon: '🧾' },
  { name: 'Bluedot', category: 'Productivity', description: 'Capture and organize knowledge from meetings and conversations.', link: 'https://www.bluedot.ai/', icon: '🔵' },
]

const categories = ['All', 'Writing', 'Design', 'Coding', 'Productivity', 'Research', 'General', 'Video']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const { theme, toggleTheme } = useTheme()

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
          <img src={theme === 'dark' ? '/ai-tools-logo-light.svg' : '/ai-tools-logo-dark.svg'} alt="AI Tools logo" className="brand-logo" />
          <span className="brand-text mono-ibm">AI Tools</span>
        </a>
        <div className="nav-links">
          <a href="#" className="nav-link mono-ibm">Home</a>
          <a href="#featured" className="nav-link mono-ibm">Tools</a>
          <a href="#categories" className="nav-link mono-ibm">Categories</a>
          <a href="#about" className="nav-link mono-ibm">About</a>
          <button className="theme-toggle" onClick={toggleTheme} type="button" aria-label="Toggle theme">
            <span className="theme-icon" aria-hidden="true">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v2.5M12 18.5V21M4.5 12H3m18 0h-1.5M6.7 6.7l-1.06-1.06M18.36 18.36l-1.06-1.06M6.7 17.3l-1.06 1.06M18.36 5.64l-1.06 1.06M9.2 12a2.8 2.8 0 1 0 5.6 0 2.8 2.8 0 0 0-5.6 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a8.2 8.2 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-card">
          <h1 className="mono-jetbrains">AI Tools</h1>
          <p className="hero-text">
            A resource of web based AI tools collection for writing, design, coding, productivity, research, and more.
          </p>
          <div className="hero-actions">
            <a href="#tools" className="btn btn-primary">Browse Tools</a>
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
              <strong>60+</strong>
              <span>AI tools</span>
            </div>
            <div>
              <strong>6+</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Search</span>
            </div>
          </div>
        </section>

        <section className="featured-section" id="featured">
          <div className="section-heading">
            <h3 className="mono-cascadia">Featured tools</h3>
            <p>Popular picks for writing, design, and coding.</p>
          </div>
          <div className="featured-grid">
            {tools.filter((tool) => tool.featured).map((tool) => (
              <article className="featured-card" key={tool.name}>
                <div className="tool-card-top">
                  <img className="tool-icon" src={getLogoUrl(tool.link)} alt={`${tool.name} logo`} />
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
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
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
                  <img className="tool-icon" src={getLogoUrl(tool.link)} alt={`${tool.name} logo`} />
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

        <section className="about-section" id="about">
          <div className="about-card">
            <div className="about-intro">
              <h3 className="mono-cascadia">About AI Tools</h3>
              <p>
                This site is a curated resource for discovering web-based AI tools in one simple place.
              </p>
            </div>

            <div className="about-grid">
              <div className="about-panel">
                <h4 className="mono-ibm">What you will find here</h4>
                <ul className="about-list">
                  <li>AI tools for writing, design, coding, research, and productivity</li>
                  <li>Featured picks for everyday tasks and creative work</li>
                  <li>A quick way to explore useful web-based AI platforms</li>
                </ul>
              </div>

              <div className="about-panel">
                <h4 className="mono-ibm">Why this directory exists</h4>
                <p>
                  It helps users save time by gathering useful AI platforms in one clean directory instead of searching across many scattered websites.
                </p>
              </div>
            </div>
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
