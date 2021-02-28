import React from "react";
import sampleImage from "../../images/sample.jpeg";
import { useHistory } from 'react-router-dom';

const WelcomePage = () => {
	const history = useHistory();

	const handleSignupButton = () => {
		history.push('/signup');
	};

	const handleLoginButton = () => {
		history.push('/login');
	};

	return (
		<div className="welcomePage">
			<div className="welcomePageContainer">
				<section className="intro">
					<div className="introContainer">
						<div className="welcomePageChild">
							<h1>Quick Think</h1>
							<h2>The way to learn new words fast</h2>
							<div className="welcomePageButtons">
								<button onClick={handleSignupButton} >Get started</button>
								<button onClick={handleLoginButton} >Log in</button>
							</div>
						</div>
						<div className="welcomePageChild">
							<img
								className="welcomePageImage"
								src={sampleImage}
								alt="Image of logged in dashboard"
							/>
						</div>
					</div>
				</section>
				<div className="welcomePageLandingPage"></div>
			</div>
		</div>
	);
};

export default WelcomePage;
