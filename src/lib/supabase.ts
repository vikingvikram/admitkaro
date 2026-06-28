import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

/* ==========================================================
   COLLEGES
========================================================== */

export async function getTrendingColleges(limit = 6) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('trending', true)
    .limit(limit)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function getCollegeBySlug(slug: string) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function getColleges(filters?: {
  course?: string
  state?: string
  maxFee?: number
}) {
  let query = supabase
    .from('colleges')
    .select('*')

  if (filters?.course)
    query = query.eq('course', filters.course)

  if (filters?.state)
    query = query.eq('state', filters.state)

  if (filters?.maxFee)
    query = query.lte('fees_max', filters.maxFee)

  const { data, error } = await query

  if (error) {
    console.error(error)
    return []
  }

  return data
}

/* ==========================================================
   LEADS
========================================================== */

export async function submitLead(data: {
  name: string
  phone: string
  email?: string
  state?: string
  course?: string
  budget?: string
  college_interest?: string
  source?: string
}) {
  const { error } = await supabase
    .from('leads')
    .insert([data])

  return !error
}

export async function getLeads() {
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  return data ?? []
}