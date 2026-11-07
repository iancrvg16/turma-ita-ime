import { useState } from 'react'
import { Link } from 'react-router-dom'
import { institutions } from '../../data/institutions'
import type { InstitutionId } from '../../data/institutions'
import { Structure } from '../Artwork'
import { AeroDiagram } from '../AeroDiagram'
import { Icon } from '../Icon'
import { Tabs } from './Tabs'

export function SchoolCompare({ initial = 'ita' }: { initial?: InstitutionId }) {
  const [selected, setSelected] = useState<InstitutionId>(initial)
  const school = institutions[selected]
  return (
    <div className={`school-explorer school-${selected}`}>
      <div className="school-visual">
        {selected === 'ita' ? <AeroDiagram /> : <Structure />}
        <span className="school-watermark" aria-hidden="true">
          {school.short}
        </span>
        <span className="visual-label">
          <span />{' '}
          {selected === 'ita' ? 'CIÊNCIA QUE ALCANÇA O CÉU' : 'IDEIAS QUE GANHAM ESTRUTURA'}
        </span>
      </div>
      <div className="school-content">
        <Tabs
          id="schools"
          label="Explore as instituições"
          value={selected}
          onChange={setSelected}
          options={[
            { value: 'ita', label: '01 / ITA' },
            { value: 'ime', label: '02 / IME' },
          ]}
        />
        <div
          id="schools-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`schools-tab-${selected}`}
          className="school-panel"
          key={selected}
        >
          <h3>{school.name}</h3>
          <p>{school.description}</p>
          <dl className="school-facts">
            <div>
              <dt>LOCALIZAÇÃO</dt>
              <dd>
                <Icon name="pin" size={15} />
                {school.location}
              </dd>
            </div>
            <div>
              <dt>VINCULAÇÃO</dt>
              <dd>{school.affiliation}</dd>
            </div>
            <div>
              <dt>{school.dateLabel.toUpperCase()}</dt>
              <dd>{school.date}</dd>
            </div>
            <div>
              <dt>CAMPO DE ATUAÇÃO</dt>
              <dd>{school.field}</dd>
            </div>
          </dl>
          <Link className="text-link light-link" to={`/${selected}`}>
            Explore a história do {school.short} <Icon name="external" />
          </Link>
        </div>
      </div>
    </div>
  )
}
