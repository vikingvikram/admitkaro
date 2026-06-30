import HomeSearch from '@/components/HomeSearch'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { COURSES} from '@/lib/constants'
import { getTrendingColleges } from '@/lib/supabase'

export default async function Home() {
  const trending = await getTrendingColleges()

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{
          background: 'linear-gradient(150deg, #16213E 0%, #0F3460 55%, #1a3a6e 100%)',
          padding: '64px 20px 72px', textAlign: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          <HomeSearch />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,107,53,0.14)',
            border: '1px solid rgba(255,107,53,0.28)',
            color: '#FFB08A', fontSize: 13, fontWeight: 600,
            padding: '5px 16px', borderRadius: 100, marginBottom: 18
          }}>
            🎓 Trusted by 80,000+ Students Across India
          </div>

          <h1 style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.12, letterSpacing: '-0.8px',
            marginBottom: 14
          }}>
            India's Smartest Way to<br />
            <span style={{ color: '#FF6B35' }}>Find & Get Admitted</span><br />
            to the Right College
          </h1>

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.62)',
            maxWidth: 540, margin: '0 auto 32px'
          }}>
            Compare 2,800+ colleges on fees, placement & reviews. 100% free for students.
          </p>

          <HomeSearch />
          {/* Quick chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
            {['Engineering Colleges Maharashtra', 'MBBS Private Colleges', 'MBA without CAT', 'Low Fee BBA', 'BCA Colleges Bangalore'].map(q => (
              <span key={q} style={{
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.72)',
                fontSize: 12.5, fontWeight: 500,
                padding: '5px 13px', borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer'
              }}>{q}</span>
            ))}
          </div>
        </section>

        {/* STATS */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E2E6F0' }}>
          <div style={{
            maxWidth: 1320, margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))'
          }}>
            {[
              { n: '2,800+', l: 'Colleges Listed' },
              { n: '80,000+', l: 'Students Helped' },
              { n: '98%', l: 'Satisfaction Rate' },
              { n: '₹500 Cr+', l: 'Scholarships' },
              { n: 'FREE', l: 'Cost to Students' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '18px 12px', textAlign: 'center',
                borderRight: i < 4 ? '1px solid #E2E6F0' : 'none'
              }}>
                <div style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 24, fontWeight: 900, color: '#1565C0'
                }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#52556A', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COURSES */}
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '44px 20px' }}>
          <h2 style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 24, fontWeight: 800,
            color: '#1C1F2E', marginBottom: 6
          }}>Browse by Course</h2>
          <p style={{ fontSize: 14, color: '#52556A', marginBottom: 24 }}>
            Select your stream to explore colleges
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 9
          }}>
            {COURSES.map(c => (
              <Link key={c.id} href={`/colleges?course=${encodeURIComponent(c.id)}`} style={{
                background: '#fff', border: '1.5px solid #E2E6F0',
                borderRadius: 10, padding: '15px 10px',
                textAlign: 'center', cursor: 'pointer',
                textDecoration: 'none', display: 'block',
                transition: 'all 0.2s'
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: c.color, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', fontSize: 20
                }}>{c.icon}</div>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: '#1C1F2E' }}>{c.label}</h3>
                <p style={{ fontSize: 10.5, color: '#52556A', marginTop: 1 }}>{c.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* TRENDING COLLEGES */}
        <div style={{ background: '#fff' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '44px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 24, fontWeight: 800, color: '#1C1F2E'
                }}>🔥 Trending Colleges 2026</h2>
                <p style={{ fontSize: 14, color: '#52556A' }}>Most viewed this month</p>
              </div>
              <Link href="/colleges" style={{
                fontSize: 13, fontWeight: 700, color: '#1565C0', textDecoration: 'none'
              }}>View All →</Link>
            </div>

            {trending.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#52556A' }}>
                <p style={{ fontSize: 15 }}>No colleges yet. Add colleges to Supabase to see them here.</p>
                <Link href="/admin" style={{
                  display: 'inline-block', marginTop: 14,
                  background: '#1565C0', color: '#fff',
                  padding: '10px 24px', borderRadius: 8,
                  textDecoration: 'none', fontWeight: 700
                }}>Go to Admin Panel →</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {trending.map(c => (
                  <CollegeCard key={c.id} college={c} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LEAD STRIP */}
        <section style={{
          background: 'linear-gradient(150deg, #16213E 0%, #0F3460 100%)',
          padding: '44px 20px', textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 6
          }}>Get FREE Expert Counselling — Today</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 22 }}>
            Our advisors help you shortlist, apply & get admitted. Zero charges, ever.
          </p>
          <Link href="/counselling" style={{
            background: '#FF6B35', color: '#fff',
            padding: '14px 36px', borderRadius: 9,
            fontFamily: 'var(--font-nunito)',
            fontSize: 15, fontWeight: 800,
            textDecoration: 'none', display: 'inline-block'
          }}>
            📞 Get Free Counselling →
          </Link>
        </section>

        {/* FOOTER */}
        <footer style={{ background: '#0D1B2E', color: 'rgba(255,255,255,0.48)', padding: '40px 20px 20px' }}>
          <div style={{
            maxWidth: 1320, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)',
            gap: 28, marginBottom: 28
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 10
              }}>Admit<span style={{ color: '#FF6B35' }}>Karo</span></div>
              <p style={{ fontSize: 12.5, lineHeight: 1.75 }}>
                India's most student-friendly college discovery platform. Find, compare & get admitted — completely free.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 11.5, fontWeight: 800, color: '#fff', marginBottom: 11, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Courses</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {COURSES.slice(0, 6).map(c => (
                  <li key={c.id}><Link href={`/colleges?course=${encodeURIComponent(c.id)}`} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 12.5 }}>{c.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 11.5, fontWeight: 800, color: '#fff', marginBottom: 11, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Top States</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Punjab', 'Gujarat'].map(s => (
                  <li key={s}><Link href={`/colleges?state=${s}`} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 12.5 }}>{s} Colleges</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 11.5, fontWeight: 800, color: '#fff', marginBottom: 11, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Company</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {['About Us', 'For Colleges', 'Privacy Policy', 'Contact'].map(l => (
                  <li key={l}><Link href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 12.5 }}>{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: 16, display: 'flex',
            justifyContent: 'space-between', fontSize: 12,
            maxWidth: 1320, margin: '0 auto'
          }}>
            <span>© 2026 AdmitKaro. All rights reserved.</span>
            <span>Made with ❤️ for Indian Students</span>
          </div>
        </footer>
      </main>
    </>
  )
}

