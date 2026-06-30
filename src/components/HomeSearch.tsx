'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch() {
    if (!query.trim()) {
      router.push('/colleges')
      return
    }

    router.push(`/colleges?q=${encodeURIComponent(query)}`)
  }

  return (
    <div
      style={{
        maxWidth: 760,
        margin: '0 auto',
        display: 'flex',
        background: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 12px 35px rgba(0,0,0,.15)',
      }}
    >
      <input
        type="text"
        placeholder="Search colleges, courses or exams..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: '18px 20px',
          fontSize: 16,
          fontWeight: 600,
          color: '#1f2937',
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          background: '#FF6B35',
          color: '#fff',
          border: 'none',
          padding: '0 34px',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: 15,
        }}
      >
        🔍 Search
      </button>
    </div>
  )
}