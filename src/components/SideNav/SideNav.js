import React from 'react';
import { Link } from 'react-router-dom';

// Parent file: header.js

// import sidenav dependency
import SideNav from 'react-simple-sidenav'; 
import FontAwesome from 'react-fontawesome';

import styles from './SideNav.module.css';

const SideNavigation = (props) => {
    
	return (

		<div>

			<SideNav
				showNav={props.showNav}
				onHideNav={props.onHideNav}
				navStyle={{
					background: '#242424',
					maxWidth: '20%'
				}}>
				
				<section className={styles.menu_links_container}>

					<ul className={styles.menu_links}>
						<li>
							<Link id="rate-us" to="" className=""
								onClick={props.showComponent}>
								Rate Us
							</Link>
						</li>
						<li>
							<Link id="share-app" to="" className=""
								onClick={props.showComponent}>
								Share
							</Link>
						</li>
						<li>
							<Link to="" className="">
								Write Review
							</Link>
						</li>
						<li>
							<Link to="" className="">
								More Apps
							</Link>
						</li>
						<li>
							<Link to="" className="">
								Send Feedback
							</Link>
						</li>
						<li className={styles.premium}>
							<Link to="" className="">
								Premium <FontAwesome name="star" />
							</Link>
						</li>

					</ul>
					
				</section>
				
			</SideNav>
		</div>
	)
}

export default SideNavigation;