type College = {
  id: number
  slug: string
  logo?: string
  logo_bg?: string
  logo_color?: string
  name?: string
  city?: string
  state?: string
  fee_display?: string
  placement_percent?: number
  rating?: number
}
function CollegeCard({
  college,
}: {
  college: College
}) {
  return (
    <Link href={`/college/${college.slug}`} style={{
      background: '#fff', border: '1px solid #E2E6F0',
      borderRadius: 10, padding: 16, textDecoration: 'none',
      display: 'grid', gridTemplateColumns: '68px 1fr',
      gap: 14, transition: 'all 0.2s'
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: 10,
        background: college.logo_bg || '#E3F2FD',
        color: college.logo_color || '#0D47A1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 15
      }}>{college.logo}</div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-nunito)', fontSize: 15, fontWeight: 800, color: '#1C1F2E', marginBottom: 3 }}>{college.name}</h3>
        <p style={{ fontSize: 12, color: '#52556A', marginBottom: 8 }}>📍 {college.city}, {college.state}</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#52556A' }}>💰 <strong style={{ color: '#1C1F2E' }}>{college.fee_display}</strong></span>
          <span style={{ fontSize: 12, color: '#52556A' }}>📈 <strong style={{ color: '#00897B' }}>{college.placement_percent}%</strong> placed</span>
          <span style={{ fontSize: 12, color: '#52556A' }}>⭐ <strong style={{ color: '#1C1F2E' }}>{college.rating}</strong></span>
        </div>
      </div>
    </Link>
  )
}
