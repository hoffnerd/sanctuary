import { pageProtector } from "@/lib/protector";

const pageProtectorConfig = {
    requiredRole: "ADMIN",
    redirectDestination: { notLoggedIn: "/", notAuthorized: "/" },
};

export default async function Layout({children}) {
    await pageProtector(pageProtectorConfig);
    return children;
}