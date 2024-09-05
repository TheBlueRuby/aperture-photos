"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";

export async function login(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { data: signUpData, error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/error");
	}

	if (
		await supabase
			.from("profiles")
			.select("username")
			.eq("username", formData.get("username") as string)
			.then((data) => {
				if (data.data == undefined) {
					return false;
				}
				return data.data?.length > 0;
			})
	) {
		redirect("/error");
	}

	supabase.from("profiles").insert({
		id: signUpData.user?.id,
		username: formData.get("username") as string,
		displayname: formData.get("displayname") as string,
	});

	revalidatePath("/", "layout");
	redirect("/");
}
