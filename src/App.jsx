import React, { useEffect, useState } from 'react';
import wordsToNumbers from 'word-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const App = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(-1);
	const classes = useStyles();

	useEffect(() => {
		const alanBtnInstance = alanBtn({
			key: import.meta.env.VITE_ALAN_SDK_KEY,
			onCommand: ({ command, articles, number }) => {
				switch (command) {
					case 'newHeadlines':
						setNewsArticles(articles);
						break;
					case 'highlight':
						setActiveArticle((prevState) => prevState + 1);
						break;
					case 'number':
						const filteredNumber =
							typeof number === 'string'
								? wordsToNumbers(number, { fuzzy: true })
								: number;

						if (filteredNumber > articles.length) {
							alanBtnInstance.playText('Please Try that again');
							break;
						}

						window.open(articles[filteredNumber - 1].url, '_blank');
						alanBtnInstance.playText(
							`Opening Article Number ${filteredNumber}`
						);
						break;

					default:
						break;
				}
			},
		});
	}, []);

	return (
		<div>
			<div className={classes.logoContainer}>
				<img
					src='https://www.conversationdesigninstitute.com/assets/images/academy/POP/cover-card-EXT-Alan@2x.png'
					alt='Logo'
					className={classes.alanLogo}
				/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</div>
	);
};

export default App;
