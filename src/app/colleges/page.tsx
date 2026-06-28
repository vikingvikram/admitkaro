import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { COURSES, STATES, BUDGETS } from '@/lib/constants'
import { getColleges } from '@/lib/supabase'

export const metadata = {
  title: 'Colleges in India 2026 | AdmitKaro',
  description:
    'Explore colleges in India by course, state, fees, placements and ratings. Find the right college with AdmitKaro.',
}

type College = {
  id: number
  name: string
  slug: string
  city: string
  state: string
  course: string
  logo?: string
  logo_bg?: string
  logo_color?: string
  fee_display?: string
  fees_min?: number
  fees_max?: number
  placement_percent?: number
  rating?: number
  avg_package?: string
  top_package?: string
  naac_grade?: string
  nirf_rank?: number
  trending?: boolean
}

type PageProps = {
  searchParams?: Promise<{
    q?: string
    course?: string
    state?: string
    budget?: string
  }>
}

export default async function CollegesPage({ searchParams }: PageProps) {
  const params = await searchParams

  const q = params?.q || ''
  const course = params?.course || ''
  const state = params?.state || ''
  const budget = params?.budget || ''

  const colleges = (await getColleges({
  course: course || undefined,
  state: state || undefined,
})) as College[]

const filteredColleges = colleges.filter((college) => {
  const searchText = [
    college.name,
    college.logo,
    college.slug,
    college.city,
    college.state,
    college.course,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const matchesSearch = q
    ? searchText.includes(q.toLowerCase())
    : true

  const minFee = college.fees_min || 0
  const maxFee = college.fees_max || minFee

  let matchesBudget = true

  if (budget === '100000') {
    matchesBudget = maxFee <= 100000
  } else if (budget === '300000') {
    matchesBudget = minFee >= 100000 && maxFee <= 300000
  } else if (budget === '500000') {
    matchesBudget = minFee >= 300000 && maxFee <= 500000
  } else if (budget === '1000000') {
    matchesBudget = minFee >= 500000 && maxFee <= 1000000
  } else if (budget === '2000000') {
    matchesBudget = minFee >= 1000000
  }

  return matchesSearch && matchesBudget
})

  return (
    <>
      <Navbar />

      <main style={{ background: '#F5F7FA', minHeight: '100vh' }}>
        <section
          style={{
            background:
              'linear-gradient(150deg, #16213E 0%, #0F3460 55%, #1a3a6e 100%)',
            padding: '46px 20px',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 900,
              marginBottom: 10,
            }}
          >
            Explore Colleges in India
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.68)',
              fontSize: 15,
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            Search and compare colleges by course, state, fees, placements and
            ratings.
          </p>
        </section>

        <section
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '28px 20px 52px',
          }}
        >
          <form
            style={{
              background: '#fff',
              border: '1px solid #E2E6F0',
              borderRadius: 14,
              padding: 14,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <input
              name="q"
              defaultValue={q}
              placeholder="Search college name..."
              style={inputStyle}
            />

            <select name="course" defaultValue={course} style={inputStyle}>
              <option value="">All Courses</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            <select name="state" defaultValue={state} style={inputStyle}>
              <option value="">All States</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select name="budget" defaultValue={budget} style={inputStyle}>
              {BUDGETS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              style={{
                background: '#FF6B35',
                color: '#fff',
                border: 'none',
                borderRadius: 9,
                padding: '12px 18px',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🔍 Search
            </button>
          </form>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#1C1F2E',
                }}
              >
                {filteredColleges.length} Colleges Found
              </h2>

              <p style={{ fontSize: 13, color: '#52556A' }}>
                Showing colleges from your Supabase database.
              </p>
            </div>

            <Link
              href="/colleges"
              style={{
                color: '#1565C0',
                fontWeight: 800,
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Clear Filters
            </Link>
          </div>

          {filteredColleges.length === 0 ? (
            <div
              style={{
                background: '#fff',
                border: '1px solid #E2E6F0',
                borderRadius: 12,
                padding: 40,
                textAlign: 'center',
                color: '#52556A',
              }}
            >
              No colleges found. Try changing filters.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#F5F7FA',
  border: '1px solid #E2E6F0',
  borderRadius: 9,
  padding: '12px 14px',
  fontSize: 14,
  fontWeight: 600,
  color: '#1C1F2E',
  outline: 'none',
}

function CollegeCard({ college }: { college: College }) {
  return (
    <Link
      href={`/college/${college.slug}`}
      style={{
        background: '#fff',
        border: '1px solid #E2E6F0',
        borderRadius: 12,
        padding: 16,
        textDecoration: 'none',
        display: 'grid',
        gridTemplateColumns: '72px 1fr auto',
        gap: 16,
        alignItems: 'start',
        color: 'inherit',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          background: college.logo_bg || '#E3F2FD',
          color: college.logo_color || '#0D47A1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        {college.logo || college.name.slice(0, 3).toUpperCase()}
      </div>

      <div>
        <h3
          style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 17,
            fontWeight: 900,
            color: '#1C1F2E',
            marginBottom: 4,
          }}
        >
          {college.name}
        </h3>

        <p style={{ fontSize: 13, color: '#52556A', marginBottom: 9 }}>
          📍 {college.city}, {college.state} · {college.course}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: '#52556A',
          }}
        >
          <span>
            💰 <strong>{college.fee_display || 'Fees NA'}</strong>
          </span>
          <span>
            📈 <strong>{college.placement_percent || 0}%</strong> placed
          </span>
          <span>
            ⭐ <strong>{college.rating || 4.0}</strong>
          </span>
          {college.nirf_rank && (
            <span>
              🏆 NIRF <strong>#{college.nirf_rank}</strong>
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {college.trending && (
          <span
            style={{
              background: '#FFF0EA',
              color: '#BF360C',
              fontSize: 11,
              fontWeight: 800,
              padding: '4px 9px',
              borderRadius: 100,
              textAlign: 'center',
            }}
          >
            Trending
          </span>
        )}

        <span
          style={{
            background: '#1565C0',
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            padding: '9px 14px',
            borderRadius: 8,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          View Details →
        </span>
      </div>
    </Link>
  )
} 