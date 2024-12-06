import PageContainer from "@/components/layout/page-container"
import { HeaderLink } from "@/components/link-page/header-link"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PageContainer>
            <HeaderLink />
            <main className="mt-2">{children}</main>
        </PageContainer>
    )
}
