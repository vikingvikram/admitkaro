'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { COURSES, STATES, BUDGETS } from '@/lib/constants'
import { submitLead } from '@/lib/supabase'

function CounsellingForm() {
  const searchParams = useSearchParams()
  const college = searchParams.get('college') || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    state: '',
    budget: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!form.phone.trim() || form.phone.length < 10) {
      setError('Please enter a valid mobile number.')
      return
    }

    setLoading(true)

    const ok = await submitLead({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      course: form.course || undefined,
      state: form.state || undefined,
      budget: form.budget || undefined,
      college_interest: college || undefined,
      source: 'Counselling Page',
    })

    setLoading(false)

    if (!ok) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSuccess(true)
  }

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#F5F7FA' }}>
        <section
          style={{
            background:
              'linear-gradient(150deg, #16213E 0%, #0F3460 55%, #1a3a6e 100%)',
            padding: '56px 20px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              marginBottom: 10,
            }}
          >
            Get Free Admission Counselling
          </h1>

          <p
            style={{
              maxWidth: 620,
              margin: '0 auto',
              color: 'rgba(255,255,255,0.68)',
              fontSize: 15,
            }}
          >
            Share your details and our counsellor will help you shortlist the
            right colleges based on your course, budget and location.
          </p>
        </section>

        <section
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '42px 20px 60px',
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 24,
          }}
        >
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>How AdmitKaro Helps You</h2>

              {[
                {
                  title: 'College Shortlisting',
                  text: 'We help you find colleges based on your marks, course preference, city and budget.',
                },
                {
                  title: 'Fees & Placement Guidance',
                  text: 'Compare fees, placements, scholarships and admission options before applying.',
                },
                {
                  title: 'Admission Support',
                  text: 'Get help with eligibility, documents, deadlines and application process.',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  style={{
                    display: 'flex',
                    gap: 14,
                    marginBottom: index === 2 ? 0 : 18,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: '#E3F2FD',
                      color: '#1565C0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-nunito)',
                      fontWeight: 900,
                    }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        fontSize: 16,
                        fontWeight: 900,
                        color: '#1C1F2E',
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: '#52556A',
                        lineHeight: 1.7,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={cardStyle}>
              <h2 style={headingStyle}>Why Students Use AdmitKaro?</h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 12,
                }}
              >
                {[
                  '100% Free',
                  'Verified Colleges',
                  'Budget Matching',
                  'Admission Help',
                ].map((text) => (
                  <div
                    key={text}
                    style={{
                      background: '#F5F7FA',
                      border: '1px solid #E2E6F0',
                      borderRadius: 10,
                      padding: 14,
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#1C1F2E',
                    }}
                  >
                    ✅ {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <div style={{ fontSize: 54, marginBottom: 12 }}>✅</div>

                <h2
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#00897B',
                    marginBottom: 8,
                  }}
                >
                  Request Submitted
                </h2>

                <p
                  style={{
                    color: '#52556A',
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  Thank you. Your counselling request has been saved. Our team
                  will contact you soon.
                </p>

                <Link
                  href="/colleges"
                  style={{
                    display: 'inline-block',
                    background: '#1565C0',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: 9,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 900,
                  }}
                >
                  Explore Colleges
                </Link>
              </div>
            ) : (
              <>
                <h2 style={headingStyle}>Request a Callback</h2>

                <p
                  style={{
                    fontSize: 13,
                    color: '#52556A',
                    marginBottom: 18,
                  }}
                >
                  Fill the form below. Mobile number is required for counselling
                  callback.
                </p>

                {college && (
                  <div
                    style={{
                      background: '#FFF0EA',
                      color: '#BF360C',
                      padding: '10px 12px',
                      borderRadius: 9,
                      fontSize: 13,
                      fontWeight: 800,
                      marginBottom: 14,
                    }}
                  >
                    Interested College: {college}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <Field label="Full Name *">
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter your name"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Mobile Number *">
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Enter mobile number"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Enter email"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Interested Course">
                    <select
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                      style={inputStyle}
                    >
                      <option value="">Select Course</option>
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Preferred State">
                    <select
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                      style={inputStyle}
                    >
                      <option value="">Select State</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Budget">
                    <select
                      value={form.budget}
                      onChange={(e) =>
                        setForm({ ...form, budget: e.target.value })
                      }
                      style={inputStyle}
                    >
                      {BUDGETS.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {error && (
                    <p
                      style={{
                        background: '#FFEBEE',
                        color: '#B71C1C',
                        padding: '10px 12px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: '#FF6B35',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 9,
                      padding: '13px 18px',
                      fontFamily: 'var(--font-nunito)',
                      fontSize: 15,
                      fontWeight: 900,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? 'Submitting...' : 'Get Free Counselling'}
                  </button>

                  <p
                    style={{
                      fontSize: 11,
                      color: '#9496A8',
                      textAlign: 'center',
                      marginTop: 10,
                    }}
                  >
                    By submitting, you agree to receive admission guidance calls
                    from AdmitKaro.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label style={{ display: 'block', marginBottom: 13 }}>
      <span
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 800,
          color: '#52556A',
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E2E6F0',
  borderRadius: 14,
  padding: 24,
  height: 'fit-content',
}

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-nunito)',
  fontSize: 22,
  fontWeight: 900,
  color: '#1C1F2E',
  marginBottom: 12,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#F5F7FA',
  border: '1.5px solid #E2E6F0',
  borderRadius: 9,
  padding: '12px 14px',
  fontSize: 14,
  fontWeight: 600,
  color: '#1C1F2E',
  outline: 'none',
}
export default function CounsellingPage() {
  return (
    <Suspense fallback={null}>
      <CounsellingForm />
    </Suspense>
  )
}