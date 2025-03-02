import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.about}>
        <p>Meta</p>
        <p>About</p>
        <p>Blog</p>
        <p>Jobs</p>
        <p>Help</p>
        <p>API</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Locations</p>
        <p>Instagram Lite</p>
        <p>Threads</p>
        <p>Contact</p>
        <p>Uploading & Non-Users</p>
        <p>Meta Verified</p>
      </div>
      <div className={styles.languages}>
        <select name="languages" id="languages">
          <option value="en" className={styles.lang}>
            English
          </option>
          <option value="zh" className={styles.lang}>
            中文 (Chinese)
          </option>
          <option value="es" className={styles.lang}>
            Español (Spanish)
          </option>
          <option value="hi" className={styles.lang}>
            हिन्दी
          </option>
          <option value="ar" className={styles.lang}>
            العربية (Arabic)
          </option>
          <option value="pt" className={styles.lang}>
            Português (Portuguese)
          </option>
          <option value="bn" className={styles.lang}>
            বাংলা (Bengali)
          </option>
          <option value="ru" className={styles.lang}>
            Русский (Russian)
          </option>
          <option value="ja" className={styles.lang}>
            日本語 (Japanese)
          </option>
          <option value="de" className={styles.lang}>
            Deutsch (German)
          </option>
          <option value="fr" className={styles.lang}>
            Français (French)
          </option>
          <option value="ko" className={styles.lang}>
            한국어 (Korean)
          </option>
          <option value="it" className={styles.lang}>
            Italiano (Italian)
          </option>
          <option value="vi" className={styles.lang}>
            Tiếng Việt (Vietnamese)
          </option>
          <option value="tr" className={styles.lang}>
            Türkçe (Turkish)
          </option>
          <option value="ta" className={styles.lang}>
            தமிழ் (Tamil)
          </option>
          <option value="fa" className={styles.lang}>
            فارسی (Persian)
          </option>
          <option value="pl" className={styles.lang}>
            Polski (Polish)
          </option>
          <option value="th" className={styles.lang}>
            ไทย (Thai)
          </option>
          <option value="ur" className={styles.lang}>
            اردو (Urdu)
          </option>
        </select>
        <div className={styles.copy}>© 2024 Instagram from Meta</div>
      </div>
    </div>
  );
}

export default Footer;