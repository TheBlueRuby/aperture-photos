import styles from "./styles.module.css";
import UploadArea from "./UploadArea";

import { createClient } from "@/supabase/server";

export default async function Page() {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getUser();
	return (
		<div className={styles.uploadContainer}>
			{error || !data?.user ? (
				<a href="/login" className={styles.button}>
					Login
				</a>
			) : (
				<UploadArea />
			)}
		</div>
	);
}
