<script lang="ts">
import axios from 'axios' ;
import { onMount } from 'svelte';

export let width: string;
export let height: string;

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

interface Tweet {
  id: string;
  user: User;
  createdAt: Date;
  text: string;
  metrics: Metrics;
}

let tweet: Tweet | null = null;

async function loadData() {
  return await fetch('/api/tweet')
    .then(res => res.json())
}

onMount(() => {
  loadData().then(res => {
    try {
      console.log(res);
      const { data, includes } = res;
      const { users } = includes;
      
      const { id, public_metrics, text, author_id, created_at } = data;
      
      const { impression_count, like_count, quote_count, reply_count, retweet_count } = public_metrics;
      
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

      tweet = Tweet;
    } catch(e) {
      console.error(e);
    }
  });
});
</script>

{#if tweet !== null}
<div class="max-w-[39em] relative z-0 transition-all w-full card-holder">
  <div class="card-background absolute inset-0" style:background-size="{width} {height}"></div>
  <div class="p-8 relative">
    <div class="card-background-light absolute inset-0 -z-1"></div>
    <div>
      <div class="flex items-center mb-4">
        <img class="inline object-cover rounded-full transition-all duration-150 mr-3" src={tweet.user.profileImageURL} alt={tweet.user.name}>
        <div class="flex flex-col">
          <div class="whitespace-nowrap text-black text-xl">{tweet.user.name}</div>
          <div class="whitespace-nowrap text-gray-700 text-lg">@{tweet.user.username}</div>
        </div>
      </div>
    
      <div class="mb-4">
        <div class="whitespace-pre-wrap text-xl">
          {tweet.text}
        </div>
      </div>

      <div>
        <div class="mb-2 text-gray-400">{tweet.createdAt}</div>
        <div class="flex space-x-4">
          <div class="whitespace-nowrap text-gray-400">
            <span class="text-black font-bold">{tweet.metrics.replies}</span> replies
          </div>
          <div class="whitespace-nowrap text-gray-400">
            <span class="text-black font-bold">{tweet.metrics.retweets}</span> retweets
          </div>
          <div class="whitespace-nowrap text-gray-400">
            <span class="text-black font-bold">{tweet.metrics.likes}</span> likes
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
.card-background {
  background-image: linear-gradient(310deg, rgb(214, 233, 255), rgb(214, 229, 255), rgb(209, 214, 255), rgb(221, 209, 255), rgb(243, 209, 255), rgb(255, 204, 245), rgb(255, 204, 223), rgb(255, 200, 199), rgb(255, 216, 199), rgb(255, 221, 199));
  border-radius: 1em;
  z-index: -1;
}

.card-background::before,
.card-background::after {
  position: absolute;
  content: "";
  left: 0;
  top: 3em;
  width: 100%;
  height: 100%;
  border-radius: 1em;
  background-color: #0000002e;
  transform: translateZ(-1px);
  filter: blur(60px);
  z-index: -1;
}

.card-background::after {
  background-color: #0000002e;
  transform: translateZ(-1px);
  filter: blur(20px);
  left: 3%;
  right: 3%;
  width: initial;
  top: 1em;
}

.card-background-light {
  border-radius: 1em;
  background-image: linear-gradient(-50deg,rgba(255,255,255,.5),rgba(255,255,255,.95) 80%);
  box-shadow: inset 0 0 0 2px #ffffff26;
  z-index: -1;
}
</style>