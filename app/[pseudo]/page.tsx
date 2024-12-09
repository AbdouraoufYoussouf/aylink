import UserLink from "@/components/link-page/user-links/user-link";

export default async function ProfilePage({ params }: { params: { pseudo: string } }) {
    // const profileData = await getProfileData(params.pseudo)
  
   
    return (
      <div className=" mx-auto">
        <UserLink pseudo={params.pseudo} />
      </div>
    )
  }
  