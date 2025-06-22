import styles from './page404.module.css'
function Page404() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.errorText}>404 </div>
            <div className={styles.errorText}>Page not found</div>
        </div>
    )
}
export default Page404;