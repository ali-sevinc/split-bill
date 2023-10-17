import { FriendType } from "../../App";

import Button from "../ui/Button";

import styles from "./Friend.module.css";

interface PropsType {
  friend: FriendType;
  selectedId: string | undefined;
  onSelectFriend: (id: string) => void;
}

function Friend({ friend, onSelectFriend, selectedId }: PropsType) {
  const { name, image, stats, id } = friend;
  let description = "You and your friend are even";
  let oweStyle = "";
  if (stats < 0) {
    description = `${name} owe you $${-1 * stats} `;
    oweStyle = styles.green;
  }
  if (stats > 0) {
    description = `You owe $${stats} to ${name}  `;
    oweStyle = styles.red;
  }
  const isSelected = selectedId === id;
  return (
    <li className={`${styles.friend} ${isSelected ? styles.selected : ""} `}>
      <img src={image} />
      <div>
        <p className={styles.name}>{name}</p>
        <p className={`${styles.stats} ${oweStyle}`}>{description}</p>
      </div>
      <Button onClick={() => onSelectFriend(id)}>
        {isSelected ? "Selected" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
