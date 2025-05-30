import { ProfileForm } from '@/components/forms/profile-form'
import { useSupabase } from '@/hooks/useSupabase'
import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const { user, loading } = useSupabase()

  if (!loading && !user) {
    redirect('/signin')
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <ProfileForm />
    </div>
  )
} 