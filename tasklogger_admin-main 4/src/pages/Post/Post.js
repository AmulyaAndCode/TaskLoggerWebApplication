import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar, List, Typography, Input } from "antd";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PostHeader = () => (
  <Comment
    actions={actions}
    author={<a>Kabir</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Kabir" />}
    content={
      <Text strong>
        We supply a series of design principles, practical patterns and high quality design
        resources.
      </Text>
    }
    datetime={
      <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment().fromNow()}</span>
      </Tooltip>
    }
  />
);
const comment = [
  {
    actions: [
      <span key="comment-list-reply-to-0" onClick={() => alert("Reply to it??")}>
        Delete comment
      </span>,
    ],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];
const actions = [
  <span key="comment-basic-reply-to">
    <span style={{ paddingRight: "5px" }}>{comment.length}</span>
    <CommentOutlined />
  </span>,
];
const Post = () => (
  <div>
    <List
      className="comment-list"
      // header={`${comment.length} replies`}
      header={<PostHeader />}
      itemLayout="horizontal"
      dataSource={comment}
      renderItem={(item) => (
        <li style={{ paddingLeft: "40px" }}>
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
    <Input.TextArea style={{ height: "120px" }} placeholder={`Comment....`} />
  </div>
);

export default Post;
