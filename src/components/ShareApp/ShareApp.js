import React from 'react';

// Parent file: home.js

import styles from './ShareApp.module.css';

const RateUs = (props) => {

    console.log(props);

    // NB 👉: Fake phone no below

	return (
        <section className={`${props.showShareApp} module`}>
            
            <ul className={styles.sharePlatforms}>
                <li>
                    <iframe className={`${styles.facebook} share-fb`} src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.minstermedia.android.weighttracker%26hl%3Den&layout=button&size=large&width=76&height=28&appId" 
                        width="100%" height="28" style={{border: 'none', overflow: 'hidden'}}
                        scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media">
                    </iframe>
                </li>
                <li className={styles.whatsapp}>
                    <a href={`https://api.whatsapp.com/send?phone=234-XXXXXXXXXXtext=%20${props.socials.whatsapp}`}
                        rel="external" target="_blank">Whatsapp
                    </a>
                </li>
                <li className={styles.twitter}>
                    <a class="twitter-share-button" data-size="large" rel="external" target="_blank" href={`https://twitter.com/intent/tweet?text=${props.socials.twitter}`}>
                        Tweet
                    </a>
                </li>
            </ul>
            <button className="return secondary"
                onClick={props.showComponent}>
                Return
            </button>
        </section>
	)
}

export default RateUs;