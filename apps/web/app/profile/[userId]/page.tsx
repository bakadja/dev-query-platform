import { UserProfile } from "@/components/user-profile"

export default function ProfilePage({
  params,
}: {
  params: { userId: string }
}) {
  return <UserProfile userId={1} />
}
