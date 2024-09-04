import getUserDisplayName from "@/getUserData";
import styles from "./Header.module.css";

export default async function Header() {
	let username = await getUserDisplayName();
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
			<div
				className="flex flex-row align-center"
				suppressHydrationWarning
			>
				{username == "" ? (
					<>
						<a href="/login" className={styles.button}>
							Login
						</a>
					</>
				) : (
					<>
						<p className={styles.user}>{username}</p>
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
				<a href="/refresh" className={styles.button}>
					↻
				</a>
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
