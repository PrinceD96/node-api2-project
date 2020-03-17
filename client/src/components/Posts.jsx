import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card } from "antd";

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const { Text } = Typography;
	const [card, setCard] = useState({ key: "tab1" });

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/posts")
			.then(res => {
				setPosts(res.data);
			})
			.catch(error => console.log(error));
	}, []);

	const tabList = [
		{
			key: "tab1",
			tab: "Post"
		},
		{
			key: "tab2",
			tab: "Comments"
		}
	];

	// const contentList = {
	// 	tab1: <p>Contents</p>,
	// 	tab2: <p>Comments</p>
	// };

	const onTabChange = (key, type) => {
		console.log(key, type);
		setCard({ [type]: key });
	};

	return (
		<>
			{posts.map((post, index) => {
				const contentList = {
					tab1: <p>{post.contents}</p>,
					tab2: <p>Comments</p>
				};

				return (
					<>
						<div key={index} className='card__container'>
							<Card
								style={{ width: "100%" }}
								title={post.title}
								extra={<a href='#'>More</a>}
								tabList={tabList}
								activeTabKey={card.key}
								onTabChange={key => {
									onTabChange(key, "key");
								}}
							>
								{contentList[card.key]}
							</Card>
						</div>
					</>
				);
			})}
		</>
	);
};

export default Posts;

{
	/* {posts.map((post, index) => (
				<div key={index}>
					<Text strong>{post.title}</Text>
					<br />
					<Text type='secondary'>{post.contents}</Text>
				</div>
			))} */
}
