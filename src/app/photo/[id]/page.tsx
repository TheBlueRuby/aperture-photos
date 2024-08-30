import PhotoDisplay from "@/app/components/PhotoDisplay";

export default function Page({
	params,
}: Readonly<{
	params: { id: string };
}>) {
	return <PhotoDisplay imageId={params.id} key={params.id} />;
}
