const API_URL = (tweetId: string) => `https://i2l2luehd5.execute-api.us-east-1.amazonaws.com/wonder/${tweetId}`;

import DefaultTweet from './tweet.json';

interface User {
	id: string;
	profileImageURL: string;
	name: string;
	username: string;
	verfied: boolean;
}

interface Metrics {
	impressions: number;
	likes: number;
	quotes: number;
	replies: number;
	retweets: number;
}

export interface Tweet {
	id: string;
	user: User;
	createdAt: Date;
	text: string;
	metrics: Metrics;
}

export function DecodeTweet(res: any) {
  try {
		const { data, includes } = res;
		const { users } = includes;

		const { id, public_metrics, text, author_id, created_at } = data;

		const { impression_count, like_count, quote_count, reply_count, retweet_count } =
			public_metrics;

		const user = users.find((user: any) => user.id === author_id);
		const { id: userId, name, profile_image_url, username, verfied } = user;

		const User: User = {
			id: userId,
			name,
			username,
			profileImageURL: profile_image_url,
			verfied
		};

		const Metrics: Metrics = {
			impressions: impression_count,
			likes: like_count,
			replies: reply_count,
			quotes: quote_count,
			retweets: retweet_count
		};

		const Tweet: Tweet = {
			id,
			createdAt: created_at,
			user: User,
			text,
			metrics: Metrics
		};

		return Tweet;
	} catch (e) {
    throw e;
    return;
	}
}

export const DefaultDecodedTweet = DecodeTweet(DefaultTweet);

export async function LoadTweet(tweetId: string): Promise<Tweet | undefined> {
	const res = await fetch(API_URL(tweetId)).then((res) => res.json());

	try {
    return DecodeTweet(res);
  } catch(e) {
    return DecodeTweet(DefaultTweet);
  }
}
