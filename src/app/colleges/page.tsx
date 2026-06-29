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

    const matchesSearch = q ? searchText.includes(q.toLowerCase()) : true

    const minFee = college.fees_min || 0
    const maxFee = college.fees_max || minFee

    let matchesBudget = true

    if (budget === '100000') matchesBudget = maxFee <= 100000
    else if (budget === '300000') matchesBudget = minFee >= 100000 && maxFee <= 300000
    else if (budget === '500000') matchesBudget = minFee >= 300000 && maxFee <= 500000
    else if (budget === '1000000') matchesBudget = minFee >= 500000 && maxFee <= 1000000
    else if (budget === '2000000') matchesBudget = minFee >= 1000000

    return matchesSearch && matchesBudget
  })

  return (
    <>
      <Navbar />

      <main style={{ background: '#F5F7FA', minHeight: '100vh', overflowX: 'hidden' }}>
        <section
          style={{
            background:
              'linear-gradient(150deg, #16213E 0%, #0F3460 55%, #1a3a6e 100%)',
            padding: '42px 16px',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(28px, 7vw, 46px)',
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
            Search and compare colleges by course, state, fees, placements and ratings.
          </p>
        </section>

        <section
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '24px 16px 52px',
          }}
        >
          <form
            style={{
              background: '#fff',
              border: '1px solid #E2E6F0',
              borderRadius: 14,
              padding: 14,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 10,
              marginBottom: 24,
            }}
          >
            <input name="q" defaultValue={q} placeholder="Search college name..." style={inputStyle} />

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

            <button type="submit" style={searchButtonStyle}>
              🔍 Search
            </button>
          </form>

          <div style={{ marginBottom: 18 }}>
            <h2 style={sectionTitleStyle}>Recommended Colleges</h2>
            <p style={{ fontSize: 13, color: '#52556A' }}>
              Explore colleges based on your selected course, state and budget.
            </p>

            {(q || course || state || budget) && (
              <Link href="/colleges" style={clearStyle}>
                Clear Filters
              </Link>
            )}
          </div>

          {filteredColleges.length === 0 ? (
            <div style={emptyStyle}>No colleges found. Try changing filters.</div>
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
  width: '100%',
  background: '#F5F7FA',
  border: '1px solid #E2E6F0',
  borderRadius: 9,
  padding: '13px 14px',
  fontSize: 14,
  fontWeight: 600,
  color: '#1C1F2E',
  outline: 'none',
}

const searchButtonStyle: React.CSSProperties = {
  width: '100%',
  background: '#FF6B35',
  color: '#fff',
  border: 'none',
  borderRadius: 9,
  padding: '13px 18px',
  fontFamily: 'var(--font-nunito)',
  fontWeight: 900,
  cursor: 'pointer',
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-nunito)',
  fontSize: 24,
  fontWeight: 900,
  color: '#1C1F2E',
}

const clearStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 10,
  color: '#1565C0',
  fontWeight: 800,
  fontSize: 13,
  textDecoration: 'none',
}

const emptyStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E2E6F0',
  borderRadius: 12,
  padding: 40,
  textAlign: 'center',
  color: '#52556A',
}

function CollegeCard({ college }: { college: College }) {
  return (
    <Link href={`/college/${college.slug}`} className="college-card-mobile">
      <div className="college-logo-mobile" style={{ background: college.logo_bg || '#E3F2FD', color: college.logo_color || '#0D47A1' }}>
        {college.logo || college.name.slice(0, 3).toUpperCase()}
      </div>

      <div className="college-info-mobile">
        <h3>{college.name}</h3>
        <p>📍 {college.city}, {college.state} · {college.course}</p>

        <div className="college-meta-mobile">
          <span>💰 <strong>{college.fee_display || 'Fees NA'}</strong></span>
          <span>📈 <strong>{college.placement_percent || 0}%</strong> placed</span>
          <span>⭐ <strong>{college.rating || 4.0}</strong></span>
          {college.nirf_rank && <span>🏆 NIRF <strong>#{college.nirf_rank}</strong></span>}
        </div>
      </div>

      <div className="college-action-mobile">
        {college.trending && <span className="trending-pill">Trending</span>}
        <span className="details-btn-mobile">View Details →</span>
      </div>
    </Link>
  )
}