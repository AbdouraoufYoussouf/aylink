import PageContainer from "@/components/layout/page-container"
import { IPhoneFrame } from "@/components/preview/iphone-frame"
import { LinkInBioPreview } from "@/components/preview/link-inbio-preview"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PageContainer>
           
            <div className="flex flex-col lg:flex-row mt-2 space-y-4 ">
                <main className="w-full lg:mr-[375px] ">{children}</main>
                <div className=" flex items-center lg:fixed justify-center lg:right-5">
                    <IPhoneFrame>
                        <LinkInBioPreview />
                    </IPhoneFrame>
                </div>
            </div>
        </PageContainer>
    )
}
