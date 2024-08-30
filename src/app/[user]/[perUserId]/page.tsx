import PhotoDisplay from "@/app/components/PhotoDisplay";
import getImageId from "@/getImageId";

export default async function Page({
	params,
}: Readonly<{
	params: { user: string; perUserId: string };
}>) {
	let imageId = await getImageId(params.user, params.perUserId);

	return <PhotoDisplay imageId={imageId} key={imageId} />;
}
