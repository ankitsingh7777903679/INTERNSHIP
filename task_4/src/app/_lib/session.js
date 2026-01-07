// set session cookies


import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const setSession = async (user) => {
    (await cookies()).set("session", JSON.stringify(user),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 day
            path: "/",
        }
    )
}

// get session from cookies

export const getSession = async () => {
    const session = (await cookies()).get("session")?.value
    if(!session) return null
    const user = JSON.parse(session)
    return user

}

export const deleteSession = async () => {
    const cookiesStore = await cookies()
    cookiesStore.delete("session")
}

export const logoutAction = async () => {
    await deleteSession()
    redirect('/login')

} 