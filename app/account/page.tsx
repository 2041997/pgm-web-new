import { redirect } from 'next/navigation'

export default function AccountPage() {
  // Redirect to profile page as the main account dashboard
  redirect('/account/profile')
}
