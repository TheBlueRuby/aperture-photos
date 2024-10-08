"use server";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from "@/supabase/server";

const supabase = createClient();

export async function signout() {
	await supabase.auth.signOut();
	revalidatePath('/', 'layout');
	redirect("/");
}
