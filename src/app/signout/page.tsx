"use client";

import { signout } from "./actions";
import styles from "./styles.module.css";

export default function SignoutPage() {
	return (
		<div className={styles.formContainer}>
			<form className={styles.signoutForm}>
				<h1 className="text-3xl">Are you sure you want to sign out?</h1>
				<button formAction={signout} className={styles.button} type="submit">Sign out</button>
			</form>
		</div>
	);
}
