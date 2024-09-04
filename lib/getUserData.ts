"use server";
import { createClient } from "@/supabase/server";

export default async function getUserDisplayName(): Promise<string> {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		return "";
	}
	const { data: displayname, error: error2 } = await supabase
		.from("profiles")
		.select("displayname")
		.eq("id", data.user.id);

	if (!displayname || error2) {
		return "";
	}

	return displayname[0].displayname.toString();
}
