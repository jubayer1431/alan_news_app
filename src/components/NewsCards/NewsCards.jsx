import { Grid, Grow, Typography } from '@mui/material';
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles';

const infoCards = [
	{ color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
	{
		color: '#1565c0',
		title: 'News by Categories',
		info: 'Business, Entertainment, General, Health, Science, Sports, Technology',
		text: 'Give me the latest Technology news',
	},
	{
		color: '#4527a0',
		title: 'News by Terms',
		info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...',
		text: "What's up with PlayStation 5",
	},
	{
		color: '#283593',
		title: 'News by Sources',
		info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...',
		text: 'Give me the news from CNN',
	},
];

const NewsCards = ({ articles, activeArticle }) => {
	const classes = useStyles();

	if (articles?.length === 0) {
		return (
			<Grow in>
				<Grid
					container
					className={classes.container}
					spacing={3}
					alignItems='stretch'
				>
					{infoCards.map((infoCard, i) => {
						return (
							<Grid
								item
								key={i}
								xs={12}
								sm={6}
								md={4}
								lg={3}
								className={classes.infoCard}
							>
								<div
									className={classes.card}
									style={{ backgroundColor: infoCard.color }}
								>
									<Typography variant='h5'> {infoCard.title} </Typography>

									{infoCard.info ? (
										<Typography variant='h6'>
											<strong>{infoCard.title.split(' ')[2]}:</strong>
											<br />
											<Typography variant='h6'>{infoCard.info}</Typography>
										</Typography>
									) : null}
									<Typography variant='h6'>
										Try Saying:
										<br />
										{infoCard.text}
									</Typography>
								</div>
							</Grid>
						);
					})}
				</Grid>
			</Grow>
		);
	}

	return (
		<Grow in>
			<Grid container spacing={3} className={classes.container}>
				{articles &&
					articles.map((article, i) => {
						return (
							<Grid
								key={i}
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								style={{ display: 'flex' }}
							>
								<NewsCard
									i={i}
									article={article}
									articlesCount={articles.length}
									activeArticle={activeArticle}
								/>
							</Grid>
						);
					})}
			</Grid>
		</Grow>
	);
};

export default NewsCards;
