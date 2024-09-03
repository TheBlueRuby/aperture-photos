import { login, signup } from "./actions";
import styles from "./styles.module.css";

export default function LoginPage() {
	return (
		<div className={styles.formContainer}>
			<form className={styles.loginForm}>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" required />
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" required />
				<button className={styles.button} formAction={login}>Log in</button>
				<button className={styles.button} formAction={signup}>Sign up</button>
			</form>
		</div>
	);
}
