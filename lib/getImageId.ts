import { supabase } from "./supabase/client";

export default async function getImageId(
	userId: string,
	perUserId: string
): Promise<string> {
	let { data: userUuid } = await supabase
		.from("profiles")
		.select("id")
		.eq("username", userId);

	if (userUuid === null) {
		return "";
	}
	let { data: id } = await supabase
		.from("image-metadata")
		.select("id")
		.eq("owner", userUuid[0].id)
		.eq("owner_upload_num", perUserId);

	if (id === null || id[0]?.id === undefined) {
		return "";
	} else {
		return id[0].id.toString();
	}
}
