'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { COURSES, STATES, BUDGETS } from '@/lib/constants'

export default function HomeSearch() {
  const router = useRouter()

  const [course, setCourse] = useState('')
  const [state, setState] = useState('')
  const [budget, setBudget] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()

    if (course) params.set('course', course)
    if (state) params.set('state', state)
    if (budget) params.set('budget', budget)

    const queryString = params.toString()

    router.push(queryString ? `/colleges?${queryString}` : '/colleges')
  }

  return (
    <div
      style={{
        maxWidth: 820,
        margin: '0 auto 20px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 14,
        padding: 7,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
      }}
    >
      <select value={course} onChange={(e) => setCourse(e.target.value)} style={selectStyle}>
        <option value="">🎓 Select Stream</option>
        {COURSES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.label}
          </option>
        ))}
      </select>

      <select value={state} onChange={(e) => setState(e.target.value)} style={selectStyle}>
        <option value="">📍 Select State</option>
        {STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select value={budget} onChange={(e) => setBudget(e.target.value)} style={selectStyle}>
        {BUDGETS.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleSearch}
        style={{
          flex: 1,
          minWidth: 160,
          background: '#FF6B35',
          color: '#fff',
          border: 'none',
          borderRadius: 9,
          padding: '12px 26px',
          fontSize: 14,
          fontFamily: 'var(--font-nunito)',
          fontWeight: 800,
          cursor: 'pointer',
        }}
      >
        🔍 Search Colleges
      </button>
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 160,
  background: '#fff',
  border: 'none',
  borderRadius: 9,
  padding: '12px 14px',
  fontSize: 14,
  fontWeight: 600,
  color: '#1C1F2E',
  outline: 'none',
}