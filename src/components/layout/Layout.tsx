import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Brand } from '../Brand'
import { Icon } from '../Icon'
import { navigation, site } from '../../config/site'
import { routeMeta } from '../../data/routes'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstRender = useRef(true)
  const meta = routeMeta[location.pathname] || {
    title: 'Página não encontrada',
    description: 'Encontre um novo caminho na Turma ITA/IME.',
  }

  useEffect(() => {
    document.title = `${meta.title} | ${site.name} — ${site.institution}`
    const setMeta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.append(tag)
      }
      tag.content = value
    }
    setMeta('description', meta.description)
    setMeta('og:title', document.title, true)
    setMeta('og:description', meta.description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:locale', 'pt_BR', true)
    if (site.origin) {
      const url = `${site.origin}${location.pathname}`
      setMeta('og:url', url, true)
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.append(link)
      }
      link.href = url
    }
    if (!firstRender.current) {
      if (location.hash)
        requestAnimationFrame(() =>
          document.getElementById(location.hash.slice(1))?.scrollIntoView(),
        )
      else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.getElementById('conteudo')?.focus({ preventScroll: true })
      }
    }
    firstRender.current = false
  }, [location.pathname, location.hash, meta.title, meta.description])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onResize = () => {
      if (window.innerWidth > 1100) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  function closeMenu(restore = false) {
    setOpen(false)
    if (restore) menuButton.current?.focus()
  }
  function keyMenu(e: KeyboardEvent<HTMLElement>) {
    if (!open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      closeMenu(true)
    }
    if (e.key === 'Tab') {
      const items = [
        menuButton.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') || []),
      ].filter(Boolean) as HTMLElement[]
      const index = items.indexOf(document.activeElement as HTMLElement)
      if ((e.shiftKey && index === 0) || (!e.shiftKey && index === items.length - 1)) {
        e.preventDefault()
        items[e.shiftKey ? items.length - 1 : 0]?.focus()
      }
    }
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header" onKeyDown={keyMenu}>
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
          <div
            id="main-navigation"
            ref={menuRef}
            className={`nav-container ${open ? 'nav-open' : ''}`}
          >
            <nav aria-label="Navegação principal">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive || (item.path === '/ita' && location.pathname === '/ime')
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  onClick={() => closeMenu()}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Link to="/participe" className="nav-cta" onClick={() => closeMenu()}>
              Faça parte <Icon name="external" size={17} />
            </Link>
            <span className="mobile-nav-note">CIÊNCIA, DEDICAÇÃO E FUTURO — JUNTOS.</span>
          </div>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                Ciência, dedicação e futuro.
                <br />
                Juntos, a gente vai além.
              </p>
            </div>
            <div className="footer-nav">
              <p className="eyebrow">EXPLORE</p>
              <Link to="/nossa-turma">Nossa turma</Link>
              <Link to="/disciplinas">Disciplinas</Link>
              <Link to="/equipe">Nossa equipe</Link>
            </div>
            <div className="footer-nav">
              <p className="eyebrow">DESCUBRA</p>
              <Link to="/ita">Conheça o ITA</Link>
              <Link to="/ime">Conheça o IME</Link>
              <Link to="/laboratorio">Laboratório de ideias</Link>
            </div>
            <div className="footer-nav">
              <p className="eyebrow">CONECTE</p>
              <Link to="/pirambu-innovation">Pirambu Innovation</Link>
              <Link to="/participe">Contato e participação</Link>
              <a href={site.links.pirambu} target="_blank" rel="noreferrer">
                Site institucional <Icon name="external" size={14} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              Projeto educacional do Pirambu Innovation. Esta página não constitui um portal oficial
              do ITA ou do IME.
            </p>
            <span>
              FEITO PARA ABRIR CAMINHOS <Icon name="external" size={14} />
            </span>
          </div>
        </div>
      </footer>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {meta.title}
      </div>
    </>
  )
}
