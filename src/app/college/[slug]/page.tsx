import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { getCollegeBySlug } from '@/lib/supabase'

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
  avg_package?: string
  top_package?: string
  rating?: number
  total_reviews?: number
  naac_grade?: string
  nirf_rank?: number
  established?: number
  total_seats?: number
  entrance_exams?: string
  hostel?: boolean
  scholarship?: boolean
  trending?: boolean
  about?: string
}

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const college = (await getCollegeBySlug(slug)) as College | null

  if (!college) {
    return {
      title: 'College Not Found | AdmitKaro',
    }
  }

  return {
    title: `${college.name} Admission 2026, Fees, Courses, Placements | AdmitKaro`,
    description: `Explore ${college.name}, ${college.city}. Check fees, placements, courses, rankings, eligibility and admission details on AdmitKaro.`,
  }
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const college = (await getCollegeBySlug(slug)) as College | null

  if (!college) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <main style={{ background: '#F5F7FA', minHeight: '100vh' }}>
        <section
          style={{
            background:
              'linear-gradient(150deg, #16213E 0%, #0F3460 55%, #1a3a6e 100%)',
            padding: '42px 20px 0',
            color: '#fff',
          }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: '0 auto',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: 14,
                background: college.logo_bg || '#E3F2FD',
                color: college.logo_color || '#0D47A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 900,
                fontSize: 18,
                border: '3px solid rgba(255,255,255,0.18)',
                marginBottom: -18,
              }}
            >
              {college.logo || college.name.slice(0, 3).toUpperCase()}
            </div>

            <div style={{ paddingBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  marginBottom: 8,
                }}
              >
                {college.trending && (
                  <span style={badgeOrange}>Trending</span>
                )}
                {college.naac_grade && (
                  <span style={badgeBlue}>NAAC {college.naac_grade}</span>
                )}
                {college.nirf_rank && (
                  <span style={badgeBlue}>NIRF #{college.nirf_rank}</span>
                )}
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 'clamp(24px, 4vw, 38px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: 6,
                }}
              >
                {college.name}
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14 }}>
                📍 {college.city}, {college.state} · {college.course}
              </p>
            </div>
          </div>

          <div
            style={{
              maxWidth: 1320,
              margin: '0 auto',
              display: 'flex',
              gap: 4,
              overflowX: 'auto',
              paddingTop: 16,
            }}
          >
            {['Overview', 'Courses', 'Fees', 'Placements', 'Admissions'].map(
              (tab) => (
                <a
                  key={tab}
                  href={`#${tab.toLowerCase()}`}
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    padding: '11px 16px',
                    fontSize: 13,
                    fontWeight: 800,
                    textDecoration: 'none',
                    borderRadius: '8px 8px 0 0',
                  }}
                >
                  {tab}
                </a>
              )
            )}
          </div>
        </section>

        <section
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '34px 20px 54px',
            display: 'grid',
            gridTemplateColumns: '1fr 310px',
            gap: 20,
          }}
        >
          <div>
            <div style={cardStyle} id="overview">
              <h2 style={sectionTitle}>Overview</h2>
              <p style={{ fontSize: 14, color: '#52556A', lineHeight: 1.8 }}>
                {college.about ||
                  `${college.name} is located in ${college.city}, ${college.state}. It offers ${college.course} programs and is listed on AdmitKaro for students looking for admission guidance, fees, placement details and counselling support.`}
              </p>
            </div>

            <div style={gridStats}>
              <Stat title="Rating" value={`${college.rating || 4.0}/5`} />
              <Stat
                title="Fees"
                value={college.fee_display || 'Not Available'}
              />
              <Stat
                title="Placement"
                value={`${college.placement_percent || 0}%`}
              />
              <Stat title="Avg Package" value={college.avg_package || 'NA'} />
              <Stat title="Top Package" value={college.top_package || 'NA'} />
              <Stat
                title="Established"
                value={college.established ? String(college.established) : 'NA'}
              />
            </div>

            <div style={cardStyle} id="courses">
              <h2 style={sectionTitle}>Courses Offered</h2>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={tdLabel}>Primary Course</td>
                    <td style={tdValue}>{college.course}</td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Entrance Exams</td>
                    <td style={tdValue}>{college.entrance_exams || 'NA'}</td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Total Seats</td>
                    <td style={tdValue}>{college.total_seats || 'NA'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={cardStyle} id="fees">
              <h2 style={sectionTitle}>Fees Structure</h2>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={tdLabel}>Fee Range</td>
                    <td style={tdValue}>{college.fee_display || 'NA'}</td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Minimum Fees</td>
                    <td style={tdValue}>
                      {college.fees_min ? `₹${college.fees_min}` : 'NA'}
                    </td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Maximum Fees</td>
                    <td style={tdValue}>
                      {college.fees_max ? `₹${college.fees_max}` : 'NA'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={cardStyle} id="placements">
              <h2 style={sectionTitle}>Placements</h2>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={tdLabel}>Placement Percentage</td>
                    <td style={tdValue}>
                      {college.placement_percent || 0}%
                    </td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Average Package</td>
                    <td style={tdValue}>{college.avg_package || 'NA'}</td>
                  </tr>
                  <tr>
                    <td style={tdLabel}>Highest Package</td>
                    <td style={tdValue}>{college.top_package || 'NA'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={cardStyle} id="admissions">
              <h2 style={sectionTitle}>Admission Details</h2>
              <p style={{ fontSize: 14, color: '#52556A', lineHeight: 1.8 }}>
                Admission to {college.name} depends on eligibility criteria,
                entrance exams and seat availability. Students can request free
                counselling from AdmitKaro to understand admission options,
                fees, documents required and application deadlines.
              </p>
            </div>
          </div>

          <aside
            style={{
              position: 'sticky',
              top: 78,
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={cardStyle}>
              <h3
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 18,
                  fontWeight: 900,
                  marginBottom: 6,
                  color: '#1C1F2E',
                }}
              >
                Need Admission Help?
              </h3>

              <p style={{ fontSize: 13, color: '#52556A', marginBottom: 14 }}>
                Get free counselling for {college.name}.
              </p>

              <Link
                href={`/counselling?college=${college.slug}`}
                style={{
                  display: 'block',
                  background: '#FF6B35',
                  color: '#fff',
                  borderRadius: 9,
                  padding: '12px 16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 900,
                  textDecoration: 'none',
                  marginBottom: 10,
                }}
              >
                Get Free Counselling
              </Link>

              <Link
                href="/colleges"
                style={{
                  display: 'block',
                  background: '#E3F2FD',
                  color: '#1565C0',
                  borderRadius: 9,
                  padding: '11px 16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                Compare More Colleges
              </Link>
            </div>

            <div
              style={{
                ...cardStyle,
                background: 'linear-gradient(135deg,#FFF8E1,#FFF3E0)',
                border: '1px solid #FFE082',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-nunito)',
                  color: '#E65100',
                  fontSize: 15,
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                Quick Facts
              </h3>

              <QuickFact label="Hostel" value={college.hostel ? 'Yes' : 'No'} />
              <QuickFact
                label="Scholarship"
                value={college.scholarship ? 'Yes' : 'No'}
              />
              <QuickFact label="State" value={college.state} />
              <QuickFact label="Course" value={college.course} />
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2E6F0',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 12, color: '#52556A', marginBottom: 4 }}>
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontSize: 20,
          fontWeight: 900,
          color: '#1C1F2E',
        }}
      >
        {value}
      </div>
    </div>
  )
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        padding: '7px 0',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <span style={{ color: '#8A4B00' }}>{label}</span>
      <strong style={{ color: '#BF360C' }}>{value}</strong>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E2E6F0',
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-nunito)',
  fontSize: 22,
  fontWeight: 900,
  color: '#1C1F2E',
  marginBottom: 12,
}

const gridStats: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: 12,
  marginBottom: 16,
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
}

const tdLabel: React.CSSProperties = {
  width: '35%',
  padding: '12px',
  borderBottom: '1px solid #E2E6F0',
  background: '#F5F7FA',
  color: '#52556A',
  fontWeight: 700,
  fontSize: 13,
}

const tdValue: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #E2E6F0',
  color: '#1C1F2E',
  fontWeight: 700,
  fontSize: 13,
}

const badgeOrange: React.CSSProperties = {
  background: '#FFF0EA',
  color: '#FF6B35',
  fontSize: 11,
  fontWeight: 900,
  padding: '4px 10px',
  borderRadius: 100,
}

const badgeBlue: React.CSSProperties = {
  background: '#E3F2FD',
  color: '#1565C0',
  fontSize: 11,
  fontWeight: 900,
  padding: '4px 10px',
  borderRadius: 100,
}