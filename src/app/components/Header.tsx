import getUserName from "@/getUserName";
import styles from "./Header.module.css";
import { createClient } from "@/supabase/server";

const supabase = createClient();

export default async function Header() {
	const { data, error } = await supabase.auth.getUser();
	return (
		<div className={styles.container}>
			<a href="/" className={styles.logoContainer}>
				<img
					src="/aperture.svg"
					alt="Aperture Logo"
					className={styles.logo}
				/>
				<h1 className={styles.title}>Aperture</h1>
			</a>
			<div className="flex flex-row align-center">
				{error || !data?.user ? (
					<a href="/login" className={styles.button}>
						Login
					</a>
				) : (
					<>
						<p className={styles.user}>{await getUserName()}</p>
						<a href="/signout" className={styles.logoutButton}>
							Logout
						</a>
						<div className="w-2"></div>
						<a href="/upload" className={styles.button}>
							Upload
						</a>
					</>
				)}

				<div className="w-2"></div>
				<a href="/refresh" className={styles.button}>↻</a>
				<a
					href="https://github.com/theblueruby/aperture-photos/"
					className={styles.button}
				>
					{"</>"}
				</a>
			</div>
		</div>
	);
}
