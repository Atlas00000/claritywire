import { useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { useSupabase } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'

export function ProfileForm() {
  const { user } = useSupabase()
  const { loading, error, getProfile, updateProfile, uploadAvatar } = useProfile()
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Load profile data when component mounts
  useState(() => {
    if (user) {
      getProfile(user.id).then((profile) => {
        if (profile) {
          setUsername(profile.username || '')
          setFullName(profile.full_name || '')
          setAvatarUrl(profile.avatar_url)
        }
      })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const updates = {
      username,
      full_name: fullName,
    }

    const result = await updateProfile(user.id, updates)
    if (result) {
      toast.success('Profile updated successfully')
    } else {
      toast.error(error || 'Failed to update profile')
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    const result = await uploadAvatar(user.id, file)
    if (result) {
      setAvatarUrl(result.avatar_url)
      toast.success('Avatar updated successfully')
    } else {
      toast.error(error || 'Failed to update avatar')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback>{username?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="avatar">Profile Picture</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
} 