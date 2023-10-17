import { FormEvent, useRef } from "react";
import { FriendType } from "../../App";

import Button from "../ui/Button";

import styles from "./NewFriend.module.css";

interface PropsType {
  onAddFriend: (data: FriendType) => void;
}
function NewFriend({ onAddFriend }: PropsType) {
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const name = nameRef.current?.value;
    const image = imageRef.current?.value;
    if (!name || !image) return;
    const data = {
      name,
      image,
      id: Math.random().toString(),
      stats: 0,
    };
    onAddFriend(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.newFriend}>
      <div className={styles.group}>
        <label htmlFor="name">Name</label>
        <input
          ref={nameRef}
          type="text"
          id="name"
          placeholder="Name"
          required
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="image">Image</label>
        <input
          ref={imageRef}
          type="url"
          id="image"
          defaultValue="https://i.pravatar.cc/48"
          required
        />
      </div>
      <Button>Add Friend</Button>
    </form>
  );
}

export default NewFriend;
