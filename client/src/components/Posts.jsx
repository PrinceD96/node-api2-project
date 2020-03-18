import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { Carousel } from "antd";

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [card, setCard] = useState({ key: "tab1" });

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/posts")
			.then(res => {
				setPosts(res.data);
			})
			.catch(error => console.log(error));
	}, []);

	function onChange(a, b, c) {
		console.log(a, b, c);
	}

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

	const onTabChange = (key, type) => {
		console.log(key, type);
		setCard({ [type]: key });
	};

	const slice = posts.map((post, index) => {
		const contentList = {
			tab1: <p>{post.contents}</p>,
			tab2: <p>Comments</p>
		};

		return (
			<Card
				key={index}
				style={{ width: "100%" }}
				title={post.title}
				tabList={tabList}
				activeTabKey={card.key}
				onTabChange={key => {
					onTabChange(key, "key");
				}}
			>
				{contentList[card.key]}
			</Card>
		);
	});

	// console.log("slice", slice);

	return (
		<div className='carousel__container'>
			<Carousel afterChange={onChange} className='ant-carousel'>
				<div>
					<h3>{slice[0]}</h3>
				</div>
				<div>
					<h3>{slice[1]}</h3>
				</div>
				<div>
					<h3>{slice[2]}</h3>
				</div>
				<div>
					<h3>{slice[3]}</h3>
				</div>
				<div>
					<h3>{slice[4]}</h3>
				</div>
				<div>
					<h3>{slice[5]}</h3>
				</div>
				<div>
					<h3>{slice[6]}</h3>
				</div>
				<div>
					<h3>{slice[7]}</h3>
				</div>
				<div>
					<h3>{slice[8]}</h3>
				</div>
			</Carousel>
		</div>
	);
};

export default Posts;
