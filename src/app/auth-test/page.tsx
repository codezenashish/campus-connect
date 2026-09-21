import { createClient } from '@/utils/supabase/server'
import { db } from '@/db' // Tumhara drizzle db instance ka path
import { users } from '@/db/schema' // Tumhara users table schema

export default async function TestPage() {
  const supabase = await createClient()
  
  // 1. Check Supabase Auth User
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Check Drizzle Database Connection (users table fetch karke)
  let dbStatus = "Connected Successfully"
  let dbUsers = []
  try {
    dbUsers = await db.select().from(users).limit(5)
  } catch (error: unknown) {
    dbStatus = `Database Error: ${error instanceof Error ? error.message : "Unknown database error"}`
  }

  return (
    <div className="p-8 max-w-xl mx-auto font-sans space-y-4">
      <h1 className="text-2xl font-bold">System Health Check</h1>

      {/* Auth Status */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold text-blue-900">Supabase Auth Status:</h2>
        <p>{user ? `✅ Logged in as: ${user.email}` : "⚠️ Not logged in (Guest)"}</p>
      </div>

      {/* Drizzle DB Status */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="font-semibold text-green-900">Drizzle DB Status:</h2>
        <p>✅ {dbStatus}</p>
        <p className="text-sm mt-1 text-gray-600">Total users in Drizzle table: {dbUsers.length}</p>
      </div>
    </div>
  )
}