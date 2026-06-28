import { supabase } from '@/lib/supabase'

export type College = {
  id: number
  university_id?: number
  name: string
  slug: string
  city: string
  state: string
  zone?: string
  course: string
  logo?: string
  logo_bg?: string
  logo_color?: string
  fees_min?: number
  fees_max?: number
  fee_display?: string
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

export async function getTrendingColleges() {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('trending', true)
    .limit(6)

  if (error) {
    console.error(error)
    return []
  }

  return data as College[]
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

  return data as College
}

export async function getColleges({
  course,
  state,
  limit = 20,
}: {
  course?: string
  state?: string
  limit?: number
} = {}) {
  let query = supabase
    .from('colleges')
    .select('*')

  if (course) {
    query = query.eq('course', course)
  }

  if (state) {
    query = query.eq('state', state)
  }

  query = query.order('rating', {
    ascending: false,
  })

  query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error(error)
    return []
  }

  return data as College[]
}

export async function searchColleges(keyword: string) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .ilike('name', `%${keyword}%`)
    .limit(20)

  if (error) {
    console.error(error)
    return []
  }

  return data as College[]
}

export async function getRelatedColleges(course: string, excludeId: number) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('course', course)
    .neq('id', excludeId)
    .limit(6)

  if (error) {
    console.error(error)
    return []
  }

  return data as College[]
}