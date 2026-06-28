import Navbar from '@/components/Navbar'
import { getLeads } from '@/lib/supabase'

type Lead = {
  id: number
  name: string
  phone: string
  email?: string
  course?: string
  state?: string
  budget?: string
  source?: string
  college_interest?: string
  status?: string
  created_at?: string
}

export const metadata = {
  title: 'Admin Leads | AdmitKaro',
  description: 'View student counselling leads submitted on AdmitKaro.',
}

export default async function AdminPage() {
  const leads = (await getLeads()) as Lead[]

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#F5F7FA' }}>
        <section
          style={{
            background: '#16213E',
            color: '#fff',
            padding: '34px 20px',
          }}
        >
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: 32,
                fontWeight: 900,
                marginBottom: 6,
              }}
            >
              AdmitKaro Admin
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              View student leads generated from counselling forms.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1320, margin: '0 auto', padding: '28px 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 20,
            }}
          >
            <Stat title="Total Leads" value={String(leads.length)} />
            <Stat
              title="New Leads"
              value={String(leads.filter((l) => l.status === 'new' || !l.status).length)}
            />
            <Stat
              title="Courses"
              value={String(new Set(leads.map((l) => l.course).filter(Boolean)).size)}
            />
            <Stat
              title="States"
              value={String(new Set(leads.map((l) => l.state).filter(Boolean)).size)}
            />
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #E2E6F0',
              borderRadius: 14,
              overflowX: 'auto',
            }}
          >
            <div
              style={{
                padding: 16,
                borderBottom: '1px solid #E2E6F0',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontSize: 22,
                    fontWeight: 900,
                    color: '#1C1F2E',
                  }}
                >
                  Student Leads
                </h2>
                <p style={{ fontSize: 13, color: '#52556A' }}>
                  Latest counselling requests from Supabase.
                </p>
              </div>
            </div>

            {leads.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#52556A' }}>
                No leads yet. Submit a test counselling form first.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
                <thead>
                  <tr style={{ background: '#F5F7FA' }}>
                    {[
                      'Name',
                      'Phone',
                      'Course',
                      'State',
                      'Budget',
                      'College',
                      'Source',
                      'Status',
                      'Date',
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '12px 14px',
                          fontSize: 11,
                          color: '#52556A',
                          textTransform: 'uppercase',
                          letterSpacing: 0.6,
                          borderBottom: '1px solid #E2E6F0',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={td}>{lead.name}</td>
                      <td style={td}>
                        <strong>{lead.phone}</strong>
                      </td>
                      <td style={td}>{lead.course || 'NA'}</td>
                      <td style={td}>{lead.state || 'NA'}</td>
                      <td style={td}>{lead.budget || 'NA'}</td>
                      <td style={td}>{lead.college_interest || 'General'}</td>
                      <td style={td}>{lead.source || 'Website'}</td>
                      <td style={td}>
                        <span
                          style={{
                            background: '#E3F2FD',
                            color: '#1565C0',
                            fontSize: 11,
                            fontWeight: 900,
                            padding: '4px 9px',
                            borderRadius: 100,
                          }}
                        >
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td style={td}>
                        {lead.created_at
                          ? new Date(lead.created_at).toLocaleDateString('en-IN')
                          : 'NA'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
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
          fontSize: 26,
          fontWeight: 900,
          color: '#1565C0',
        }}
      >
        {value}
      </div>
    </div>
  )
}

const td: React.CSSProperties = {
  padding: '12px 14px',
  fontSize: 13,
  color: '#1C1F2E',
  borderBottom: '1px solid #E2E6F0',
}