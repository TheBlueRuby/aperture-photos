import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function reload() {
	revalidatePath("/", "page");
	redirect("/");
}
