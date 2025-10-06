import React from 'react'
import { auth } from '../../../../auth';
import { PAGE } from '@/config/page.config';
import { redirect } from 'next/navigation';
import EditProfileForm from '@/shared/components/Forms/EditProfileForm';

export default async function Profile() {
  const session = await auth();
  console.log(session);
  if (!session) {
    return redirect(PAGE.LOGIN);
  }
  return (
    <>
    <div>Profile {session?.user?.email}</div>
    <EditProfileForm user={session?.user as { email: string; name: string; image: string }} />
    </>
  )
}