import styles from './SuccessCheckMarkCss.module.css'
import ui from '../../themes'

const SuccessCheckMark = () => {
    return (
        <div className={['rounded shadow py-5 px-3', styles.hideMe, styles.bigDiv].join(' ')} style={{backgroundColor: `${ui.backgroundColor}`, border: `1px solid ${ui.borders}`}}>
            <div className="successAnimation mb-5">
                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
                    <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            </div>
            <div className='text-center mt-5' style={{color: `${ui.normalText}`}}>
                <h1 className='text-3xl mt-2 mb-2'>Success !</h1>

                <p>Your warehouse has been submited, now it just need to be verified by the admin. </p>
            </div>

        </div>
    )
}

export default SuccessCheckMark