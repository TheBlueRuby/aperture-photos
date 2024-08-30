import styles from "./Header.module.css";

export default function Header() {
	return (
		<div className={styles.container}>
			<a href="/" className={styles.logoContainer}>
				<img src="/aperture.svg" alt="Aperture Logo" className={styles.logo}/>
				<h1 className={styles.title}>Aperture</h1>
			</a>
			<a href="https://github.com/theblueruby/aperture-photos/" className={styles.sourceButton}>
				Source
			</a>
		</div>
	);
}
