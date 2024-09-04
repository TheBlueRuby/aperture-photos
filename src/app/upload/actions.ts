"use server";

import { createClient } from "@/supabase/client";

export default async function handleUpload(formData: FormData) {
	const supabase = createClient();
	let photo = formData.get("photo") as File;
	console.log("Uploading photo... " + photo.name);

	const tempName = crypto.randomUUID().toString();
	console.log("Temp name: " + tempName);

	const { data: uploadData } = await supabase.storage
		.from("images")
		.upload(tempName, photo);
	if (uploadData === null) {
		console.error("Failed to upload photo");
		return;
	}
	await supabase.storage.from("images").move(tempName, uploadData.id);
	console.log("Uploaded photo: " + uploadData.id);

	const { data: user } = await supabase.auth.getUser();
	if (user?.user === null) {
		console.error("Failed to get user");
	}
	let { data: uploadNum, error: errorNum } = await supabase
		.from("image-metadata")
		.select("owner_upload_num")
		.eq("owner", user.user?.id)
		.order("owner_upload_num", { ascending: false })
		.limit(1);
	if (uploadNum === null || errorNum) {
		console.error("Failed to get upload number");
		uploadNum = [{ owner_upload_num: 0 }];
	}

	let tags = formData.get("tags")?.toString() + "";
	let tagArray = tags.split(",");
	tagArray.forEach((tag) => {
		tag.trim().toLowerCase();
	});

	await supabase.from("image-metadata").insert({
		id: uploadData.id,
		title: formData.get("title")?.toString(),
		tags: tagArray,
		owner: user.user?.id,
		owner_upload_num: uploadNum[0].owner_upload_num + 1,
	});
}
