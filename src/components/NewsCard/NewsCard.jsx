import React, { createRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button,
	CardActions,
} from '@mui/material';
import useStyles from './styles';

const NewsCard = ({
	article: { source, description, title, publishedAt, urlToImage, url },
	i,
	activeArticle,
	articlesCount,
}) => {
	// const [elRefs, setElRefs] = useState([]);
	const [elRefs, setElRefs] = useState(null);
	const classes = useStyles();

	const scrollToRef = (ref) => {
		window.scroll(0, ref?.current?.offsetTop - 50);
	};

	// Creating Element Refs Array
	// useEffect(() => {
	// 	setElRefs((refs) =>
	// 		Array(articlesCount || 20)
	// 			.fill()
	// 			.map((_, i) => refs[i] || createRef())
	// 	);
	// }, []);

	useEffect(() => {
		setElRefs(createRef());
	}, []);

	// Re-render whenever i, activeArticle or elRefs changes
	// useEffect(() => {
	// 	if (i === activeArticle && elRefs[activeArticle]) {
	// 		scrollToRef(elRefs[activeArticle]);
	// 	}
	// 	console.log('I am El Refs', elRefs);
	// }, [i, activeArticle, elRefs]);

	useEffect(() => {
		if (i === activeArticle && elRefs) {
			scrollToRef(elRefs);
		}
		console.log('I am El Refs', elRefs);
	}, [i, activeArticle, elRefs]);

	return (
		<Card
			ref={elRefs}
			className={classnames(
				classes.card,
				activeArticle === i ? classes.activeCard : null
			)}
		>
			<CardActionArea href={url} target='_blank'>
				<CardMedia
					className={classes.media}
					title='f'
					image={
						urlToImage ||
						'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_01/2705191/nbc-social-default.png'
					}
				/>
				<div className={classes.details}>
					<Typography variant='body2' component={'h2'} color='textSecondary'>
						{new Date(publishedAt).toDateString()}
					</Typography>
					<Typography variant='body2' component={'h2'} color='textSecondary'>
						{source.name}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					variant='h5'
					gutterBottom
					color='textPrimary'
				>
					{title}
				</Typography>
				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardActions}>
				<Button
					href={url}
					target='_blank'
					variant='text'
					color='primary'
					size='small'
				>
					Learn More
				</Button>
				<Typography variant='h5' color='textSecondary'>
					{i + 1}
				</Typography>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
